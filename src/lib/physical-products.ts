import type { Product, ProductSpec } from "@/lib/products";
import type { Currency } from "@/lib/format";
import type { ArtGlyph } from "@/lib/products";

/**
 * Catalogue physique : déco, bougies, costumes, bonbons et kits.
 *
 * Tous ces produits sont expédiés, pas téléchargés : ils n'ont donc pas de
 * `files` ni de `downloadUrl`. Le visuel reste un SVG généré (`art`), aucun
 * fichier image n'est nécessaire.
 *
 * `physicalProduct` complète les valeurs par défaut (note, date, livraison)
 * pour qu'on ne déclare ici que ce qui est propre à chaque produit.
 */

type PhysicalInput = {
  slug: string;
  category: Product["category"];
  prices: Record<Currency, number>;
  compareAt?: Record<Currency, number>;
  badge?: Product["badge"];
  rating?: number;
  reviews?: number;
  glyph: ArtGlyph;
  from: string;
  to: string;
  featured?: boolean;
  publishedAt?: string;
  fr: { title: string; tagline: string; description: string; features: string[]; specs?: [string, string][] };
  en: { title: string; tagline: string; description: string; features: string[]; specs?: [string, string][] };
  shipping?: { fr: string; en: string };
};

const SHIPPING = {
  fr: "Expédié sous 24 h · livraison 3 à 5 jours ouvrés",
  en: "Ships within 24 h · delivery in 3 to 5 working days",
} as const;

function physicalProduct(input: PhysicalInput): Product {
  const toSpecs = (
    specs: [string, string][] | undefined,
    fallback: { fr: [string, string][]; en: [string, string][] },
  ): Record<"fr" | "en", ProductSpec[]> => ({
    fr: (specs ?? fallback.fr).map(([label, value]) => ({ label, value })),
    en: (specs ?? fallback.en).map(([label, value]) => ({ label, value })),
  });

  return {
    slug: input.slug,
    category: input.category,
    delivery: "physical",
    prices: input.prices,
    compareAt: input.compareAt,
    badge: input.badge,
    rating: input.rating ?? 4.7,
    reviews: input.reviews ?? 24,
    art: { glyph: input.glyph, from: input.from, to: input.to },
    featured: input.featured ?? false,
    publishedAt: input.publishedAt ?? "2026-09-01",
    locale: {
      fr: {
        title: input.fr.title,
        tagline: input.fr.tagline,
        description: input.fr.description,
        features: input.fr.features,
      },
      en: {
        title: input.en.title,
        tagline: input.en.tagline,
        description: input.en.description,
        features: input.en.features,
      },
    },
    specs: toSpecs(input.fr.specs, {
      fr: [
        ["Dimensions", "20 × 12 × 12 cm"],
        ["Matière", "Polyester ignifugé"],
        ["Piles", "3 × AA incluses"],
      ],
      en: [
        ["Dimensions", "8 × 5 × 5 in"],
        ["Material", "Flame-retardant polyester"],
        ["Batteries", "3 × AA included"],
      ],
    }),
    shipping: input.shipping ?? SHIPPING,
  };
}

