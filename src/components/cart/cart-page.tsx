"use client";

import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, Download } from "lucide-react";
import { useSite } from "@/components/providers/site-provider";
import { useCart } from "@/components/cart/cart-provider";
import { productSubtitle } from "@/lib/product-labels";
import { ProductArtwork } from "@/components/product/product-artwork";
import { formatPrice } from "@/lib/format";
import { href } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/button";

export function CartPage() {
  const { dict, locale, currency } = useSite();
  const { items, remove, total, count, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-24 text-center">
        <span className="text-6xl" aria-hidden="true">
          🕯️
        </span>
        <h1 className="text-3xl text-bone sm:text-4xl">{dict.cart.empty}</h1>
        <p className="text-bone/55">{dict.cart.emptyHint}</p>
        <ButtonLink href={href(locale, "/produits")} size="lg">
          {dict.common.viewAll}
          <ArrowRight size={18} aria-hidden="true" />
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl text-bone sm:text-5xl">{dict.cart.title}</h1>
          <p className="mt-2 text-sm text-bone/50">
            {count} {count > 1 ? dict.cart.items : dict.cart.item}
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="text-sm text-bone/45 underline-offset-4 transition-colors hover:text-blood hover:underline"
        >
          {dict.cart.remove}
        </button>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <ul className="flex flex-col gap-4">
          {items.map((product) => {
            const title = product.locale[locale].title;
            return (
              <li
                key={product.slug}
                className="card-spooky flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center"
              >
                <Link
                  href={href(locale, `/produits/${product.slug}`)}
                  className="h-24 w-full shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20"
                >
                  <ProductArtwork
                    glyph={product.art.glyph}
                    from={product.art.from}
                    to={product.art.to}
                    className="h-full w-full"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <h2 className="text-lg text-bone">
                    <Link
                      href={href(locale, `/produits/${product.slug}`)}
                      className="transition-colors hover:text-ember"
                    >
                      {title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-xs text-bone/45">
                    {productSubtitle(product, locale, dict)}
                  </p>
                  <p className="mt-2 text-sm text-bone/60">
                    {dict.cart.onePerProduct}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <span className="font-display text-2xl text-ember">
                    {formatPrice(product.prices[currency], currency)}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(product.slug)}
                    aria-label={`${dict.cart.remove} : ${title}`}
                    className="rounded-full p-2 text-bone/40 transition-colors hover:bg-bone/5 hover:text-blood"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="card-spooky h-fit rounded-2xl p-6 lg:sticky lg:top-24">
          <h2 className="mb-5 flex items-center gap-2 text-xl text-bone">
            <ShoppingBag size={18} className="text-ember" aria-hidden="true" />
            {dict.checkout.orderSummary}
          </h2>

          <dl className="flex flex-col gap-3 border-b border-bone/10 pb-5">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-bone/55">{dict.cart.subtotal}</dt>
              <dd className="text-bone">
                {formatPrice(total(currency), currency)}
              </dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-bone/55">TVA</dt>
              <dd className="text-bone/40">
                {locale === "fr" ? "Calculée au paiement" : "Calculated at checkout"}
              </dd>
            </div>
          </dl>

          <div className="flex items-center justify-between py-5">
            <span className="text-sm uppercase tracking-wider text-bone/55">
              {dict.cart.total}
            </span>
            <span className="font-display text-3xl text-bone">
              {formatPrice(total(currency), currency)}
            </span>
          </div>

          <ButtonLink href={href(locale, "/checkout")} size="lg" className="w-full">
            {dict.cart.checkout}
            <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>

          <p className="mt-4 flex items-center gap-1.5 text-[11px] text-bone/40">
            <Download size={12} aria-hidden="true" />
            {dict.common.instantDownload}
          </p>
        </aside>
      </div>
    </div>
  );
}
