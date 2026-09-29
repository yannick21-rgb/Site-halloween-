# Halloween — boutique mixte digitaux et physique

Site e-commerce fronts-only à thème Halloween : **33 produits** au catalogue —
10 produits digitaux (illustrations, fichiers imprimables, LUTs, ambiances
sonores, templates) et **23 produits physiques** (déco lumineuse, bougies et
senteurs, costumes et masques, sacs et bonbons, kits créatifs, packs).

- **Stack** : Next.js 16.3.7 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react
- **Animations** : CSS pur (`src/components/ui/motion.tsx` + classes de `globals.css`), aucune librairie
- **Langues** : français à la racine `/`, anglais sous `/en`
- **Devises** : EUR / USD, mémorisées dans le navigateur
- **Livraison** : deux natures de produits, distinguées par `delivery: "digital" | "physical"`
  - digitaux : fichiers réels servis depuis `public/downloads/`
  - physiques : addresse de livraison demandée au checkout, expédition simulée

## Démarrer

```bash
bun install
bun run dev     # http://localhost:3000
```

Autres scripts :

```bash
bun run build    # build de production
bun run start    # sert le build
bun run typecheck # tsc --noEmit
```

## ⚠️ Deux contraintes liées à l'environnement

**1. Le dossier contient un espace (`site halloween`).**
Turbopack — le bundler par défaut de Next 16 — échoue sur un chemin avec espace
(`Invalid symlink` / `Module not found`). Les scripts forcent donc webpack avec
`--webpack`. Si tu renommes le dossier sans espace, tu peux retirer ce flag et
revenir au Turbopack par défaut.

**2. Le type-check demande de la mémoire.**
Les scripts fixent `NODE_OPTIONS=--max-old-space-size=…`. Sur une machine
contrainte, réduis la valeur ou lance `bun run typecheck` seul.

## Ce qu'il reste à faire avant la mise en ligne

### 0. Remplacer les liens de téléchargement

Les `downloadUrl` de `src/lib/products.ts` pointent vers `/downloads/<slug>.zip` :
ce sont de **vraies archives servies par le site**, générées automatiquement
comme placeholders (elles contiennent un `LISEZ-MOI.txt`, une licence et un guide
factices). Le téléchargement fonctionne donc réellement de bout en bout.

Pour passer à la phase 2 : dépose tes packs dans `public/downloads/` sous le même
nom, ou remplace chaque `downloadUrl` par l'URL de ton stockage (Hummingbird, S3,
Bunny…). Rien d'autre à toucher.

### 1. Remplacer les données produits

Tout le catalogue est dans **`src/lib/products.ts`**. Les 10 produits sont des
démo. Les champs à compléter pour tes vrais packs :

| Champ | Rôle |
| --- | --- |
| `slug` | URL de la fiche (`/produits/<slug>`) |
| `prices` / `compareAt` | prix EUR et USD, prix barré |
| `locale.fr` / `locale.en` | titre, accroche, description, liste de features |
| `files` | nom et taille des fichiers inclus (affichés sur la fiche) |
| `format` / `compatibility` | ex. `PNG transparent` / `Figma, Photoshop` |
| `art` | `{ glyph, from, to }` — visuel SVG généré, sans image à fournir |
| `downloadUrl` | **lien réel de téléchargement** (à remplacer) |

> Les `downloadUrl` actuels pointent vers `https://downloads.halloween.example/…`,
> un domaine de remplacement. Remplace-les par tes URLs réelles.

### 2. Visuels produits

Les visuels sont des **SVG générés** par `src/components/product/product-artwork.tsx`
(8 glyphes : citrouille, fantôme, crâne, chauve-souris, araignée, chat, bougie,
lune). Chaque produit choisit son glyphe et son dégradé via `art`. Aucun fichier
image n'est nécessaire.

Pour passer à de vraies photos : remplacez le composant par des `next/image` et
ajoutez les fichiers dans `public/previews/`.

### 3. Domaine, contacts et réseaux sociaux