export const PHYSICAL_PRODUCTS: Product[] = [
  /* ------------------------------------------------------------------
     DÉCO LUMINEUSE
     ------------------------------------------------------------------ */
  physicalProduct({
    slug: "lampe-fantome-lumineuse",
    category: "deco-lumineuse",
    prices: { EUR: 34, USD: 37 },
    compareAt: { EUR: 45, USD: 49 },
    badge: "bestseller",
    rating: 4.9,
    reviews: 214,
    glyph: "ghost-lamp",
    from: "#ffffff",
    to: "#6c7bd9",
    featured: true,
    fr: {
      title: "Lampe fantôme lumineuse",
      tagline: "Il flotte vraiment — et il s'allume quand il est content.",
      description:
        "Un fantôme en tissu translucide, monté sur un anneau aimanté, qui flotte à quelques centimètres du sol et réagit au toucher. Alimenté par piles ou USB, il fait défiler cinq ambiances lumineuses pour accompagner la soirée jusqu'au bout.",
      features: [
        "Flotte à 12 cm du sol grâce à un anneau magnétique",
        "5 ambiances lumineuses et 3 sons d'ambiance",
        "Alimentation piles ou USB-C",
        "Arrêt automatique après 6 heures",
      ],
      specs: [
        ["Hauteur", "70 cm"],
        ["Diamètre", "35 cm"],
        ["Alimentation", "3 × AA ou USB-C"],
        ["Tissu", "Nylon translucide"],
      ],
    },
    en: {
      title: "Glowing ghost lamp",
      tagline: "It really floats — and it lights up when it feels like it.",
      description:
        "A translucent fabric ghost on a magnetic ring, floating a few centimetres off the ground and reacting to touch. Battery or USB powered, it cycles through five light moods to carry the evening all the way through.",
      features: [
        "Floats 12 cm off the ground on a magnetic ring",
        "5 light moods and 3 ambient sounds",
        "Battery or USB-C powered",
        "Auto shut-off after 6 hours",
      ],
      specs: [
        ["Height", "27 in"],
        ["Diameter", "14 in"],
        ["Power", "3 × AA or USB-C"],
        ["Fabric", "Translucent nylon"],
      ],
    },
  }),
  physicalProduct({
    slug: "guirlandes-led-citrouilles-chauves-souris",
    category: "deco-lumineuse",
    prices: { EUR: 19, USD: 21 },
    badge: "bestseller",
    rating: 4.8,
    reviews: 176,
    glyph: "light-string",
    from: "#ff8c42",
    to: "#8a2b00",
    featured: true,
    fr: {
      title: "Guirlandes LED citrouilles et chauves-souris",
      tagline: "Dix mètres de lueur orange pour border tout le porche.",
      description:
        "Une guirlande de 10 mètres percée de citrouilles et de chauves-souris en silicone, alimentée par USB. Étanche, elle tient dehors sous la pluie et les branches s'accrochent sans accrocher. Quatre modes dont un scintillement lent très photogénique.",
      features: [
        "10 mètres, 50 citrouilles et chauves-souris en silicone",
        "Étanche IP65 : elle reste dehors sous la pluie",
        "4 modes d'éclairage dont scintillement lent",
        "Alimentation USB, 2 m de câble",
      ],
      specs: [
        ["Longueur", "10 m"],
        ["Ampoules", "50 LED"],
        ["Étanchéité", "IP65"],
        ["Alimentation", "USB 5V"],
      ],
    },
    en: {
      title: "LED pumpkin and bat garland",
      tagline: "Ten metres of orange glow for the whole porch.",
      description:
        "A 10-metre garland dotted with silicone pumpkins and bats, USB powered. Waterproof, it stays out in the rain and hooks onto branches without a fuss. Four modes, including a slow flicker that photographs beautifully.",
      features: [
        "10 metres, 50 silicone pumpkins and bats",
        "IP65 rated: stays out in the rain",
        "4 lighting modes including a slow flicker",
        "USB powered, 2 m cable",
      ],
      specs: [
        ["Length", "33 ft"],
        ["Bulbs", "50 LED"],
        ["Waterproofing", "IP65"],
        ["Power", "USB 5V"],
      ],
    },
  }),
  physicalProduct({
    slug: "citrouilles-led-reutilisables",
    category: "deco-lumineuse",
    prices: { EUR: 24, USD: 26 },
    badge: "lowStock",
    rating: 4.6,
    reviews: 89,
    glyph: "led-pumpkin",
    from: "#ffb347",
    to: "#a33a00",
    fr: {
      title: "Citrouilles LED réutilisables",
      tagline: "Pas jetables : tu les ranges, tu les retrorses chaque année.",
      description:
        "Trois citrouilles LED en polypropylène rigide, sans pile à remplacer : la charge USB tient huit heures de soirée. Le vinyle se décolle proprement, tu peux repeindre la citrouille et la ressortir l'année prochaine.",
      features: [
        "3 citrouilles, 8 h d'autonomie par charge",
        "Sans pile, rechargeable en USB",
        "Vinyle décollable et surface repeignable",
        "Résiste au gel jusqu'à -10 °C",
      ],
      specs: [
        ["Lot", "3 citrouilles"],
        ["Diamètre", "18, 22 et 26 cm"],
        ["Autonomie", "8 heures"],
        ["Charge", "USB-C"],
      ],
    },
    en: {
      title: "Reusable LED pumpkins",
      tagline: "Not disposable: pack them away and bring them back next year.",
      description:
        "Three rigid polypropylene LED pumpkins with nothing to replace — the USB charge lasts a full eight-hour evening. The vinyl peels off cleanly, so you can repaint the pumpkin and bring it back next Halloween.",
      features: [
        "3 pumpkins, 8 h per charge",
        "No batteries, USB rechargeable",
        "Peel-off vinyl and paintable surface",
        "Freeze resistant down to -10 °C",
      ],
      specs: [
        ["Set", "3 pumpkins"],
        ["Diameter", "7, 9 and 10 in"],
        ["Battery life", "8 hours"],
        ["Charge", "USB-C"],
      ],
    },
  }),
  physicalProduct({
    slug: "squelette-geant-decoratif",
    category: "deco-lumineuse",
    prices: { EUR: 89, USD: 96 },
    badge: "lowStock",
    rating: 4.7,
    reviews: 41,
    glyph: "skeleton",
    from: "#e8e4d8",
    to: "#3a3a4a",
    fr: {
      title: "Squelette géant décoratif",
      tagline: "Deux mètres de dread, montagem en dix minutes.",
      description:
        "Un squelette grandeur nature en polypropylène expansé, articulé aux épaules et aux hanches. Il tient debout seul grâce à son pied renforcé, supporte la pluie et se range à plat pour les années suivantes.",
      features: [
        "180 cm, articulé aux épaules et aux hanches",
        "Tient debout seul, pied renforcé",
        "Se démonte en 4 parties pour le rangement",
        "Traitement anti-UV et anti-pluie",
      ],
      specs: [
        ["Hauteur", "180 cm"],
        ["Matière", "Polypropylène expansé"],
        ["Articulations", "Épaules et hanches"],
        ["Poids", "2,4 kg"],
      ],
    },
    en: {
      title: "Giant decorative skeleton",
      tagline: "Two metres of dread, assembled in ten minutes.",
      description:
        "A life-size expanded polypropylene skeleton, articulated at the shoulders and hips. It stands on its own thanks to a reinforced foot, shrugs off rain, and folds flat for the years to come.",
      features: [
        "180 cm, articulated at shoulders and hips",
        "Stands alone on a reinforced foot",
        "Breaks into 4 parts for storage",
        "UV-treated and weather resistant",
      ],
      specs: [
        ["Height", "71 in"],
        ["Material", "Expanded polypropylene"],
        ["Articulation", "Shoulders and hips"],
        ["Weight", "5.3 lb"],
      ],
    },
  }),
  physicalProduct({
    slug: "decor-anime-yeux-fantome",
    category: "deco-lumineuse",
    prices: { EUR: 42, USD: 45 },
    badge: "new",
    rating: 4.5,
    reviews: 63,
    glyph: "ghost-eyes",
    from: "#b6ff5c",
    to: "#1d4d0d",
    publishedAt: "2026-09-18",
    fr: {
      title: "Décor animé à yeux et fantôme",
      tagline: "Quelque chose bouge dans le couloir. Ce n'est pas toi.",
      description:
        "Un décor motorisé au choix — yeuxhauriculés qui suivent les passants, ou petit fantôme qui se balance et tourne la tête. Le capteur infrarouge déclenche le mouvement à deux mètres, pile pour un porche qui surprend.",
      features: [
        "Version « yeux » ou version « fantôme »",
        "Capteur infrarouge : déclenchement à 2 m",
        "Moteur silencieux, à pile",
        "Boîtier étanche pour l'extérieur",
      ],
      specs: [
        ["Variantes", "Yeux ou fantôme"],
        ["Portée capteur", "2 m"],
        ["Alimentation", "4 × AA"],
        ["Indice", "IP44"],
      ],
    },
    en: {
      title: "Animated eyes and ghost decor",
      tagline: "Something moves in the hallway. It isn't you.",
      description:
        "A motorised prop of your choice — glowing eyes that follow passers-by, or a small ghost that sways and turns its head. An infrared sensor triggers the movement at two metres, perfect for a porch that gives people a start.",
      features: [
        "Choose the “eyes” or the “ghost” version",
        "Infrared sensor: triggers at 2 m",
        "Silent motor, battery powered",
        "Weather-resistant housing for outdoors",
      ],
      specs: [
        ["Variants", "Eyes or ghost"],
        ["Sensor range", "2 m"],
        ["Power", "4 × AA"],
        ["Rating", "IP44"],
      ],
    },
  }),
  physicalProduct({
    slug: "gonflable-fantome-mignon",
    category: "deco-lumineuse",
    prices: { EUR: 29, USD: 32 },
    badge: "new",
    rating: 4.8,
    reviews: 112,
    glyph: "inflatable-ghost",
    from: "#d9c2ff",
    to: "#4a1a80",
    publishedAt: "2026-09-20",
    fr: {
      title: "Gonflable fantôme mignon",
      tagline: "Trop doux pour faire peur. Exactement ce qu'il fallait.",
      description:
        "Un fantôme de 90 cm en velours lavé, sourire en croissant de lune et joues roses. Gonflé en permanence par un ventilateur interne, il sert de coussin, de rebond pour les enfants et de photophore pour la déco.",
      features: [
        "90 cm, velours lavé doux",
        "Ventilateur interne, reste gonflé des jours",
        "Sourisure et joues cousues main",
        "Se dégonfle et se rang dans son sac",
      ],
      specs: [
        ["Hauteur", "90 cm"],
        ["Matière", "Velours lavé"],
        ["Ventilateur", "USB, 3 vitesses"],
        ["Poids", "1,1 kg"],
      ],
    },
    en: {
      title: "Cute inflatable ghost",
      tagline: "Too soft to be scary. Exactly what was needed.",
      description:
        "A 90 cm ghost in washed velvet, with a crescent-moon smile and pink cheeks. Kept inflated by a small internal fan, it doubles as a cushion, a bouncy toy for the kids and a soft lamp for the decor.",
      features: [
        "90 cm, soft washed velvet",
        "Internal fan, stays up for days",
        "Hand-stitched smile and cheeks",
        "Deflates and folds into its bag",
      ],
      specs: [
        ["Height", "35 in"],
        ["Material", "Washed velvet"],
        ["Fan", "USB, 3 speeds"],
        ["Weight", "2.4 lb"],
      ],
    },
  }),

  /* ------------------------------------------------------------------
     BOUGIES ET SENTEURS
     ------------------------------------------------------------------ */
  physicalProduct({
    slug: "bougies-fantomes",
    category: "bougies-senteurs",
    prices: { EUR: 22, USD: 24 },
    badge: "bestseller",
    rating: 4.8,
    reviews: 158,
    glyph: "ghost-candles",
    from: "#ffffff",
    to: "#8a8ab8",
    featured: true,
    fr: {
      title: "Bougies fantômes",
      tagline: "Une flamme en forme de spectre, parfumée à la vanille brûlée.",
      description:
        "Trois bougies sculptées en fantômes, cire de coco et mèche en coton. La flamme danse légèrement à l'intérieur du corps translucide et projette des ombres mouvantes sur les murs. Parfums : vanille brûlée, encens et trouble-citron.",
      features: [
        "3 bougies de 220 g, durée 35 h chacune",
        "Cire de coco, mèche en coton sans plomb",
        "Parfums vanille brûlée, encens et trouble-citron",
      ],
      specs: [
        ["Lot", "3 bougies"],
        ["Poids", "220 g chacune"],
        ["Durée", "35 heures"],
        ["Cire", "Cire de coco"],
      ],
    },
    en: {
      title: "Ghost candles",
      tagline: "A flame shaped like a spirit, scented with burnt vanilla.",
      description:
        "Three candles sculpted as ghosts, in coconut wax with cotton wicks. The flame dances slightly inside the translucent body and throws moving shadows on the walls. Scents: burnt vanilla, incense and citrine.",
      features: [
        "3 candles of 220 g, 35 h burn time each",
        "Coconut wax, lead-free cotton wick",
        "Burnt vanilla, incense and citrine scents",
      ],
      specs: [
        ["Set", "3 candles"],
        ["Weight", "7.8 oz each"],
        ["Burn time", "35 hours"],
        ["Wax", "Coconut wax"],
      ],
    },
  }),
  physicalProduct({
    slug: "bougies-crane-phosphorescentes",
    category: "bougies-senteurs",
    prices: { EUR: 26, USD: 28 },
    badge: "bestseller",
    rating: 4.9,
    reviews: 187,
    glyph: "skull-candle",
    from: "#39ff14",
    to: "#0d3a05",
    fr: {
      title: "Bougies crâne phosphorescentes",
      tagline: "Elles brillent encore trois heures après la dernière flamme.",
      description:
        "Des crânes en cire blanche piqués d'yeux phosphorescents qui gardent leur lueur verte après extinction. Le contraste entre la lueur froide et la flamme chaude fait un effet saisissant dans une pièce noire.",
      features: [
        "Yeux phosphorescents, lueur 3 h après extinction",
        "2 crânes de 300 g, 40 h de combustion",
        "Mèches en coton, sans plomb",
        "Parfum bois de santal et menthe glacée",
      ],
      specs: [
        ["Lot", "2 crânes"],
        ["Poids", "300 g chacun"],
        ["Durée", "40 heures"],
        ["Lueur", "3 heures"],
      ],
    },
    en: {
      title: "Glowing skull candles",
      tagline: "They still glow three hours after the last flame.",
      description:
        "White wax skulls set with phosphorescent eyes that keep their green glow long after you blow them out. The contrast between cold glow and warm flame is genuinely striking in a dark room.",
      features: [
        "Phosphorescent eyes, glow for 3 h after blowing out",
        "2 skulls of 300 g, 40 h burn time",
        "Cotton wicks, lead free",
        "Sandalwood and iced mint scents",
      ],
      specs: [
        ["Set", "2 skulls"],
        ["Weight", "10.6 oz each"],
        ["Burn time", "40 hours"],
        ["Glow", "3 hours"],
      ],
    },
  }),
  physicalProduct({
    slug: "cire-fondee-savons-halloween",
    category: "bougies-senteurs",
    prices: { EUR: 18, USD: 20 },
    badge: "new",
    rating: 4.6,
    reviews: 74,
    glyph: "wax-melt",
    from: "#ff5c00",
    to: "#5c1000",
    publishedAt: "2026-09-15",
    fr: {
      title: "Cire fondue et savons Halloween",
      tagline: "Cire fondue pour le diffuseur, savon pour les mains. Parfums d'Halloween.",
      description:
        "Un coffret de 12 cires fondues et 6 savons en forme de crâne, citron et citrouille. Fondus pour le diffuseur pendant huit heures, les savons restent doux même après le passage des invitations sous la pluie.",
      features: [
        "12 cires fondue (environ 8 h de diffusion)",
        "6 savons sculptés, 80 g chacun",
        "Parfums citrouille, calebasse et pomme interlope",
        "Coffret cadeau prêt à offrir",
      ],
      specs: [
        ["Cires fondue", "12 × 15 g"],
        ["Savons", "6 × 80 g"],
        ["Diffusion", "8 heures"],
        ["Coffret", "Carton rigide"],
      ],
    },
    en: {
      title: "Halloween wax melts and soaps",
      tagline: "Wax melts for the burner, soap for the hands. Halloween scents.",
      description:
        "A gift set of 12 wax melts and 6 skull-, lemon- and pumpkin-shaped soaps. The melts run about 8 hours in a warmer, and the soaps still feel soft long after the party water damage.",
      features: [
        "12 wax melts (about 8 h of diffusion)",
        "6 sculpted soaps, 80 g each",
        "Pumpkin, squash and forbidden apple scents",
        "Ready-to-gift rigid box",
      ],
      specs: [
        ["Wax melts", "12 × 15 g"],
        ["Soaps", "6 × 80 g"],
        ["Diffusion", "8 hours"],
        ["Box", "Rigid cardboard"],
      ],
    },
  }),

  /* ------------------------------------------------------------------
     SACS ET BONBONS
     ------------------------------------------------------------------ */
  physicalProduct({
    slug: "seaux-bonbons-collector",
    category: "sacs-bonbons",
    prices: { EUR: 12, USD: 13 },
    badge: "bestseller",
    rating: 4.7,
    reviews: 231,
    glyph: "candy-bucket",
    from: "#ff5c00",
    to: "#7a2b00",
    featured: true,
    fr: {
      title: "Seaux à bonbons collector",
      tagline: "Trois seaux en métal, édition numérotée, à garder après.",
      description:
        "Trois seaux en métal sans couvercle, décorés de citrouilles, crânes et chauves-souris, numérotés à l'intérieur. Ils se réutilisent pour les décorations de l'année suivante au lieu de finir à la poubelle.",
      features: [
        "3 seaux en fer-blanc, édition numérotée",
        "Format 22 cm, contient environ 1 kg de bonbons",
        "Décor à l'intérieur comme à l'extérieur",
        "Se réutilisent comme pots à décor",
      ],
      specs: [
        ["Lot", "3 seaux"],
        ["Hauteur", "22 cm"],
        ["Matière", "Fer-blanc"],
        ["Capacité", "~1 kg de bonbons"],
      ],
    },
    en: {
      title: "Collector candy buckets",
      tagline: "Three metal buckets, numbered edition, worth keeping.",
      description:
        "Three unlined tin buckets decorated with pumpkins, skulls and bats, numbered on the inside. They get reused for next year's decor instead of heading straight to the bin.",
      features: [
        "3 tin buckets, numbered edition",
        "22 cm tall, holds about 1 kg of candy",
        "Decorated inside and out",
        "Reusable as decor pots",
      ],
      specs: [
        ["Set", "3 buckets"],
        ["Height", "8.7 in"],
        ["Material", "Tinplate"],
        ["Capacity", "~1 kg of candy"],
      ],
    },
  }),
  physicalProduct({
    slug: "sacs-trick-or-treat-personnalises",
    category: "sacs-bonbons",
    prices: { EUR: 9, USD: 10 },
    badge: "new",
    rating: 4.5,
    reviews: 58,
    glyph: "treat-bag",
    from: "#9d4edd",
    to: "#2a0a4a",
    publishedAt: "2026-09-12",
    fr: {
      title: "Sacs « trick-or-treat » personnalisés",
      tagline: "Le prénom de l'enfant imprimé, pour un sac unique.",
      description:
        "Des sacs en papier épais de 26 cm, imprimés avec le prénom et le motif choisis. Assez grands pour la chasse aux bonbons, assez solides pour ne pas se déchirer au premier carambar au fond.",
      features: [
        "Personnalisation du prénom et du motif",
        "Papier 200 g, poignées renforcées",
        "Format 26 × 32 cm, tient beaucoup de bonbons",
        "Impression tenanted à la main",
      ],
      specs: [
        ["Lot", "10 sacs"],
        ["Format", "26 × 32 cm"],
        ["Papier", "200 g/m²"],
        ["Personnalisation", "Prénom + motif"],
      ],
    },
    en: {
      title: "Personalised trick-or-treat bags",
      tagline: "The child's name printed on it, for a one-of-a-kind bag.",
      description:
        "Sturdy 26 cm paper bags printed with the name and pattern of your choice. Big enough for a proper candy run, sturdy enough not to tear at the first sweet at the bottom.",
      features: [
        "Personalise the name and the pattern",
        "200 gsm paper, reinforced handles",
        "26 × 32 cm, holds plenty of candy",
        "Hand-checked printing",
      ],
      specs: [
        ["Set", "10 bags"],
        ["Size", "10 × 12.5 in"],
        ["Paper", "200 gsm"],
        ["Personalisation", "Name + pattern"],
      ],
    },
  }),

  /* ------------------------------------------------------------------
     COSTUMES ET MASQUES
     ------------------------------------------------------------------ */
  physicalProduct({
    slug: "tshirts-ceci-est-mon-costume",
    category: "costumes-masques",
    prices: { EUR: 25, USD: 27 },
    badge: "bestseller",
    rating: 4.7,
    reviews: 302,
    glyph: "costume-tee",
    from: "#ffffff",
    to: "#1a1a1a",
    featured: true,
    fr: {
      title: "T-shirts « ceci est mon costume »",
      tagline: "Pour s'asseoir à côté de la bouilloire, pas dedans.",
      description:
        "Un t-shirt coton bio qui annonce l'appartenance à la maison plutôt que le costume. Cinq modèles sérigraphiés, du simple crâne à la casserole en tête. Il se porte toute l'année, ce qui est plus qu'on ne peut en dire d'un vrai costume.",
      features: [
        "Coton bio 180 g/m², coupe unisexe",
        "5 modèles : crâne, sorcière, zombie, squelette, sorcier",
        "Sérigraphie qui ne craquelle pas au lavage",
        "Tailles du XS au 3XL",
      ],
      specs: [
        ["Matière", "Coton bio 180 g/m²"],
        ["Tailles", "XS à 3XL"],
        ["Impression", "Sérigraphie plastisol"],
        ["Lavable", "Machine 30 °C"],
      ],
    },
    en: {
      title: "'This is my costume' t-shirts",
      tagline: "For sitting by the cauldron, not in it.",
      description:
        "An organic cotton t-shirt that announces which house you belong to rather than the costume you're wearing. Five screen-printed designs, from a plain skull to the full cauldron. Wearable all year, which is more than can be said for most costumes.",
      features: [
        "180 gsm organic cotton, unisex fit",
        "5 designs: skull, witch, zombie, skeleton, wizard",
        "Screen print that will not crack in the wash",
        "Sizes XS to 3XL",
      ],
      specs: [
        ["Material", "180 gsm organic cotton"],
        ["Sizes", "XS to 3XL"],
        ["Print", "Plastisol screen print"],
        ["Care", "Machine wash 30 °C"],
      ],
    },
  }),
  physicalProduct({
    slug: "hoodies-halloween",
    category: "costumes-masques",
    prices: { EUR: 49, USD: 53 },
    badge: "new",
    rating: 4.9,
    reviews: 176,
    glyph: "hoodie",
    from: "#9d4edd",
    to: "#1a0a2a",
    publishedAt: "2026-09-10",
    fr: {
      title: "Hoodies Halloween",
      tagline: "Capuche bordée, poche kangourou, et il tient vraiment chaud.",
      description:
        "Un hoodie épais en molleton gratté, capuche doublée et poche kangourou profonde. Trois modèle brodés en fil phosphorescent sur la capuche et le dos : il brille quand on éteint, ce qui produit son effet dans l'entrée.",
      features: [
        "Molleton gratté 320 g/m², capuche doublée",
        "Broderie phosphorescente capuche et dos",
        "Poche kangourou profonde, cordon de serrage",
        "Brillait dans le noir pendant 2 h",
      ],
      specs: [
        ["Matière", "Molleton gratté 320 g/m²"],
        ["Tailles", "S à XXL"],
        ["Broderie", "Fil phosphorescent"],
        ["Lueur", "2 heures"],
      ],
    },
    en: {
      title: "Halloween hoodies",
      tagline: "Lined hood, kangaroo pocket, and it is genuinely warm.",
      description:
        "A heavyweight brushed fleece hoodie with a lined hood and a deep kangaroo pocket. Three models embroidered with glow thread on the hood and back: it glows once you switch the lights off, which lands hard in a hallway.",
      features: [
        "320 gsm brushed fleece, lined hood",
        "Glow-in-the-dark embroidery, hood and back",
        "Deep kangaroo pocket, drawstring hood",
        "Glows in the dark for 2 hours",
      ],
      specs: [
        ["Material", "320 gsm brushed fleece"],
        ["Sizes", "S to XXL"],
        ["Embroidery", "Glow thread"],
        ["Glow", "2 hours"],
      ],
    },
  }),
  physicalProduct({
    slug: "costumes-adultes",
    category: "costumes-masques",
    prices: { EUR: 65, USD: 70 },
    badge: "bestseller",
    rating: 4.6,
    reviews: 94,
    glyph: "adult-costume",
    from: "#8b0000",
    to: "#1a0000",
    fr: {
      title: "Costumes adultes",
      tagline: "Squelette, sorcière, zombie, vampire. Taille M à XXL.",
      description:
        "Quatre tenues adultes complètes en polyester ignifugé, cape pour la sorcière, faux sang en poche pour le zombie. Les coutures sont doublées aux jointures : un costume qui se déchire à l'épaule ne sert à rien.",
      features: [
        "4 tenues : squelette, sorcière, zombie, vampire",
        "Polyester ignifugé, coutures doublées",
        "Tailles M à XXL, patron ajusté",
        "Accessoires inclus selon la tenue",
      ],
      specs: [
        ["Modèles", "4 tenues"],
        ["Matière", "Polyester ignifugé"],
        ["Tailles", "M à XXL"],
        ["Lavable", "Machine 30 °C"],
      ],
    },
    en: {
      title: "Adult costumes",
      tagline: "Skeleton, witch, zombie, vampire. Sizes M to XXL.",
      description:
        "Four complete adult outfits in flame-retardant polyester — a cape for the witch, a pocket of fake blood for the zombie. Seams are double-stitched at the joints: a costume that splits at the shoulder is no use to anyone.",
      features: [
        "4 outfits: skeleton, witch, zombie, vampire",
        "Flame-retardant polyester, double-stitched seams",
        "Sizes M to XXL, fitted pattern",
        "Accessories included per outfit",
      ],
      specs: [
        ["Designs", "4 outfits"],
        ["Material", "Flame-retardant polyester"],
        ["Sizes", "M to XXL"],
        ["Care", "Machine wash 30 °C"],
      ],
    },
  }),
  physicalProduct({
    slug: "costumes-enfants",
    category: "costumes-masques",
    prices: { EUR: 39, USD: 42 },
    badge: "lowStock",
    rating: 4.7,
    reviews: 143,
    glyph: "kid-costume",
    from: "#ff8c42",
    to: "#5c1000",
    fr: {
      title: "Costumes enfants",
      tagline: "Du 2 au 10 ans, sans couture qui gratte.",
      description:
        "Des costumes pensés pour être portés six heures d'affilée : coutures plates, élaste aux poignets et aux chevilles, rien qui accroche. Sept modèles de 2 à 10 ans, lavables en machine.",
      features: [
        "7 modèles, tailles 2 à 10 ans",
        "Coutures plates, élaste aux poignets et chevilles",
        "Capuche et accessoires selon le modèle",
        "Lavables en machine à 30 °C",
      ],
      specs: [
        ["Modèles", "7 tenues"],
        ["Tailles", "2 à 10 ans"],
        ["Matière", "Polyester jersey"],
        ["Lavable", "Machine 30 °C"],
      ],
    },
    en: {
      title: "Children's costumes",
      tagline: "Ages 2 to 10, with no seam that rubs.",
      description:
        "Costumes designed to be worn for six hours straight: flat seams, elastic at wrists and ankles, nothing that catches. Seven designs from 2 to 10 years old, all machine washable.",
      features: [
        "7 designs, sizes 2 to 10 years",
        "Flat seams, elastic wrists and ankles",
        "Hood and accessories vary by design",
        "Machine washable at 30 °C",
      ],
      specs: [
        ["Designs", "7 outfits"],
        ["Sizes", "2 to 10 years"],
        ["Material", "Polyester jersey"],
        ["Care", "Machine wash 30 °C"],
      ],
    },
  }),
  physicalProduct({
    slug: "costumes-pour-animaux",
    category: "costumes-masques",
    prices: { EUR: 29, USD: 32 },
    badge: "new",
    rating: 4.9,
    reviews: 87,
    glyph: "pet-costume",
    from: "#f2ede4",
    to: "#5c1000",
    publishedAt: "2026-09-14",
    fr: {
      title: "Costumes pour animaux",
      tagline: "Pour le chien qui supporte déjà mal le costume de Noël.",
      description:
        "Cinq costumes pour chiens et chats, réglables sur la poitrine et le cou, avec une ouverture pour les pattes et la queue. Le tout en tissu léger, lavable, ettlestore de ne pas rester collé après minuit.",
      features: [
        "5 modèles pour chiens et chats, 3 tailles",
        "Bande réglable poitrine et cou",
        "Tissu léger et respirant, doublure doux",
        "Lavage machine 30 °C",
      ],
      specs: [
        ["Modèles", "5 costumes"],
        ["Tailles", "S, M, L"],
        ["Matière", "Polyester respirant"],
        ["Lavable", "Machine 30 °C"],
      ],
    },
    en: {
      title: "Animal costumes",
      tagline: "For the dog who already dislikes the Christmas jumper.",
      description:
        "Five costumes for dogs and cats, adjustable at the chest and neck, with an opening for legs and tail. Light breathable fabric, washable, and unlikely to still be attached to the dog after midnight.",
      features: [
        "5 designs for dogs and cats, 3 sizes",
        "Adjustable chest and neck strap",
        "Light breathable fabric, soft lining",
        "Machine washable 30 °C",
      ],
      specs: [
        ["Designs", "5 costumes"],
        ["Sizes", "S, M, L"],
        ["Material", "Breathable polyester"],
        ["Care", "Machine wash 30 °C"],
      ],
    },
  }),
  physicalProduct({
    slug: "masques-horreur-et-fun",
    category: "costumes-masques",
    prices: { EUR: 21, USD: 23 },
    badge: "bestseller",
    rating: 4.4,
    reviews: 129,
    glyph: "horror-mask",
    from: "#39ff14",
    to: "#0d3a05",
    fr: {
      title: "Masques horreur et fun",
      tagline: "Cinq masques, du crâne souriant au rien-du-tout.",
      description:
        "Cinq masques en latex fin, peints à la main : crâne souriant, fantôme, zombie, chat et masque plein sans yeux. Élastiques à l'arrière, ils tiennent toute la soirée sans comprimer les tempes.",
      features: [
        "5 masques en latex fin, peints à la main",
        "Élastiques réglables à l'arrière",
        "Ne Descend pas sur le nez",
        "Testés sur visage adulte et enfant",
      ],
      specs: [
        ["Modèles", "5 masques"],
        ["Matière", "Latex naturel"],
        ["Réglage", "Élastique arrière"],
        ["Âge", "6 ans et plus"],
      ],
    },
    en: {
      title: "Horror and fun masks",
      tagline: "Five masks, from the smiling skull to the nothing-at-all.",
      description:
        "Five thin latex masks, hand painted: smiling skull, ghost, zombie, cat and a featureless full mask. Adjustable elastic at the back, they hold all evening without pinching your temples.",
      features: [
        "5 thin latex masks, hand painted",
        "Adjustable elastic at the back",
        "Does not slide down the nose",
        "Tested on adult and child faces",
      ],
      specs: [
        ["Designs", "5 masks"],
        ["Material", "Natural latex"],
        ["Fit", "Rear elastic"],
        ["Age", "6 and up"],
      ],
    },
  }),

  /* ------------------------------------------------------------------
     KITS CRÉATIFS ET FÊTE
     ------------------------------------------------------------------ */
  physicalProduct({
    slug: "kits-maquillage-faux-sang",
    category: "kits-creatifs",
    prices: { EUR: 24, USD: 26 },
    badge: "bestseller",
    rating: 4.8,
    reviews: 196,
    glyph: "makeup-kit",
    from: "#8b0000",
    to: "#1a0000",
    featured: true,
    fr: {
      title: "Kits maquillage et faux sang",
      tagline: "Faux sang, bandes de scène de crime, ombres et veines.",
      description:
        "Un nécessaire complet pour un maquillage qui tient huit heures : faux sang à viscosité réglable, liquide à veines, poudres blanches pour les racines de clown et bandes de scène de crime. Testé sur peau sensible, sans résidu.",
      features: [
        "Faux sang 30 ml, 3 viscosités",
        "Veines et poudres blanches incluses",
        "Bandes de scène de crime",
        "Compatible peau sensible, se lave au savon",
      ],
      specs: [
        ["Contenu", "14 pièces"],
        ["Faux sang", "30 ml × 3"],
        ["Pinceaux", "3 tailles"],
        ["Nettoyage", "Savon et eau"],
      ],
    },
    en: {
      title: "Makeup and fake blood kits",
      tagline: "Fake blood, crime scene tape, whites and veining.",
      description:
        "A complete kit for makeup that lasts eight hours: fake blood in three consistencies, veining liquid, white powder for clown roots and crime scene tape. Tested on sensitive skin and no residue.",
      features: [
        "30 ml fake blood, 3 consistencies",
        "Veining and white powder included",
        "Crime scene tape",
        "Sensitive-skin safe, washes off with soap",
      ],
      specs: [
        ["Contents", "14 pieces"],
        ["Fake blood", "30 ml × 3"],
        ["Brushes", "3 sizes"],
        ["Removal", "Soap and water"],
      ],
    },
  }),
  physicalProduct({
    slug: "kits-diy-creatifs-enfants",
    category: "kits-creatifs",
    prices: { EUR: 19, USD: 21 },
    badge: "new",
    rating: 4.8,
    reviews: 134,
    glyph: "diy-kit",
    from: "#c77dff",
    to: "#3a0a63",
    publishedAt: "2026-09-16",
    fr: {
      title: "Kits DIY créatifs pour enfants",
      tagline: "Trois ateliers à faire en une heure, à partir de 6 ans.",
      description:
        "Trois boîtes d'atelier : masque en papier mâché, lanterne en bocal et penduleur mobile. Tout est pré-découpé et\}$.glué, il reste à assembler. Le plan est illustré sur quatre pages, lisible par un enfant de six ans.",
      features: [
        "3 ateliers : masque, lanterne, mobile",
        "Tout est prédécoupé, il reste à coller",
        "Guide illustré sur 4 pages",
        "À partir de 6 ans, 1 h de realization",
      ],
      specs: [
        ["Ateliers", "3 boîtes"],
        ["Durée", "1 heure"],
        ["Âge", "6 ans et plus"],
        ["Colle", "Fournie"],
      ],
    },
    en: {
      title: "DIY creative kits for children",
      tagline: "Three workshops, one hour, ages 6 and up.",
      description:
        "Three workshop boxes: a papier-mâché mask, a jar lantern and a hanging mobile. Everything is pre-cut and pre-glued, so all that is left is assembly. Illustrated instructions across four pages, readable by a six-year-old.",
      features: [
        "3 workshops: mask, lantern, mobile",
        "Everything pre-cut, only gluing left",
        "Illustrated guide over 4 pages",
        "Ages 6 and up, 1 hour to make",
      ],
      specs: [
        ["Workshops", "3 boxes"],
        ["Duration", "1 hour"],
        ["Age", "6 and up"],
        ["Glue", "Included"],
      ],
    },
  }),
  physicalProduct({
    slug: "packs-fete-deco-vaisselle-bonbons",
    category: "kits-creatifs",
    prices: { EUR: 45, USD: 49 },
    badge: "bestseller",
    rating: 4.7,
    reviews: 78,
    glyph: "party-pack",
    from: "#ff5c00",
    to: "#5c1000",
    fr: {
      title: "Packs de fête (déco, vaisselle, bonbons)",
      tagline: "Assiette, gobelet, nappe, décor et bonbons. Pour 12 personnes.",
      description:
        "Tout ce qu'il faut pour dressed une table de douze : assiettes et gobelets à motif, nappe en papier ciré, centres de table citrouille, eighteen bonbons et une guirlande. Rien à acheter en plus, rien à jeter le lendemain.",
      features: [
        "Pour 12 personnes : assiettes, gobelets, nappe",
        "Centres de table citrouille et guirlande LED",
        "18 bonbons et 18 sachets surprise",
        "Vaisselle jetable compostable",
      ],
      specs: [
        ["Capacité", "12 personnes"],
        ["Vaisselle", "24 assiettes, 24 gobelets"],
        ["Bonbons", "18 sachets"],
        ["Compostable", "Oui"],
      ],
    },
    en: {
      title: "Party packs (decor, tableware, candy)",
      tagline: "Plates, cups, tablecloth, decor and candy. For 12 people.",
      description:
        "Everything needed to dress a table for twelve: patterned plates and cups, oilcloth paper tablecloth, pumpkin centrepieces, LED garland, eighteen treats and a surprise bag. Nothing extra to buy, nothing to bin the next day.",
      features: [
        "For 12 people: plates, cups, tablecloth",
        "Pumpkin centrepieces and LED garland",
        "18 treats and 18 surprise bags",
        "Compostable disposable tableware",
      ],
      specs: [
        ["Serves", "12 people"],
        ["Tableware", "24 plates, 24 cups"],
        ["Candy", "18 bags"],
        ["Compostable", "Yes"],
      ],
    },
  }),

  /* ------------------------------------------------------------------
     PACKS À PRIX RÉDUIT
     ------------------------------------------------------------------ */
  physicalProduct({
    slug: "pack-soiree-complete",
    category: "packs",
    prices: { EUR: 129, USD: 139 },
    compareAt: { EUR: 189, USD: 204 },
    badge: "bestseller",
    rating: 4.9,
    reviews: 52,
    glyph: "party-box",
    from: "#ff5c00",
    to: "#2a0a4a",
    featured: true,
    fr: {
      title: "Pack soirée complète",
      tagline: "Huit produits essentiels, un seul prix. De la déco au dernier bonbon.",
      description:
        "Le pack pour vingt personnes sans rien prévoir d'autre : guirlande LED, citrouilles, lampe fantôme, bougies crâne, seaux collector, packs de fête, plateaux de bar et faux sang. Tout est accordé autour de la même palette orange-violet.",
      features: [
        "8 produits pour 20 personnes",
        "Guirlande, citrouilles, lampe fantôme, bougies",
        "Seaux collector, vaisselle, plateaux, faux sang",
        "Palette orange-violet coordonnée",
      ],
      specs: [
        ["Produits", "8"],
        ["Capacité", "20 personnes"],
        ["Économie", "32 %"],
        ["Livraison", "Gratuite incluse"],
      ],
    },
    en: {
      title: "Complete party pack",
      tagline: "Eight essential items, one price. From decor to the last sweet.",
      description:
        "The pack for twenty people with nothing else to coordinate: LED garland, pumpkins, ghost lamp, skull candles, collector buckets, party packs, bar trays and fake blood. Everything is matched to the same orange-violet palette.",
      features: [
        "8 products for 20 people",
        "Garland, pumpkins, ghost lamp, candles",
        "Collector buckets, tableware, trays, fake blood",
        "Matched orange-violet palette",
      ],
      specs: [
        ["Items", "8"],
        ["Serves", "20 people"],
        ["Saving", "32 %"],
        ["Delivery", "Free included"],
      ],
    },
  }),
  physicalProduct({
    slug: "pack-enfant",
    category: "packs",
    prices: { EUR: 59, USD: 64 },
    compareAt: { EUR: 86, USD: 93 },
    badge: "new",
    rating: 4.8,
    reviews: 38,
    glyph: "kids-pack",
    from: "#ff8c42",
    to: "#5c1000",
    publishedAt: "2026-09-19",
    fr: {
      title: "Pack enfant",
      tagline: "Six accessoires pensés pour des mains de six ans.",
      description:
        "Tout ce qu'il faut pour que les enfants s'amusent sans adulte derrière eux : costume, masque, kit maquillage, atelier DIY, seau à bonbons et gobelets. Les pièces sont surdimensionnées et sans petites parties qui disparaissent.",
      features: [
        "6 produits pour 2 enfants",
        "Costume, masque et kit maquillage inclus",
        "1 atelier DIY et 2 seaux à bonbons",
        "Sans petites pièces dangereuses",
      ],
      specs: [
        ["Produits", "6"],
        ["Enfants", "2"],
        ["Âge", "4 à 10 ans"],
        ["Économie", "31 %"],
      ],
    },
    en: {
      title: "Children's pack",
      tagline: "Six things designed for six-year-old hands.",
      description:
        "Everything needed for the kids to get on with it without an adult hovering: costume, mask, makeup kit, DIY workshop, candy bucket and cups. The pieces are larger and free of small parts that go missing.",
      features: [
        "6 products for 2 children",
        "Costume, mask and makeup kit included",
        "1 DIY workshop and 2 candy buckets",
        "No small parts",
      ],
      specs: [
        ["Items", "6"],
        ["Children", "2"],
        ["Age", "4 to 10 years"],
        ["Saving", "31 %"],
      ],
    },
  }),
  physicalProduct({
    slug: "pack-porche-hante",
    category: "packs",
    prices: { EUR: 79, USD: 85 },
    compareAt: { EUR: 114, USD: 123 },
    badge: "bestseller",
    rating: 4.9,
    reviews: 61,
    glyph: "porch-pack",
    from: "#9d4edd",
    to: "#1a0a2a",
    featured: true,
    fr: {
      title: "Pack porche hanté",
      tagline: "Cinq pièces pour transformer l'entrée avant minuit.",
      description:
        "Le kit porch : squelette géant, décor animé à yeux, lampe fantôme, citrouilles LED et fausse toenails sur la sonnette. Prévu pour l'extérieur, testé sous la pluie, et démontable pour le rangement.",
      features: [
        "5 pièces : squelette, yeux animés, lampe, citrouilles",
        "Fausse toenails et affiche pour la sonnette",
        "Étanche pour l'extérieur",
        "Démontable après la soirée",
      ],
      specs: [
        ["Produits", "5"],
        ["Surface", "Entrée et porche"],
        ["Étanchéité", "IP44 à IP65"],
        ["Économie", "31 %"],
      ],
    },
    en: {
      title: "Haunted porch pack",
      tagline: "Five pieces to transform the front door before midnight.",
      description:
        "The porch kit: giant skeleton, animated eyes, ghost lamp, LED pumpkins and fake nails for the doorbell. Built for outdoors, tested in rain, and dismantles for storage.",
      features: [
        "5 pieces: skeleton, eyes, lamp, pumpkins",
        "Fake nails and a sign for the doorbell",
        "Weather resistant for outdoors",
        "Dismantles after the evening",
      ],
      specs: [
        ["Items", "5"],
        ["Area", "Entrance and porch"],
        ["Waterproofing", "IP44 to IP65"],
        ["Saving", "31 %"],
      ],
    },
  }),
];
