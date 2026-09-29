/**
 * Associe les visuels déposés dans `public/produits/` aux produits du
 * catalogue, puis écrit `src/lib/product-images.generated.ts`.
 *
 * Usage :
 *   npm run images:sync
 *
 * Convention de nommage : le fichier doit porter le `slug` du produit.
 *   public/produits/lampe-fantome-lumineuse.webp  ->  /produits/lampe-fantome-lumineuse.webp
 *
 * Pour une galerie, on accepte le suffixe `-1`, `-2`… :
 *   public/produits/lampe-fantome-lumineuse-1.jpg
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, basename, extname } from "node:path";

const ROOT = process.cwd();
const IMAGE_DIR = join(ROOT, "public", "produits");
const OUTPUT = join(ROOT, "src", "lib", "product-images.generated.ts");
const CATALOG = join(ROOT, "src", "lib", "products.ts");

const EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);
const GALLERY = /^(.+)-(\d+)$/;

function readSlugs() {
  // Les slugs sont extraits des deux fichiers de données plutôt que du
  // catalogue importé : ce script tourne en Node brut, sans le runtime Next.
  const sources = [
    join(ROOT, "src", "lib", "physical-products.ts"),
    join(ROOT, "src", "lib", "products.ts"),
  ];

  const slugs = new Set();
  for (const file of sources) {
    if (!existsSync(file)) continue;
    const src = readFileSync(file, "utf8");
    for (const match of src.matchAll(/^\s*slug:\s*"([^"]+)"/gm)) {
      slugs.add(match[1]);
    }
  }
  return slugs;
}

function main() {
  if (!existsSync(IMAGE_DIR)) {
    console.error(
      `Dossier introuvable : ${IMAGE_DIR}\n` +
        `Crée-le et dépose tes visuels nommés d'après le slug des produits.`,
    );
    process.exit(1);
  }

  const slugs = readSlugs();
  const files = readdirSync(IMAGE_DIR).filter((name) => {
    const ext = extname(name).toLowerCase();
    return EXTENSIONS.has(ext) && !name.startsWith(".");
  });

  /** slug -> chemin public */
  const images = {};
  /** slug -> galerie */
  const galleries = {};

  const unmatched = [];

  for (const file of files) {
    const name = basename(file, extname(file));
    const galleryMatch = name.match(GALLERY);

    const slug = galleryMatch ? galleryMatch[1] : name;
    const isGallery = Boolean(galleryMatch);

    if (!slugs.has(slug)) {
      unmatched.push(file);
      continue;
    }

    const publicPath = `/produits/${file}`;

    if (isGallery) {
      (galleries[slug] ??= []).push(publicPath);
    } else {
      images[slug] = publicPath;
    }
  }

  // Tri des vignettes pour un ordre déterministe.
  for (const slug of Object.keys(galleries)) {
    galleries[slug].sort();
  }

  const withGallery = Object.keys(galleries).length;

  const body = `/**
 * Fichier GÉNÉRÉ — ne pas éditer à la main.
 *
 * Régénérer avec \`npm run images:sync\` après avoir déposé des visuels dans
 * \`public/produits/\`. Le script associe chaque fichier à un produit via son
 * nom (le \`slug\` du produit) et écrit le résultat ici.
 *
 * ${Object.keys(images).length} produit(s) avec photographie.
 */

export const PRODUCT_IMAGES: Record<string, string> = ${JSON.stringify(
    images,
    null,
    2,
  )};

export const PRODUCT_GALLERIES: Record<string, string[]> = ${JSON.stringify(
    galleries,
    null,
    2,
  )};
`;

  writeFileSync(OUTPUT, body, "utf8");

  console.log(`Visuels traités : ${files.length}`);
  console.log(`Produits avec photo : ${Object.keys(images).length} / ${slugs.size}`);
  console.log(`Produits avec galerie : ${withGallery}`);

  if (unmatched.length) {
    console.warn(
      `\n${unmatched.length} fichier(s) ignoré(s), nom ne correspondant à aucun produit :`,
    );
    for (const file of unmatched) console.warn(`  - ${file}`);
  }

  const missing = [...slugs].filter((slug) => !images[slug]);
  if (missing.length) {
    console.log(`\nProduits encore sans photo (${missing.length}) :`);
    console.log(`  ${missing.join("\n  ")}`);
  }
}

main();