Tout est centralisé dans **`src/lib/site.ts`** : remplace `SITE_URL`,
`CONTACT_EMAIL` et `SITE_NAME`. Le sitemap, `robots.txt`, `metadataBase` et le
JSON-LD des produits en dépendent — aucun autre fichier à modifier.

Les `url` des réseaux sociaux dans `SOCIALS` sont à `null` : les icônes
correspondantes ne sont donc **pas rendues** tant que tu n'as pas de comptes
(aucun lien mort vers `#`). Renseigne-les et elles apparaissent.

Reste aussi à compléter dans `src/lib/legal-content.ts` : identité de l'éditeur,
coordonnées, hébergeur, TVA. Les pages légales fournies sont des gabarits.

> `lucide-react` v1 a retiré les logos de marque, d'où les icônes génériques
> (caméra, @, lecture, code) plutôt qu'Instagram/X/YouTube/GitHub.

## Phase 2 — ce qui est déjà préparé

Le front est conçu pour accueillir le back sans refonte.

| Besoin | Où brancher | État actuel |
| --- | --- | --- |
| Base de données | remplacer `PRODUCTS` dans `src/lib/products.ts` par une requête (SQLite + Drizzle) | données en dur, typées |
| Paiement | `handleSubmit` dans `src/components/checkout/checkout-page.tsx` | commande démo enregistrée, aucun débit |
| Devises réelles | `src/lib/format.ts` | taux en dur dans les prix produits |
| Livraison sécurisée | `downloadUrl` dans le modèle produit | fichiers réels servis par le site, sans expiration ni protection |
| Confirmation de commande | `src/app/commande/succes/` | en place, stocke la commande en `localStorage` |
| Emails transactionnels | à brancher (Resend) | absent |

Le panier est un context React persisté en `localStorage` (clé `halloween:cart`),
avec 1 licence maximum par produit. Le composant `CartProvider` est le point
unique à remplacer par une source serveur.

**Parcours de commande (fonctionnel de bout en bout).** Comme le paiement n'existe
pas encore, le bouton de `/checkout` enregistre une commande de démonstration et
renvoie vers `/commande/succes`, qui affiche le récapitulatif, la référence de
commande et les **vrais liens de téléchargement**. C'est le seul geste à
remplacer par l'appel au prestataire de paiement : voir `placeDemoOrder` dans
`src/lib/order.ts` et `handleSubmit` dans `src/components/checkout/checkout-page.tsx`.

## Illustrations produits

Chaque fiche produit affiche **une illustration SVG qui lui est propre** :
33 visuels distincts, dessinés dans le même trait (dégradé du produit,
`strokeWidth` 2.2, pleins `#0B0A0F`). Aucun doublon dans le catalogue.

| | |
| --- | --- |
| Visuels par produit | `src/components/product/product-glyphs.tsx` |
| Glyphes génériques (décoration) | `src/components/product/product-artwork.tsx` |
| Rendu (dégradé, ombre, survol) | `ProductArtwork` — commun aux deux |
| Liaison produit ↔ visuel | champ `art.glyph` de chaque fiche |

Le champ `art.glyph` porte le nom de l'illustration. `GLYPHS` est vérifié
par `satisfies Record<ArtGlyph, …>` : ajouter un nom à `ART_GLYPHS` sans
entrée correspondante fait échouer le typecheck.

Pour remplacer une illustration par une **photo**, voir la section suivante :
le champ `image` prime sur le visuel SVG.

## Photos produits

Les visuels sont **optionnels et progressifs** : un produit sans photo garde
son illustration SVG générée, donc le catalogue est utilisable tel quel et se
complète fichier par fichier.

1. Dépose tes images dans `public/produits/`, nommées d'après le `slug` du
   produit (`lampe-fantome-lumineuse.webp`).
2. Lance `npm run images:sync`.
3. Le script écrit `src/lib/product-images.generated.ts` et affiche la liste
   des produits encore sans photo.

