/**
 * Catégories de la boutique.
 *
 * Deux familles cohabitent :
 * - les produits **digitaux** (illustrations, imprimables, LUTs, audio,
 *   templates) quiexistaient avant ;
 * - les produits **physiques** (déco, bougies, costumes, bonbons, kits)
 *   ajoutés pour la boutique Halloween.
 *
 * Chaque catégorie porte sa couleur d'accent, utilisée par les cartes, les
 * filtres et les dégradés du visuel produit.
 */

export type CategoryGroup = "digital" | "physical";

export const CATEGORIES = [
  // Physiques
  "deco-lumineuse",
  "bougies-senteurs",
  "costumes-masques",
  "sacs-bonbons",
  "kits-creatifs",
  // Packs
  "packs",
  // Digitaux
  "illustrations",
  "printables",
  "luts",
  "audio",
  "templates",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Catégories physiques, dans l'ordre d'affichage du brief. */
export const PHYSICAL_CATEGORIES = [
  "deco-lumineuse",
  "bougies-senteurs",
  "costumes-masques",
  "sacs-bonbons",
  "kits-creatifs",
  "packs",
] as const satisfies readonly Category[];

export type CategoryMeta = {
  group: CategoryGroup;
  label: string;
  description: string;
  /** Nom d'icône lucide-react. */
  icon: string;
  /** Classes Tailwind de la couleur d'accent. */
  accent: string;
  /** Couleurs du dégradé du visuel produit. */
  from: string;
  to: string;
};

type LocalizedMeta = Record<"fr" | "en", CategoryMeta>;

export const CATEGORY_META: Record<Category, LocalizedMeta> = {
  "deco-lumineuse": {
    fr: {
      group: "physical",
      label: "Déco lumineuse",
      description: "Lampes, guirlandes et citrouilles qui éclairent le porche.",
      icon: "Lamp",
      accent: "ember",
      from: "#ff8c42",
      to: "#7a2b00",
    },
    en: {
      group: "physical",
      label: "Light-up decor",
      description: "Lamps, garlands and pumpkins that light up the porch.",
      icon: "Lamp",
      accent: "ember",
      from: "#ff8c42",
      to: "#7a2b00",
    },
  },
  "bougies-senteurs": {
    fr: {
      group: "physical",
      label: "Bougies et senteurs",
      description: "Cires, phosphore et parfums qui s’emparent de la pièce.",
      icon: "Flame",
      accent: "violet",
      from: "#c77dff",
      to: "#3a0a63",
    },
    en: {
      group: "physical",
      label: "Candles and scents",
      description: "Wax, glow and scents that take over the room.",
      icon: "Flame",
      accent: "violet",
      from: "#c77dff",
      to: "#3a0a63",
    },
  },
  "costumes-masques": {
    fr: {
      group: "physical",
      label: "Costumes et masques",
      description: "Tenue complète pour adultes, enfants et amis à quatre pattes.",
      icon: "Shirt",
      accent: "blood",
      from: "#ff4d4d",
      to: "#4a0000",
    },
    en: {
      group: "physical",
      label: "Costumes and masks",
      description: "Full outfits for adults, kids and four-legged friends.",
      icon: "Shirt",
      accent: "blood",
      from: "#ff4d4d",
      to: "#4a0000",
    },
  },
  "sacs-bonbons": {
    fr: {
      group: "physical",
      label: "Sacs et bonbons",
      description: "Seaux collector et sacs de trick-or-treat prêts à remplir.",
      icon: "Candy",
      accent: "violet",
      from: "#9d4edd",
      to: "#2a0a4a",
    },
    en: {
      group: "physical",
      label: "Bags and candy",
      description: "Collector buckets and trick-or-treat bags ready to fill.",
      icon: "Candy",
      accent: "violet",
      from: "#9d4edd",
      to: "#2a0a4a",
    },
  },
  "kits-creatifs": {
    fr: {
      group: "physical",
      label: "Kits créatifs et fête",
      description: "Maquillage, faux sang, bricolage et packs de fête complets.",
      icon: "Wand",
      accent: "bile",
      from: "#39ff14",
      to: "#0d3a05",
    },
    en: {
      group: "physical",
      label: "Creative kits and party",
      description: "Makeup, fake blood, crafts and complete party packs.",
      icon: "Wand",
      accent: "bile",
      from: "#39ff14",
      to: "#0d3a05",
    },
  },
  packs: {
    fr: {
      group: "physical",
      label: "Packs complets",
      description: "Trois assortiments à prix réduit pour tout préparer d'un coup.",
      icon: "Gift",
      accent: "ember",
      from: "#ff5c00",
      to: "#5c1000",
    },
    en: {
      group: "physical",
      label: "Bundles",
      description: "Three discounted sets to get everything ready at once.",
      icon: "Gift",
      accent: "ember",
      from: "#ff5c00",
      to: "#5c1000",
    },
  },

  illustrations: {
    fr: {
      group: "digital",
      label: "Illustrations",
      description: "Dessins vectoriels et motifs prêts à trancher.",
      icon: "Sparkles",
      accent: "violet",
      from: "#9d4edd",
      to: "#2a0a4a",
    },
    en: {
      group: "digital",
      label: "Illustrations",
      description: "Vector artwork and patterns, ready to slice.",
      icon: "Sparkles",
      accent: "violet",
      from: "#9d4edd",
      to: "#2a0a4a",
    },
  },
  printables: {
    fr: {
      group: "digital",
      label: "Imprimables",
      description: "Invitations, affiches et décor à imprimer chez soi.",
      icon: "Printer",
      accent: "ember",
      from: "#ff8c42",
      to: "#7a2b00",
    },
    en: {
      group: "digital",
      label: "Printables",
      description: "Invites, posters and decor to print at home.",
      icon: "Printer",
      accent: "ember",
      from: "#ff8c42",
      to: "#7a2b00",
    },
  },
  luts: {
    fr: {
      group: "digital",
      label: "LUTs & Overlays",
      description: "Looks cinéma et nappes volantes pour tes vidéos.",
      icon: "Clapperboard",
      accent: "blood",
      from: "#ff4d4d",
      to: "#4a0000",
    },
    en: {
      group: "digital",
      label: "LUTs & overlays",
      description: "Cinema looks and drifting layers for your video.",
      icon: "Clapperboard",
      accent: "blood",
      from: "#ff4d4d",
      to: "#4a0000",
    },
  },
  audio: {
    fr: {
      group: "digital",
      label: "Audio",
      description: "Ambiances, whooshes et jumpscares prêts à mixer.",
      icon: "AudioLines",
      accent: "bile",
      from: "#39ff14",
      to: "#0d3a05",
    },
    en: {
      group: "digital",
      label: "Audio",
      description: "Ambience, whooshes and jumpscares, ready to mix.",
      icon: "AudioLines",
      accent: "bile",
      from: "#39ff14",
      to: "#0d3a05",
    },
  },
  templates: {
    fr: {
      group: "digital",
      label: "Templates",
      description: "Maquettes éditables pour vos réseaux et vos invitations.",
      icon: "LayoutTemplate",
      accent: "violet",
      from: "#c77dff",
      to: "#3a0a63",
    },
    en: {
      group: "digital",
      label: "Templates",
      description: "Editable layouts for your socials and invitations.",
      icon: "LayoutTemplate",
      accent: "violet",
      from: "#c77dff",
      to: "#3a0a63",
    },
  },
};

/** Libellé d'une catégorie dans la langue courante. */
export function categoryLabel(category: Category, locale: "fr" | "en"): string {
  return CATEGORY_META[category][locale].label;
}

/** Description d'une catégorie dans la langue courante. */
export function categoryDescription(
  category: Category,
  locale: "fr" | "en",
): string {
  return CATEGORY_META[category][locale].description;
}

/** Familles de catégories, pour lister d'un coup. */
export function categoriesInGroup(group: CategoryGroup): Category[] {
  return CATEGORIES.filter((c) => CATEGORY_META[c].fr.group === group);
}
