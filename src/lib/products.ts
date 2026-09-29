import type { Currency } from "@/lib/format";
import { CATEGORIES, CATEGORY_META, type Category } from "@/lib/categories";
import { PHYSICAL_PRODUCTS } from "@/lib/physical-products";
import {
  PRODUCT_IMAGES,
  PRODUCT_GALLERIES,
} from "@/lib/product-images.generated";

// Réexportés : le reste de l'application importe déjà depuis ce fichier.
export { CATEGORIES, CATEGORY_META };
export type { Category };

export const ART_GLYPHS = [
  "pumpkin",
  "ghost",
  "skull",
  "bat",
  "spider",
  "cat",
  "candle",
  "moon",
  /* Illustrations dédiées, une par produit (voir product-glyphs.tsx). */
  "ghost-lamp",
  "light-string",
  "led-pumpkin",
  "skeleton",
  "ghost-eyes",
  "inflatable-ghost",
  "ghost-candles",
  "skull-candle",
  "wax-melt",
  "candy-bucket",
  "treat-bag",
  "costume-tee",
  "hoodie",
  "adult-costume",
  "kid-costume",
  "pet-costume",
  "horror-mask",
  "makeup-kit",
  "diy-kit",
  "party-pack",
  "party-box",
  "kids-pack",
  "porch-pack",
  "creepy-art",
  "pattern",
  "invitation",
  "table-set",
  "lut",
  "smoke",
  "audio",
  "whoosh",
  "template",
  "social-kit",
] as const;

export type ArtGlyph = (typeof ART_GLYPHS)[number];

export type Localized = {
  title: string;
  tagline: string;
  description: string;
  features: string[];
};