| Besoin | Où |
| --- | --- |
| Photo principale | `public/produits/<slug>.webp` |
| Vignettes (jusqu'à 3) | `public/produits/<slug>-1.jpg`, `-2.jpg`, `-3.jpg` |
| Image sur un CDN | champ `image` dans la fiche produit + hôte autorisé dans `next.config.ts` |
| Affichage | `src/components/product/product-visual.tsx` |

`next/image` s'occupe du reste : WebP/AVIF automatiques, `srcset` selon la
taille d'écran, `loading="lazy"` partout sauf l'image principale d'une fiche.
Détails et conseils de poids dans `public/produits/README.md`.

## Ambiance et animations

Toute l'ambiance est en **CSS pur**, sans librairie d'animation. Les composants
sont chargés à la demande (`ssr: false`) et ne sont jamais rendus si le visiteur
demande des animations réduites.

| Effet | Fichier | Détail |
| --- | --- | --- |
| Intro plein écran | `src/components/ambient/intro-overlay.tsx` | à chaque visite sur l'accueil, skippable (bouton, clic, Échap) et limitée à 2,6 s |
| Brume | `src/components/ambient/mist.tsx` | deux nappes de dégradés, désactivées sur mobile |
| Lueur de bougie | `src/components/ambient/candle-glow.tsx` | suit le pointeur, uniquement si `pointer: fine` |
| Araignée et fil | `src/components/ambient/spider-web.tsx` | balancement CSS, masqué sous 768 px |
| Fantômes | `src/components/ambient/ghost-drift.tsx` | dérive lente sur les bords de l'écran |
| Effet chaudron | `src/components/product/add-to-cart-button.tsx` | particules à l'ajout au panier |
| Nappe sonore | `src/components/ambient/ambient-sound.tsx` | **Web Audio API, aucun fichier** : bourdon, souffle, craquements |
| Réglages | `src/components/ambient/ambience-toggles.tsx` | boutons son + animations dans le header (desktop et menu mobile) |

Les deux réglages sont persistés dans `localStorage` (`halloween:sound`,
`halloween:reduced-motion`), exposés par `SiteProvider` et répercutés sur
`<html data-motion="reduced">` pour que le CSS puisse couper l'ensemble.

**Accessibilité.** Au premier passage, le réglage « animations réduites » reprend
la préférence système (`prefers-reduced-motion`). Ensuite, le choix explicite
du visiteur prime. Le son est **coupé par défaut**. L'intro ne s'affiche que sur
l'accueil et n'apparaît jamais si les animations sont réduites.

## Structure

```
src/
├── app/
│   ├── layout.tsx            # layout racine FR (html lang="fr")
│   ├── en/layout.tsx         # layout racine EN (html lang="en")
│   ├── global-not-found.tsx   # 404 globale (contourne les layouts)
│   ├── page.tsx · produits/ · panier/ · checkout/ · a-propos/ · faq/ · legal/
│   └── sitemap.ts · robots.ts
├── components/
│   ├── ambient/   ambient-layer, intro-overlay, mist, candle-glow, spider-web, ghost-drift, ambient-sound, ambience-toggles
│   ├── cart/      cart-provider, cart-drawer, cart-page
│   ├── catalog/   catalog-page, catalog-browser
│   ├── checkout/  checkout-page
│   ├── home/      home-page, countdown, newsletter-form
│   ├── layout/    site-shell, header, footer, switchers
│   ├── pages/     info-pages (about, faq), legal-page
│   ├── product/   product-card, product-detail, product-page, product-artwork, …
│   ├── providers/ site-provider (locale, devise, ambiance)
│   └── ui/        button, badge, reveal
└── lib/
    categories.ts        # 6 catégories physiques + packs + 5 digitales
    physical-products.ts # 23 produits physiques
    products.ts          # type Product + catalogue fusionné (33 produits)
    product-labels.ts    # libellés partagés digital / physique
    order.ts             # commande démo en localStorage
    i18n.ts · format.ts · site.ts
```

Deux layouts racine sont utilisés (`app/layout.tsx` et `app/en/layout.tsx`) pour
avoir un `<html lang>` correct sur chaque langue. La navigation entre `/` et `/en`
provoque un rechargement complet de page — c'est le comportement attendu avec
des layouts racine multiples.
