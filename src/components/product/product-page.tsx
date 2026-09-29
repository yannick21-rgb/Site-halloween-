import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProduct,
  getRelatedProducts,
  PRODUCTS,
  type Product,
} from "@/lib/products";
import { absoluteUrl } from "@/lib/site";
import { getDictionary, href, type Locale } from "@/lib/i18n";
import { ProductDetail } from "@/components/product/product-detail";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { ProductGrid } from "@/components/product/product-card";
import { Reveal, SectionHeading } from "@/components/ui/reveal";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export function generateProductMetadata(
  product: Product,
  locale: Locale,
): Metadata {
  const dict = getDictionary(locale);
  const copy = product.locale[locale];

  return {
    title: copy.title,
    description: copy.tagline,
    alternates: {
      canonical: href(locale, `/produits/${product.slug}`),
      languages: {
        fr: href("fr", `/produits/${product.slug}`),
        en: href("en", `/produits/${product.slug}`),
      },
    },
    openGraph: {
      type: "website",
      title: `${copy.title} · ${dict.siteName}`,
      description: copy.tagline,
      url: href(locale, `/produits/${product.slug}`),
    },
  };
}

export function ProductJsonLd({ product }: { product: Product }) {
  const dict = getDictionary("fr");
  const copy = product.locale.fr;

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: copy.title,
    description: copy.description,
    category: copy.title,
    sku: product.slug,
    brand: { "@type": "Brand", name: dict.siteName },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      price: product.prices.EUR,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/produits/${product.slug}`),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type ProductPageProps = {
  params: Promise<{ slug: string }>;
  locale: Locale;
};

export async function ProductPage({
  params,
  locale,
}: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const dict = getDictionary(locale);
  const copy = product.locale[locale];
  const related = getRelatedProducts(product, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-bone/45">
          <li>
            <Link href={href(locale, "/")} className="hover:text-ember">
              {dict.siteName}
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={13} />
          </li>
          <li>
            <Link
              href={href(locale, "/produits")}
              className="hover:text-ember"
            >
              {dict.product.breadcrumb}
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={13} />
          </li>
          <li aria-current="page" className="truncate text-bone/75">
            {copy.title}
          </li>
        </ol>
      </nav>

      <ProductDetail product={product} />

      <section className="mt-16">
        <h2 className="mb-6 text-2xl text-bone">{dict.product.faqTitle}</h2>
        <FaqAccordion items={dict.faq.items.slice(0, 4)} />
      </section>

      {related.length > 0 && (
        <section className="mt-20">
          <Reveal>
            <SectionHeading title={dict.product.related} align="left" />
          </Reveal>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
