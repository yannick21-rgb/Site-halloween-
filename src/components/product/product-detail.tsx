"use client";

import Image from "next/image";
import { Download, FileArchive, FileText, Check, Package, Truck } from "lucide-react";
import { useSite } from "@/components/providers/site-provider";
import { PriceTag, Stars } from "@/components/ui/badge";
import { ProductVisual } from "@/components/product/product-visual";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { CATEGORY_META, type Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const { dict, locale, currency } = useSite();
  const copy = product.locale[locale];
  const category = CATEGORY_META[product.category][locale];
  const isPhysical = product.delivery === "physical";
  // Galerie réelle si des photos existent, sinon les 3 variantes SVG d'avant.
  const gallery = product.gallery ?? [];

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="card-spooky overflow-hidden rounded-2xl">
            <ProductVisual
              product={product}
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="aspect-4/3 w-full"
            />
          </div>

          {gallery.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {gallery.slice(0, 3).map((source) => (
                <div
                  key={source}
                  className="card-spooky relative aspect-square overflow-hidden rounded-xl"
                >
                  <Image
                    src={source}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 15vw, 30vw"
                    className="object-cover opacity-85"
                    unoptimized={source.startsWith("http")}
                  />
                </div>
              ))}
            </div>
          ) : !product.image ? (
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="card-spooky overflow-hidden rounded-xl"
                  aria-hidden="true"
                >
                  <ProductVisual
                    product={product}
                    sizes="(min-width: 1024px) 15vw, 30vw"
                    className="aspect-square w-full opacity-80"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-xs uppercase tracking-[0.24em] text-ember">
            {category.label}
          </span>
          <h1 className="text-4xl leading-tight text-bone sm:text-5xl">
            {copy.title}
          </h1>
          <p className="text-lg text-bone/60">{copy.tagline}</p>

          <Stars
            rating={product.rating}
            reviews={product.reviews}
            label={dict.product.ratingLabel}
          />

          <PriceTag product={product} currency={currency} dict={dict} size="lg" />

          <p className="leading-relaxed text-bone/70">{copy.description}</p>

          <ul className="flex flex-col gap-2.5">
            {copy.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <Check
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-bile"
                />
                <span className="text-bone/70">{feature}</span>
              </li>
            ))}
          </ul>

          <AddToCartButton product={product} />

          <div className="flex items-start gap-3 rounded-2xl border border-ember/25 bg-ember/8 p-5">
            {isPhysical ? (
              <Truck size={20} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
            ) : (
              <Download size={20} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
            )}
            <div>
              <p className="text-sm font-semibold text-bone">
                {isPhysical ? dict.product.shippingTitle : dict.product.instant}
              </p>
              <p className="mt-1 text-sm text-bone/55">
                {isPhysical
                  ? (product.shipping?.[locale] ?? dict.product.shippingDefault)
                  : dict.product.instantText}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {isPhysical ? (
          <>
            <section className="card-spooky rounded-2xl p-7">
              <h2 className="flex items-center gap-2 text-xl text-bone">
                <Package size={18} className="text-ember" aria-hidden="true" />
                {dict.product.specs}
              </h2>
              <dl className="mt-5 flex flex-col gap-3">
                {(product.specs?.[locale] ?? []).map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-4 rounded-xl border border-bone/10 px-4 py-3"
                  >
                    <dt className="text-sm text-bone/50">{spec.label}</dt>
                    <dd className="text-right text-sm text-bone/85">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="card-spooky flex flex-col gap-6 rounded-2xl p-7">
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-ember">
                  {dict.product.shippingTitle}
                </h2>
                <p className="mt-2 text-bone/75">
                  {product.shipping?.[locale] ?? dict.product.shippingDefault}
                </p>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-ember">
                  {dict.product.shippingDelay}
                </h2>
                <p className="mt-2 text-bone/75">{dict.product.shippingDelayText}</p>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-ember">
                  {dict.product.returns}
                </h2>
                <p className="mt-2 text-bone/75">{dict.product.returnsText}</p>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="card-spooky rounded-2xl p-7">
              <h2 className="flex items-center gap-2 text-xl text-bone">
                <FileArchive size={18} className="text-ember" aria-hidden="true" />
                {dict.product.included}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {(product.files ?? []).map((file) => (
                  <li
                    key={file.name}
                    className="flex items-center justify-between gap-4 rounded-xl border border-bone/10 px-4 py-3"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <FileText
                        size={15}
                        aria-hidden="true"
                        className="shrink-0 text-bone/40"
                      />
                      <span className="truncate text-sm text-bone/80">
                        {file.name}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-bone/45">{file.size}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card-spooky flex flex-col gap-6 rounded-2xl p-7">
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-ember">
                  {dict.product.format}
                </h2>
                <p className="mt-2 text-bone/75">{product.format}</p>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-ember">
                  {dict.product.compatibility}
                </h2>
                <p className="mt-2 text-bone/75">{product.compatibility}</p>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-ember">
                  {dict.product.license}
                </h2>
                <p className="mt-2 text-bone/75">{dict.product.licenseText}</p>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
