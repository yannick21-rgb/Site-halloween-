# Visuels produits

Dépose ici les **photos** de tes produits, puis lance :

```bash
npm run images:sync
```

Le script lit ce dossier, associe chaque image à un produit et écrit
`src/lib/product-images.generated.ts`. Les produits sans photo gardent
automatiquement leur illustration SVG générée — tu peux donc avancer fichier par
fichier.

## Convention de nommage

Le nom du fichier doit être **exactement le slug du produit** :

```
public/produits/lampe-fantome-lumineuse.webp
public/produits/squelette-geant-decoratif.jpg
public/produits/pack-soiree-complete.png
```

Formats acceptés : `.webp` (recommandé), `.jpg`, `.jpeg`, `.png`, `.avif`.

## Galerie

Pour une fiche produit avec plusieurs photos, suffixe les extras par un numéro :

```
public/produits/lampe-fantome-lumineuse.webp      <- image principale
public/produits/lampe-fantome-lumineuse-1.jpg     <- vignette 1
public/produits/lampe-fantome-lumineuse-2.jpg     <- vignette 2
```

La fiche produit affiche l'image principale pleine largeur et les trois
premières vignettes en dessous.

## Images hébergées ailleurs

Si tu préfères un CDN, renseigne l'URL directement dans la fiche produit
(`src/lib/physical-products.ts` ou `src/lib/products.ts`) :

```ts
image: "https://cdn.sanity.io/images/.../lampe.webp",
```

Le domaine doit être autorisé dans `next.config.ts` (`IMAGE_HOSTS`). Sans ça,
`next/image` refuse l'hôte au build.

## Conseils pour le poids des fichiers

- **Ratio 4/3** (1200 × 900) : c'est le cadre utilisé par les cartes et la
  fiche produit, l'image est donc exploitée au mieux.
- **Cible < 150 Ko** par photo. Le site sert du WebP et de l'AVIF
  automatiquement, mais un PNG de 3 Mo reste lourd avant conversion.
- Laisse un peu de marge autour du sujet : les cadres sont recadrés en
  `object-cover`.
- Images carrées acceptables pour les produits physiques, ça reste le format le
  plus polyvalent.
