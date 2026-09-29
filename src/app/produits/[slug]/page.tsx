import type { Metadata } from "next";
import {
  ProductPage,
  ProductJsonLd,
  generateProductMetadata,
  generateStaticParams,
} from "@/components/product/product-page";
import { getProduct } from "@/lib/products";

export { generateStaticParams };

export async function generateMetadata({
  params,
}: PageProps<"/produits/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "404" };
  return generateProductMetadata(product, "fr");
}

export default async function Page({ params }: PageProps<"/produits/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  return (
    <>
      <ProductJsonLd product={product!} />
      <ProductPage params={params} locale="fr" />
    </>
  );
}