export type ProductFile = {
  name: string;
  size: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

/**
 * Mode de livraison. `digital` = lien de téléchargement immédiat,
 * `physical` = expédition. Détermine ce qu'affiche la fiche produit, ce que
 * demande le checkout et ce que montre la page de confirmation.
 */
export type Delivery = "digital" | "physical";

export type Product = {
  slug: string;
  category: Category;
  delivery: Delivery;
  prices: Record<Currency, number>;
  compareAt?: Record<Currency, number>;
  badge?: "bestseller" | "new" | "lowStock" | "promo";
  rating: number;
  reviews: number;
  locale: Record<"fr" | "en", Localized>;
  /** Visuel de repli : glyphe SVG + dégradé, toujours présent. */
  art: { glyph: ArtGlyph; from: string; to: string };
  /**
   * Photographie du produit.
   *
   * Absente, le visuel SVG généré est utilisé. Renseignée automatiquement
   * depuis `PRODUCT_IMAGES` si un fichier nommé d'après le `slug` existe dans
   * `public/produits/` (voir `npm run images:sync`), ou à la main pour une
   * image hébergée ailleurs.
   */
  image?: string;
  /** Vignettes additionnelles pour la fiche produit. */
  gallery?: string[];
  featured: boolean;
  publishedAt: string;

  /* --- Produits digitaux uniquement --- */
  files?: ProductFile[];
  format?: string;
  compatibility?: string;
  downloadUrl?: string;

  /* --- Produits physiques uniquement --- */
  /** Caractéristiques affichées sur la fiche produit. */
  specs?: Record<"fr" | "en", ProductSpec[]>;
  /** Délai indicatif, pour literals. */
  shipping?: Record<"fr" | "en", string>;
};

/**
 * Catalogue complet : produits physiques puis produits digitaux.
 *
 * Pour la phase 2, remplacer ce tableau par une lecture en base. Tous les
 * consommateurs passent par `getProduct` / `getFeaturedProducts` /
 * `getRelatedProducts`, donc le reste du code n'a pas besoin de changer.
 */
const CATALOG: Product[] = [
  ...PHYSICAL_PRODUCTS,
  {
    slug: "pack-illustrations-creepy",
    category: "illustrations",
    delivery: "digital",
    prices: { EUR: 19, USD: 21 },
    compareAt: { EUR: 29, USD: 32 },
    badge: "bestseller",
    rating: 4.9,
    reviews: 128,
    format: "PNG transparent",
    compatibility: "Figma, Photoshop, Procreate, Canva, Illustrator",
    locale: {
      fr: {
        title: "Pack Illustrations Creepy",
        tagline: "120 dessins vectoriels prêts à trancher",
        description:
          "Un pack complet d'illustrations originales dans un style cartoon macabre : citrouilles souriantes, fantômes, squelettes, chats noirs et chauves-souris. Chaque dessin existe en version pleine couleur et en silhouette noircie, ideal pour construire une identité Halloween complète sur tous tes supports.",
        features: [
          "120 illustrations originales, 100% vectorielles",
          "Versions couleur + silhouette monochrome",
          "Fichiers PNG haute résolution transparents",
          "Licence commerciale illimitée pour 1 projet",
        ],
      },
      en: {
        title: "Creepy Illustration Pack",
        tagline: "120 original vector illustrations, ready to slice",
        description:
          "A complete set of original illustrations in a spooky cartoon style: grinning pumpkins, ghosts, skeletons, black cats and bats. Every drawing ships in full-colour and silhouette versions, so you can build a consistent Halloween identity across every channel.",
        features: [
          "120 original illustrations, 100% vector",
          "Full-colour and monochrome silhouette versions",
          "High-resolution transparent PNG files",
          "Unlimited commercial licence for 1 project",
        ],
      },
    },
    files: [
      { name: "creepy-pack-colours.zip", size: "184 Mo" },
      { name: "creepy-pack-silhouettes.zip", size: "96 Mo" },
      { name: "guide-de-licence.pdf", size: "220 Ko" },
    ],
    art: { glyph: "creepy-art", from: "#FF5C00", to: "#8B0000" },
    downloadUrl: "/downloads/pack-illustrations-creepy.zip",
    featured: true,
    publishedAt: "2026-09-12",
  },
  {
    slug: "motifs-decoratifs-halloween",
    category: "illustrations",
    delivery: "digital",
    prices: { EUR: 14, USD: 15 },
    rating: 4.7,
    reviews: 64,
    format: "PNG + motif repetitif",
    compatibility: "Figma, Photoshop, Canva, Sketch",
    locale: {
      fr: {
        title: "Motifs décoratifs Halloween",
        tagline: "40 Seamless Patterns pour habiller tes surfaces",
        description:
          "Quarante motifs répétables à l'infini : rayures de sorcière, chaînes, points, ossements et textures malsaines qui se répètent sans couture. Parfaits pour le packaging, les fonds de stories, les cartes de visite et les supports imprimés.",
        features: [
          "40 motifs répétables sans couture",
          "Tuiles 3000 x 3000 px",
          "Versions colorées et monochromes",
          "Formats PNG haute densité et pattern AI",
        ],
      },
      en: {
        title: "Halloween Decorative Patterns",
        tagline: "40 seamless patterns for every surface",
        description:
          "Forty endlessly tileable patterns: witch stripes, chains, dots, bones and sickly textures that repeat without a visible seam. Made for packaging, story backgrounds, business cards and print runs.",
        features: [
          "40 seamless repeating patterns",
          "3000 x 3000 px tiles",
          "Colour and monochrome versions",
          "High-density PNG and AI pattern files",
        ],
      },
    },
    files: [
      { name: "patterns-png.zip", size: "212 Mo" },
      { name: "patterns-ai.zip", size: "48 Mo" },
    ],
    art: { glyph: "pattern", from: "#9D4EDD", to: "#12111A" },
    downloadUrl: "/downloads/motifs-decoratifs-halloween.zip",
    featured: true,
    publishedAt: "2026-09-05",
  },
  {
    slug: "invitations-decorations-imprimables",
    category: "printables",
    delivery: "digital",
    prices: { EUR: 17, USD: 19 },
    badge: "promo",
    compareAt: { EUR: 25, USD: 28 },
    rating: 4.8,
    reviews: 91,
    format: "PDF A4 + PNG",
    compatibility: "Imprimante maison, Canva, impression pro",
    locale: {
      fr: {
        title: "Invitations & Décorations Imprimables",
        tagline: "De quoi couvrir la soirée, de l'invitation au décor",
        description:
          "Une collection pensée pour une soirée Halloween de A à Z : invitations, menus, sets de table, affiches, encadrés et panneaux d'avertissement. Formats A4, A5 et carte de visite, tous en 300 dpi prêts pour l'impression.",
        features: [
          "45 fichiers imprimables, 300 dpi",
          "Invitations, menus, affiches, panneaux, cartes",
          "Formats A4, A5, 10x15 cm et 85x55 mm",
          "Variantes obscures et versions plus légères",
        ],
      },
      en: {
        title: "Invitations & Printable Decor",
        tagline: "Everything from the invite to the front door",
        description:
          "A collection built for a full Halloween evening: invitations, menus, place settings, posters, frames and warning signs. Supplied in A4, A5 and business-card formats, all at 300 dpi and print ready.",
        features: [
          "45 printable files at 300 dpi",
          "Invitations, menus, posters, signs, cards",
          "A4, A5, 10x15 cm and 85x55 mm formats",
          "Dark themed and lighter ink-saving variants",
        ],
      },
    },
    files: [
      { name: "printables-a4.zip", size: "86 Mo" },
      { name: "printables-cartes.zip", size: "34 Mo" },
    ],
    art: { glyph: "invitation", from: "#FF8C42", to: "#8B0000" },
    downloadUrl: "/downloads/invitations-decorations-imprimables.zip",
    featured: true,
    publishedAt: "2026-09-15",
  },
  {
    slug: "set-de-table-affiches",
    category: "printables",
    delivery: "digital",
    prices: { EUR: 9, USD: 10 },
    rating: 4.6,
    reviews: 47,
    format: "PDF A4",
    compatibility: "Imprimante maison, Canva",
    locale: {
      fr: {
        title: "Sets de Table & Affiches",
        tagline: "20 pièces pour habiller la table et les murs",
        description:
          "Vingt pièces décoratives pensées pour un montage rapide : 8 sets de table ronds, 6 affiches grand format, 4 encadrages et 2 panneaux d'entrée. Tout s'accorde avec la palette du site.",
        features: [
          "20 pièces décoratives prêtes à imprimer",
          "8 sets de table, 6 affiches, 4 encadrages",
          "Marges de découpe incluses",
          "Fichier PDF vectoriel et export PNG",
        ],
      },
      en: {
        title: "Table Sets & Posters",
        tagline: "20 pieces to dress the table and the walls",
        description:
          "Twenty decorative pieces designed for a fast setup: 8 round place settings, 6 large posters, 4 framed quotes and 2 doorway signs. Everything shares the same palette as the site.",
        features: [
          "20 print-ready decorative pieces",
          "8 place settings, 6 posters, 4 framed prints",
          "Trim margins included",
          "Vector PDF file plus PNG exports",
        ],
      },
    },
    files: [{ name: "table-sets-posters.zip", size: "62 Mo" }],
    art: { glyph: "table-set", from: "#8B0000", to: "#12111A" },
    downloadUrl: "/downloads/set-de-table-affiches.zip",
    featured: false,
    publishedAt: "2026-09-02",
  },
  {
    slug: "luts-horreur-nuit",
    category: "luts",
    delivery: "digital",
    prices: { EUR: 24, USD: 26 },
    badge: "bestseller",
    rating: 4.9,
    reviews: 203,
    format: "Cube .cube + XML",
    compatibility: "Premiere Pro, DaVinci Resolve, Final Cut, After Effects",
    locale: {
      fr: {
        title: "LUTs Horreur Nuit",
        tagline: "32 looks pour rendre chaque plan inquiétant",
        description:
          "Trente-deux looks testés sur peau réelle et en conditions de nuit réelle : désaturation froide, hautes lumières brûlées, ombres bouchées et un léger virage orange global. Fournis en .cube et .xml pour un glisser-déposer immédiat.",
        features: [
          "32 LUTs cinéma testés en conditions réelles",
          "Formats .cube (Resolve, Premiere) et .xml (FCP)",
          "Variantes light, medium et strong",
          "Vidéos de démonstration et guide d'application",
        ],
      },
      en: {
        title: "Horror Night LUTs",
        tagline: "32 looks to make every shot unsettling",
        description:
          "Thirty-two looks tested on real skin tones and in actual night conditions: cold desaturation, blown highlights, crushed shadows and an orange crush. Supplied as .cube and .xml for instant drag and drop.",
        features: [
          "32 cinema LUTs tested on real footage",
          ".cube (Resolve, Premiere) and .xml (FCP) formats",
          "Light, medium and strong variants",
          "Demo videos plus an application guide",
        ],
      },
    },
    files: [
      { name: "luts-horreur.zip", size: "8 Mo" },
      { name: "demonstrations.zip", size: "410 Mo" },
    ],
    art: { glyph: "lut", from: "#12111A", to: "#9D4EDD" },
    downloadUrl: "/downloads/luts-horreur-nuit.zip",
    featured: true,
    publishedAt: "2026-09-18",
  },
  {
    slug: "overlays-brume-fumee",
    category: "luts",
    delivery: "digital",
    prices: { EUR: 12, USD: 13 },
    rating: 4.7,
    reviews: 88,
    format: "MOV ProRes + PNG",
    compatibility: "Tous les logiciels de montage, After Effects, CapCut",
    locale: {
      fr: {
        title: "Overlays Brume & Fumée",
        tagline: "40 nappes volantes en 4K pour enfoncer l'ambiance",
        description:
          "Quarante nappes de brume, de fumée basse et de poussière en mouvement, capturées en 4K 24 fps sur fond noir et fond vert. Parfettes en fond de plan, en transition ou en calque de profondeur.",
        features: [
          "40 overlays 4K, fond noir et fond vert",
          "Dégradés et mouvements continus sans coupe",
          "Compatible After Effects et Premiere Pro",
          "Aperçus en boucle pour choisir vite",
        ],
      },
      en: {
        title: "Fog & Smoke Overlays",
        tagline: "40 4K drifting layers to push the mood",
        description:
          "Forty sheets of fog, low-lying smoke and floating dust captured in 4K at 24 fps on black and green. Perfect as a base layer, a transition or a depth element.",
        features: [
          "40 4K overlays on black and green",
          "Seamless looping motion and gradients",
          "Works in After Effects and Premiere Pro",
          "Looping previews so you can pick fast",
        ],
      },
    },
    files: [{ name: "overlays-brume-4k.zip", size: "1,4 Go" }],
    art: { glyph: "smoke", from: "#9D4EDD", to: "#12111A" },
    downloadUrl: "/downloads/overlays-brume-fumee.zip",
    featured: false,
    publishedAt: "2026-09-10",
  },
  {
    slug: "ambiances-audio-horrifiques",
    category: "audio",
    delivery: "digital",
    prices: { EUR: 15, USD: 16 },
    rating: 4.8,
    reviews: 76,
    format: "WAV 24 bits / 48 kHz",
    compatibility: "Tous les logiciels audio et vidéo",
    locale: {
      fr: {
        title: "Ambiances Audio Horrifiques",
        tagline: "60 boucles d'ambiance prêtes à mixer",
        description:
          "Soixante boucles capturées en conditions réelles : craquements de plancher, vents, chaînes, portes, pluie battante et couloirs qui résonnent. Chaque boucle est bouclable à l'infini sur une minute au minimum.",
        features: [
          "60 boucles sans coupure, 24 bits / 48 kHz",
          "Ambiances intérieures, extérieures et de couloir",
          "Fichiers WAV masters et MP3 de pré-écoute",
          "Metadata ID3 renseignée pour retrouver vite",
        ],
      },
      en: {
        title: "Horror Ambience Audio",
        tagline: "60 ready-to-mix ambience loops",
        description:
          "Sixty loops captured in real conditions: floor creaks, wind, chains, doors, driving rain and resonating corridors. Every loop is seamless for at least a full minute.",
        features: [
          "60 seamless loops at 24 bits / 48 kHz",
          "Interior, exterior and corridor ambiences",
          "Master WAV files plus MP3 listening copies",
          "Fully tagged metadata for quick searching",
        ],
      },
    },
    files: [
      { name: "ambiances-wav.zip", size: "680 Mo" },
      { name: "ambiances-mp3.zip", size: "92 Mo" },
    ],
    art: { glyph: "audio", from: "#8B0000", to: "#0B0A0F" },
    downloadUrl: "/downloads/ambiances-audio-horrifiques.zip",
    featured: true,
    publishedAt: "2026-09-16",
  },
  {
    slug: "whooshes-jumpscares",
    category: "audio",
    delivery: "digital",
    prices: { EUR: 11, USD: 12 },
    badge: "new",
    rating: 4.5,
    reviews: 39,
    format: "WAV 24 bits / 48 kHz",
    compatibility: "Tous les logiciels audio, After Effects, DaVinci",
    locale: {
      fr: {
        title: "Whooshes & Jumpscares",
        tagline: "80 effets de transition qui font sursauter",
        description:
          "Quatre-vingts whooshes, impacts, ris et stings conçus pour les montages serrés. Chaque effet existe en trois longueurs et en version sans saturation, pour rester propre même après compression.",
        features: [
          "80 whooshes, impacts, risers et stings",
          "3 longueurs par effet, version clean incluse",
          "Nommés par type et par intensité",
          "Import direct dans Premiere et Resolve",
        ],
      },
      en: {
        title: "Whooshes & Jumpscares",
        tagline: "80 transition effects that make people flinch",
        description:
          "Eighty whooshes, impacts, risers and stings cut for tight edits. Every effect comes in three lengths plus a clean unsaturated version that stays tidy after compression.",
        features: [
          "80 whooshes, impacts, risers and stings",
          "3 lengths per effect, clean version included",
          "Named by type and by intensity",
          "Drop straight into Premiere and Resolve",
        ],
      },
    },
    files: [{ name: "whooshes-jumpscares.zip", size: "240 Mo" }],
    art: { glyph: "whoosh", from: "#FF5C00", to: "#8B0000" },
    downloadUrl: "/downloads/whooshes-jumpscares.zip",
    featured: false,
    publishedAt: "2026-09-20",
  },
  {
    slug: "templates-canva-halloween",
    category: "templates",
    delivery: "digital",
    prices: { EUR: 22, USD: 24 },
    badge: "bestseller",
    rating: 4.9,
    reviews: 156,
    format: "Canva Pro, Figma, PowerPoint",
    compatibility: "Canva, Figma, Google Slides, PowerPoint, Keynote",
    locale: {
      fr: {
        title: "Templates Canva Halloween",
        tagline: "60 templates pré-montés à personnaliser en 5 min",
        description:
          "Soixante templates pour toutes les occasions : posts Instagram, stories, affiches, présentations, bannières et cartes. Tout est lié à la palette du site et se modifie sans retouche graphique.",
        features: [
          "60 templates Canva Pro liens et modifiables",
          "Fichiers Figma et PowerPoint inclus",
          "Génération de 5 posts en un clic",
          "Polices de remplacement fournies",
        ],
      },
      en: {
        title: "Halloween Canva Templates",
        tagline: "60 pre-built templates you can customise in 5 minutes",
        description:
          "Sixty templates for every occasion: Instagram posts, stories, posters, slide decks, banners and cards. All share the site palette and stay editable without any design work.",
        features: [
          "60 linked and fully editable Canva Pro templates",
          "Figma and PowerPoint files included",
          "Generate 5 posts in one click",
          "Replacement fonts supplied",
        ],
      },
    },
    files: [
      { name: "templates-canva.zip", size: "46 Mo" },
      { name: "templates-figma.fig", size: "58 Mo" },
    ],
    art: { glyph: "template", from: "#FF8C42", to: "#9D4EDD" },
    downloadUrl: "/downloads/templates-canva-halloween.zip",
    featured: true,
    publishedAt: "2026-09-19",
  },
  {
    slug: "kit-reseaux-sociaux-halloween",
    category: "templates",
    delivery: "digital",
    prices: { EUR: 16, USD: 18 },
    rating: 4.7,
    reviews: 62,
    format: "Figma + After Effects",
    compatibility: "Figma, After Effects, CapCut, Premiere",
    locale: {
      fr: {
        title: "Kit Réseaux Sociaux Halloween",
        tagline: "90 assets et 12 animations pour remplir tout le mois",
        description:
          "Quatre-vingt-dix éléments de marque et douze animations After Effects calibrées pour les formats verticaux, carrés et horizontaux. De quoi tenir un mois de publications sans jamais donner l'impression de répéter.",
        features: [
          "90 social assets in 3 aspect ratios",
          "12 After Effects animations, 1080p et 4K",
          "Couleurs et logos en calques vectoriels",
          "Fichier de style Figma partagé",
        ],
      },
      en: {
        title: "Halloween Social Media Kit",
        tagline: "90 assets and 12 animations to cover the whole month",
        description:
          "Ninety brand assets and twelve After Effects animations calibrated for vertical, square and horizontal formats. Enough to hold a month of posts without ever looking repetitive.",
        features: [
          "90 social assets in 3 aspect ratios",
          "12 After Effects animations, 1080p and 4K",
          "Colours and logos as vector layers",
          "Shared Figma style file",
        ],
      },
    },
    files: [
      { name: "social-kit-assets.zip", size: "128 Mo" },
      { name: "social-kit-ae.zip", size: "740 Mo" },
    ],
    art: { glyph: "social-kit", from: "#9D4EDD", to: "#8B0000" },
    downloadUrl: "/downloads/kit-reseaux-sociaux-halloween.zip",
    featured: false,
    publishedAt: "2026-09-08",
  },
];


/**
 * Applique la photographie détectée dans `public/produits/` au produit
 * correspondant. Un `image` écrit à la main dans la fiche produit l'emporte,
 * ce qui permet d'héberger un visuel sur un CDN sans toucher au script.
 */
function withProductImage(product: Product): Product {
  const image = product.image ?? PRODUCT_IMAGES[product.slug];
  const gallery = product.gallery ?? PRODUCT_GALLERIES[product.slug];

  if (!image && !gallery) return product;
  return { ...product, ...(image ? { image } : {}), ...(gallery ? { gallery } : {}) };
}

export const PRODUCTS: Product[] = CATALOG.map(withProductImage);

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  );
  const others = PRODUCTS.filter(
    (p) => p.category !== product.category && p.slug !== product.slug,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
