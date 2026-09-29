"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Check, ShoppingBag, Zap } from "lucide-react";
import { useSite } from "@/components/providers/site-provider";
import { useCart } from "@/components/cart/cart-provider";
import { href } from "@/lib/i18n";
import type { Product } from "@/lib/products";

const BASE =
  "flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all disabled:cursor-not-allowed disabled:opacity-45";

type Burst = {
  id: number;
  x: number;
  y: number;
  /** Déplacements en unités CSS, injectés dans `--burst-x` / `--burst-y`. */
  dx: string;
  dy: string;
};

/**
 * Bouton d'ajout au panier.
 *
 * Déclenche un court effet « chaudron » à l'endroit du clic. Les particules
 * sont montées puis retirées : on ne garde pas d'élément éphémère dans l'arbre
 * au-delà de l'animation, et rien ne se déclenche si les animations sont
 * réduites.
 */
export function AddToCartButton({ product }: { product: Product }) {
  const { dict, locale, reducedMotion } = useSite();
  const { add, has } = useCart();
  const router = useRouter();
  const [bursts, setBursts] = useState<Burst[]>([]);
  const inCart = has(product.slug);
  const label = product.locale[locale].title;

  const addToCart = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      add(product.slug);

      if (reducedMotion) return;

      // Les particules sont en `position: fixed` : il faut donc les
      // coordonnées du viewport, pas celles relatives au bouton.
      const originX = event.clientX;
      const originY = event.clientY;
      const id = Date.now();

      const particles = Array.from({ length: 8 }, (_, index) => {
        const angle = (index / 8) * Math.PI * 2;
        const distance = 34 + (index % 3) * 16;
        return {
          id: id + index,
          x: originX,
          y: originY,
          dx: `${Math.cos(angle) * distance}px`,
          dy: `${Math.sin(angle) * distance - 18}px`,
        };
      });

      setBursts((current) => [...current, ...particles]);
      window.setTimeout(
        () =>
          setBursts((current) =>
            current.filter((particle) => particle.id < id + particles.length),
          ),
        750,
      );
    },
    [add, product.slug, reducedMotion],
  );

  function buyNow() {
    if (!inCart) add(product.slug);
    router.push(href(locale, "/checkout"));
  }

  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={addToCart}
        aria-pressed={inCart}
        aria-label={`${dict.product.addToCartAria} : ${label}`}
        className={`${BASE} relative bg-ember text-ink hover:bg-ember-2 hover:shadow-[0_0_32px_-8px_var(--color-ember)]`}
      >
        {inCart ? (
          <Check size={18} aria-hidden="true" />
        ) : (
          <ShoppingBag size={18} aria-hidden="true" />
        )}
        {inCart ? dict.common.added : dict.common.addToCart}

        {bursts.map((burst) => (
          <span
            key={burst.id}
            className="cauldron-burst"
            style={
              {
                left: burst.x,
                top: burst.y,
                "--burst-x": burst.dx,
                "--burst-y": burst.dy,
              } as React.CSSProperties
            }
            aria-hidden="true"
          />
        ))}
      </button>

      <button
        type="button"
        onClick={buyNow}
        className={`${BASE} border border-bone/25 text-bone hover:border-ember hover:text-ember`}
      >
        <Zap size={16} aria-hidden="true" />
        {dict.common.buyNow}
      </button>
    </div>
  );
}
