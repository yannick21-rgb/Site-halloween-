"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ShoppingBag, Trash2, X, ArrowRight, Download } from "lucide-react";
import { useSite } from "@/components/providers/site-provider";
import { useCart } from "@/components/cart/cart-provider";
import { ProductArtwork } from "@/components/product/product-artwork";
import { formatPrice } from "@/lib/format";
import { href } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/button";
import { productSubtitle } from "@/lib/product-labels";



export function CartDrawer() {
  const { dict, locale, currency } = useSite();
  const { items, isOpen, close, remove, total, count } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(isOpen);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setClosing(false);
      return;
    }
    if (!mounted) return;
    setClosing(true);
    const timer = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, 240);
    return () => window.clearTimeout(timer);
  }, [isOpen, mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-100 ${closing ? "veil-in-out" : "veil-in"}`}
      role="dialog"
      aria-modal="true"
      aria-label={dict.cart.title}
    >
      <button
        type="button"
        aria-label={dict.nav.close}
        onClick={close}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-bone/10 bg-ink-2 shadow-2xl outline-none ${closing ? "panel-in-out" : "panel-in"}`}
      >
        <header className="flex items-center justify-between border-b border-bone/10 px-5 py-4">
          <h2 className="flex items-center gap-2 text-xl text-bone">
            <ShoppingBag size={20} className="text-ember" aria-hidden="true" />
            {dict.cart.title}
            {count > 0 && (
              <span className="rounded-full bg-ember px-2 py-0.5 text-xs font-bold text-ink">
                {count}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label={dict.nav.close}
            className="rounded-full p-2 text-bone/60 transition-colors hover:bg-bone/5 hover:text-ember"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="text-5xl" aria-hidden="true">
              🎃
            </span>
            <p className="text-bone">{dict.cart.empty}</p>
            <p className="text-sm text-bone/50">{dict.cart.emptyHint}</p>
            <ButtonLink
              href={href(locale, "/produits")}
              onClick={close}
              variant="secondary"
            >
              {dict.common.viewAll}
            </ButtonLink>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-bone/5 overflow-y-auto px-5">
              {items.map((product) => (
                <li key={product.slug} className="flex gap-4 py-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                    <ProductArtwork
                      glyph={product.art.glyph}
                      from={product.art.from}
                      to={product.art.to}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-bone">
                      {product.locale[locale].title}
                    </p>
                    <p className="mt-0.5 text-xs text-bone/45">
                      {productSubtitle(product, locale, dict)}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ember">
                      {formatPrice(product.prices[currency], currency)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(product.slug)}
                    aria-label={`${dict.cart.remove} : ${product.locale[locale].title}`}
                    className="h-fit rounded-full p-2 text-bone/40 transition-colors hover:bg-bone/5 hover:text-blood"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>

            <footer className="space-y-4 border-t border-bone/10 px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-bone/60">{dict.cart.total}</span>
                <span className="font-display text-3xl text-bone">
                  {formatPrice(total(currency), currency)}
                </span>
              </div>
              <p className="flex items-center gap-1.5 text-[11px] text-bone/40">
                <Download size={12} aria-hidden="true" />
                {dict.common.instantDownload} · {dict.cart.onePerProduct}
              </p>
              <div className="grid gap-2">
                <ButtonLink href={href(locale, "/checkout")} onClick={close} size="lg">
                  {dict.cart.checkout}
                  <ArrowRight size={16} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  href={href(locale, "/panier")}
                  onClick={close}
                  variant="ghost"
                  size="sm"
                >
                  {dict.checkout.backToCart}
                </ButtonLink>
              </div>
              <Link
                href={href(locale, "/produits")}
                onClick={close}
                className="block text-center text-xs text-bone/40 underline-offset-4 hover:text-ember hover:underline"
              >
                {dict.common.viewAll}
              </Link>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
