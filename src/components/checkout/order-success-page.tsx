"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Download,
  FileArchive,
  Mail,
  Ghost,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useSite } from "@/components/providers/site-provider";
import { ProductArtwork } from "@/components/product/product-artwork";
import { ButtonLink } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { href } from "@/lib/i18n";
import { getProduct, type Product } from "@/lib/products";
import { readOrder, type Order } from "@/lib/order";
import { FadeIn } from "@/components/ui/motion";

export function OrderSuccessPage() {
  const { dict, locale } = useSite();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // La commande vit dans le localStorage : lecture après hydratation uniquement.
  useEffect(() => {
    setOrder(readOrder());
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-[60vh]" aria-hidden="true" />;
  }

  if (!order) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-24 text-center">
        <Ghost size={56} className="text-bone/25" aria-hidden="true" />
        <h1 className="text-3xl text-bone sm:text-4xl">{dict.success.empty}</h1>
        <p className="text-bone/55">{dict.success.emptyText}</p>
        <ButtonLink href={href(locale, "/produits")} size="lg">
          {dict.common.viewAll}
        </ButtonLink>
      </div>
    );
  }

  const items = order.slugs
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => p !== undefined);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <FadeIn className="flex flex-col items-center gap-4 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full border border-bile/30 bg-bile/10">
          <CheckCircle2 size={30} className="text-bile" aria-hidden="true" />
        </span>
        <h1 className="text-4xl text-bone sm:text-5xl">{dict.success.title}</h1>
        <p className="max-w-xl text-bone/55">{dict.success.subtitle}</p>

        <dl className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
          <div className="flex items-center gap-2">
            <dt className="text-bone/40">{dict.success.reference}</dt>
            <dd className="font-mono text-bone">{order.reference}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-bone/40" aria-hidden="true" />
            <dt className="sr-only">{dict.success.sentTo}</dt>
            <dd className="text-bone/70">{order.email}</dd>
          </div>
        </dl>
      </FadeIn>

      <ul className="mt-10 flex flex-col gap-4">
        {items.map((product, index) => {
          const copy = product.locale[locale];
          return (
            <li key={product.slug}>
              <FadeIn delay={120 + index * 80}>
                <div className="card-spooky flex flex-col gap-5 rounded-2xl p-5 sm:flex-row sm:items-center">
                  <span className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    <ProductArtwork
                      glyph={product.art.glyph}
                      from={product.art.from}
                      to={product.art.to}
                      className="h-full w-full"
                    />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg text-bone">{copy.title}</h2>
                    {product.delivery === "physical" ? (
                      <>
                        <p className="text-sm text-bone/50">
                          {dict.success.shippingTitle}
                        </p>
                        <p className="mt-2 text-xs text-bone/45">
                          {order.address ? order.address : dict.success.shippingPending}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-bone/50">
                          {dict.success.filesIncluded}
                        </p>
                        <ul className="mt-2 flex flex-col gap-1">
                          {(product.files ?? []).map((file) => (
                            <li
                              key={file.name}
                              className="flex items-center gap-2 text-xs text-bone/45"
                            >
                              <FileArchive size={12} aria-hidden="true" />
                              <span className="truncate">
                                {file.name} · {file.size}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                    <span className="font-display text-2xl text-bone">
                      {formatPrice(product.prices[order.currency], order.currency)}
                    </span>
                    {product.delivery === "physical" ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-bone/20 px-5 py-2.5 text-sm text-bone/70">
                        <Truck size={15} aria-hidden="true" />
                        {dict.success.shipped}
                      </span>
                    ) : (
                      <a
                        href={product.downloadUrl}
                        download
                        className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-105 active:scale-95"
                      >
                        <Download size={15} aria-hidden="true" />
                        {dict.success.download}
                      </a>
                    )}
                  </div>
                </div>
              </FadeIn>
            </li>
          );
        })}
      </ul>

      <FadeIn
        delay={200 + items.length * 80}
        className="mt-10 flex flex-col items-center gap-4"
      >
        <p className="flex items-center gap-2 text-sm text-bone/50">
          <ShieldCheck size={15} className="text-bile" aria-hidden="true" />
          {dict.success.licence}
        </p>
        <h2 className="text-xl text-bone">{dict.success.nextTitle}</h2>
        <p className="max-w-lg text-center text-sm text-bone/50">
          {dict.success.nextText}
        </p>
        <ButtonLink href={href(locale, "/")} variant="secondary" size="sm">
          {dict.success.backHome}
        </ButtonLink>
      </FadeIn>
    </div>
  );
}
