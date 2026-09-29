"use client";

import Link from "next/link";
import { Download, Plus, Check, Truck } from "lucide-react";
import type { Product } from "@/lib/products";
import { CATEGORY_META } from "@/lib/products";
import { useSite } from "@/components/providers/site-provider";
import { useCart } from "@/components/cart/cart-provider";
import { FadeIn } from "@/components/ui/motion";
import { productSubtitle } from "@/lib/product-labels";
import { ProductVisual } from "@/components/product/product-visual";
import { Badge, PriceTag, Stars } from "@/components/ui/badge";
import { href } from "@/lib/i18n";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { locale, dict, currency } = useSite();
  const { add, has } = useCart();
  const copy = product.locale[locale];
  const inCart = has(product.slug);
  const category = CATEGORY_META[product.category][locale];

  return (
    <article className="card-spooky hover-lift group flex h-full flex-col overflow-hidden rounded-2xl">
      <Link
        href={href(locale, `/produits/${product.slug}`)}
        className="relative block aspect-4/3 overflow-hidden"
      >
        <ProductVisual
          product={product}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="h-full w-full transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3">
          <Badge tone="neutral">{category.label}</Badge>
        </span>
        {inCart && (
          <span className="absolute right-3 top-3">
            <Badge tone="ember">
              <Check size={11} aria-hidden="true" className="mr-1" />
              {dict.common.added}
            </Badge>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg leading-tight text-bone">
            <Link
              href={href(locale, `/produits/${product.slug}`)}
              className="transition-colors hover:text-ember"
            >
              {copy.title}
            </Link>
          </h3>
        </div>

        <p className="line-clamp-2 text-sm text-bone/55">{copy.tagline}</p>

        <div className="mt-auto flex flex-col gap-4 pt-2">
          <div className="flex items-center justify-between gap-3">
            <Stars
              rating={product.rating}
              reviews={product.reviews}
              label={dict.product.ratingLabel}
            />
            <PriceTag product={product} currency={currency} dict={dict} />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-bone/40">
            {product.delivery === "physical" ? (
              <Truck size={12} aria-hidden="true" />
            ) : (
              <Download size={12} aria-hidden="true" />
            )}
            <span className="truncate">{productSubtitle(product, locale, dict)}</span>
          </div>

          <button
            type="button"
            onClick={() => add(product.slug)}
            aria-label={`${dict.common.addToCart} : ${copy.title}`}
            aria-pressed={inCart}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-ink uppercase tracking-wide transition-all hover:bg-ember-2 hover:shadow-[0_0_28px_-8px_var(--color-ember)]"
          >
            {inCart ? (
              <Check size={16} aria-hidden="true" />
            ) : (
              <Plus size={16} aria-hidden="true" />
            )}
            {inCart ? dict.common.added : dict.common.addToCart}
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <FadeIn key={product.slug} delay={Math.min(index, 8) * 70}>
          <ProductCard product={product} />
        </FadeIn>
      ))}
    </div>
  );
}
