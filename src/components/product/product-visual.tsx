"use client";

import Image from "next/image";
import { ProductArtwork } from "@/components/product/product-artwork";
import type { Product } from "@/lib/products";

/**
 * Visuel d'un produit : photographie si elle existe, sinon illustration SVG.
 *
 * Le choix se fait à chaque rendu. Un produit sans photo ne casse rien et
 * continue d'afficher son dégradé + glyphe, ce qui permet d'alimenter le
 * catalogue fichier par fichier.
 *
 * `priority` n'est utilisé que sur l'image principale d'une fiche produit :
 * c'est la seule image au-dessus de la ligne de flottaison qu'il faut
 * précharger. Partout ailleurs, le lazy loading par défaut suffit.
 */
export function ProductVisual({
  product,
  className = "",
  sizes = "(min-width: 1024px) 30vw, 50vw",
  priority = false,
}: {
  product: Product;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!product.image) {
    return (
      <ProductArtwork
        glyph={product.art.glyph}
        from={product.art.from}
        to={product.art.to}
        className={className}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={product.image}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        // Un fichier plus large que la source ne doit pas être agrandi :
        // le navigateur garde alors la netteté d'origine.
        unoptimized={product.image.startsWith("http")}
      />
    </div>
  );
}
