"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info, PartyPopper } from "lucide-react";
import { useSite } from "@/components/providers/site-provider";
import { useCart } from "@/components/cart/cart-provider";
import { ProductArtwork } from "@/components/product/product-artwork";
import { formatPrice } from "@/lib/format";
import { placeDemoOrder } from "@/lib/order";
import { productSubtitle } from "@/lib/product-labels";
import { href } from "@/lib/i18n";
import { ButtonLink, Button } from "@/components/ui/button";

const FIELD =
  "w-full rounded-xl border border-bone/15 bg-ink/60 px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none";

export function CheckoutPage() {
  const { dict, locale, currency } = useSite();
  const { items, total, count, slugs, clear } = useCart();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  // Un seul produit expedie suffit a rendre l'adresse obligatoire.
  const needsShipping = items.some((product) => product.delivery === "physical");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // En phase 1 le paiement n'existe pas : on enregistre la commande en local
  // et on renvoie vers la confirmation, qui contient les vrais liens de
  // téléchargement. À brancher sur le prestataire de paiement, ce handler
  // est le seul à changer.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    placeDemoOrder({
      email,
      name,
      country,
      address: needsShipping
        ? [street, zip, city, country].filter(Boolean).join(", ")
        : undefined,
      shipping: needsShipping,
      slugs: [...slugs],
      currency,
      total: total(currency),
    });

    clear();
    router.push(`${href(locale, "/commande/succes")}`);
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-24 text-center">
        <span className="text-6xl" aria-hidden="true">
          🕸️
        </span>
        <h1 className="text-3xl text-bone sm:text-4xl">{dict.cart.empty}</h1>
        <ButtonLink href={href(locale, "/produits")} size="lg">
          {dict.common.viewAll}
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-4xl text-bone sm:text-5xl">{dict.checkout.title}</h1>
        <p className="mt-2 text-bone/55">{dict.checkout.subtitle}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="card-spooky flex flex-col gap-6 rounded-2xl p-7">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-bone">
              {dict.checkout.email}
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@email.com"
              className={FIELD}
            />
            <p className="text-xs text-bone/40">{dict.checkout.emailHint}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-bone">
                {dict.checkout.name}
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={FIELD}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="country" className="text-sm font-medium text-bone">
                {dict.checkout.country}
              </label>
              <input
                id="country"
                type="text"
                required
                autoComplete="country-name"
                className={FIELD}
              />
            </div>
          </div>

          {needsShipping && (
            <div className="flex flex-col gap-6 border-t border-bone/10 pt-6">
              <div>
                <p className="text-sm font-medium text-bone">
                  {dict.checkout.address}
                </p>
                <p className="mt-1 text-xs text-bone/40">
                  {dict.checkout.addressHint}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="street" className="text-sm font-medium text-bone">
                  {dict.checkout.street}
                </label>
                <input
                  id="street"
                  type="text"
                  required={needsShipping}
                  autoComplete="street-address"
                  value={street}
                  onChange={(event) => setStreet(event.target.value)}
                  className={FIELD}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="zip" className="text-sm font-medium text-bone">
                    {dict.checkout.zip}
                  </label>
                  <input
                    id="zip"
                    type="text"
                    required={needsShipping}
                    autoComplete="postal-code"
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                    className={FIELD}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="city" className="text-sm font-medium text-bone">
                    {dict.checkout.city}
                  </label>
                  <input
                    id="city"
                    type="text"
                    required={needsShipping}
                    autoComplete="address-level2"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className={FIELD}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 rounded-xl border border-ember/25 bg-ember/8 p-4">
            <Info size={18} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-bone">
                {dict.checkout.demoNotice}
              </p>
              <p className="mt-1 text-sm text-bone/60">
                {dict.checkout.demoNoticeText}
              </p>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            <PartyPopper size={16} aria-hidden="true" />
            {dict.checkout.demoCta}
          </Button>

          <p className="text-center text-xs text-bone/35">
            {dict.checkout.secure}
          </p>
        </form>

        <aside className="card-spooky h-fit rounded-2xl p-6 lg:sticky lg:top-24">
          <h2 className="mb-5 text-xl text-bone">{dict.checkout.orderSummary}</h2>

          <ul className="flex flex-col gap-4 border-b border-bone/10 pb-5">
            {items.map((product) => (
              <li key={product.slug} className="flex items-center gap-3">
                <span className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <ProductArtwork
                    glyph={product.art.glyph}
                    from={product.art.from}
                    to={product.art.to}
                    className="h-full w-full"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-bone/85">
                    {product.locale[locale].title}
                  </span>
                  <span className="text-xs text-bone/40">
                    {productSubtitle(product, locale, dict)}
                  </span>
                </span>
                <span className="shrink-0 text-sm text-bone">
                  {formatPrice(product.prices[currency], currency)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between py-5">
            <span className="text-sm uppercase tracking-wider text-bone/55">
              {dict.cart.total}
            </span>
            <span className="font-display text-3xl text-bone">
              {formatPrice(total(currency), currency)}
            </span>
          </div>

          <p className="text-xs text-bone/40">
            {count} {count > 1 ? dict.cart.items : dict.cart.item} ·{" "}
            {dict.cart.onePerProduct}
          </p>

          <ButtonLink
            href={href(locale, "/panier")}
            variant="ghost"
            size="sm"
            className="mt-4 w-full"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            {dict.checkout.backToCart}
          </ButtonLink>
        </aside>
      </div>
    </div>
  );
}
