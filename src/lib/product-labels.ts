import type { Product } from "@/lib/products";
import type { Dictionary } from "@/lib/i18n";

/**
 * Libellés produits partagés par les cartes, le panier, le checkout et la
 * page de confirmation.
 *
 * La boutique vend deux natures de produits : les **digitaux** (livrés par
 * téléchargement) et les **physiques** (expédiés). Ces fonctions
 * garantissent qu'un produit physique n'affiche jamais « Format : PNG » ou un
 * nombre de fichiers.
 */

/** Format du produit physique : on affiche la première caractéristique. */
export function productSpec(
  product: Product,
  locale: "fr" | "en",
): { label: string; value: string } | undefined {
  return product.specs?.[locale]?.[0];
}

/** Badges de livraison affichés sur les cartes et dans le panier. */
export function productDeliveryLabel(
  product: Product,
  dict: Dictionary,
): string {
  return product.delivery === "physical"
    ? dict.product.physicalLabel
    : dict.product.digitalLabel;
}

/** Texte d'une ligne de sous-titre sous un titre de produit. */
export function productSubtitle(
  product: Product,
  locale: "fr" | "en",
  dict: Dictionary,
): string {
  if (product.delivery === "physical") {
    const spec = productSpec(product, locale);
    return spec ? `${spec.label} · ${spec.value}` : dict.product.physicalLabel;
  }

  return [
    product.format,
    `${(product.files ?? []).length} ${dict.product.included.toLowerCase()}`,
  ]
    .filter(Boolean)
    .join(" · ");
}

/** Nombre de fichiers d'un produit digital, 0 pour un produit physique. */
export function productFileCount(product: Product): number {
  return product.files?.length ?? 0;
}

/** Le produit a-t-il un lien de téléchargement ? */
export function hasDownload(product: Product): boolean {
  return product.delivery === "digital" && Boolean(product.downloadUrl);
}
