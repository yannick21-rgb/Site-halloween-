import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog/catalog-page";
import { getDictionary } from "@/lib/i18n";

export function generateMetadata(): Metadata {
  const dict = getDictionary("fr");
  return {
    title: dict.catalog.title,
    description: dict.catalog.subtitle,
    alternates: { canonical: "/produits" },
  };
}

export default function Page() {
  return <CatalogPage locale="fr" />;
}
