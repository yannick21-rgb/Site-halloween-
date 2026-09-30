export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Préfixe de route de chaque locale. Le français vit à la racine du site. */
export const LOCALE_PREFIX: Record<Locale, string> = {
  fr: "",
  en: "/en",
};

/** Construit une URL internalisée à partir d'un chemin sans locale. */
export function href(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${LOCALE_PREFIX[locale]}${clean}` || "/";
}

/** Retire le préfixe de locale d'un pathname pour le re-localiser. */
export function stripLocale(pathname: string): string {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return pathname.slice(3) || "/";
  }
  return pathname;
}

const fr = {
  siteName: "Halloween",
  siteTagline: "Produits digitaux pour une nuit mémorable",

  nav: {
    products: "Produits",
    categories: "Catégories",
    about: "À propos",
    faq: "FAQ",
    legal: "Légal",
    menu: "Menu",
    close: "Fermer",
  },

  common: {
    addToCart: "Ajouter au panier",
    added: "Ajouté",
    buyNow: "Acheter",
    viewAll: "Voir tout",
    viewProduct: "Voir le produit",
    from: "À partir de",
    new: "Nouveau",
    bestseller: "Tendance",
    lowStock: "Dernières pièces",
    promo: "Promo",
    instantDownload: "Téléchargement instantané",
    freeUpdates: "Mises à jour gratuites",
    securePayment: "Paiement sécurisé",
    loading: "Chargement…",
    results: "résultats",
    noResults: "Aucun produit ne correspond à ta recherche.",
  },

  cart: {
    title: "Ton panier",
    empty: "Ton panier est vide.",
    emptyHint: "Va semer la panique, Halloween n'attend pas.",
    item: "article",
    items: "articles",
    subtotal: "Sous-total",
    total: "Total",
    checkout: "Passer au paiement",
    remove: "Retirer",
    addedToast: "Ajouté au panier",
    onePerProduct: "Une licence par produit",
  },

  home: {
    heroKicker: "Édition Halloween 2026",
    heroTitle: "Des produits digitaux qui font hurler",
    heroSubtitle:
      "Illustrations, LUTs, ambiances sonores et templates prêts à télécharger. Tu cliques, tu paies, tu crées : le rituel commence avant minuit.",
    heroCta: "Découvrir la boutique",
    heroCtaSecondary: "Voir les nouveautés",
    stats: {
      products: "produits",
      customers: "créateurs équipés",
      rating: "note moyenne",
      instant: "téléchargement",
    },
    countdownTitle: "L'heure fatale approche",
    countdown: "Temps restant avant la nuit d'Halloween",
    categoriesTitle: "Choisis ta malédiction",
    categoriesSubtitle:
      "Cinq familles de produits, une seule nuit à corrompre.",
    featuredTitle: "Les plus redoutés",
    featuredSubtitle: "Ce que les créateurs achètent en premier.",
    howKicker: "Comment ça marche",
    howTitle: "Trois étapes, aucun rififi",
    howSubtitle: "Du panier au fichier téléchargé, sans friction.",
    how: {
      step1: "Choisis ton sort",
      step1Text:
        "Parcours la boutique et trouve le pack qui colle à ton projet. Chaque fiche détaille le contenu exact.",
      step2: "Paie en toute sécurité",
      step2Text:
        "Carte bancaire ou moyen de paiement de ton choix. Le paiement est traité par un prestataire sécurisé.",
      step3: "Télécharge et crée",
      step3Text:
        "Le lien d'accès arrive immédiatement sur ta page de commande et par email. Zéro attente.",
    },
    trust: {
      instantTitle: "Téléchargement immédiat",
      instantText: "Pas d'attente, pas de ticket support, pas de délai.",
      licenseTitle: "Licence commerciale incluse",
      licenseText:
        "Utilise tes fichiers sur tous tes projets, sans limite de durée.",
      supportTitle: "Support humain",
      supportText: "Une question sur un fichier ? On répond sous 24 h.",
      qualityTitle: "Qualité broadcast",
      qualityText:
        "Fichiers testés dans de vrais logiciels, jamais récupérés dans un partage entre inconnus.",
    },
    newsletterTitle: "Reçois les sorts avant tout le monde",
    newsletterText:
      "Un e-mail par mois au maximum : les nouvelles sorties, les réductions et aucune promesse inutile.",
    newsletterPlaceholder: "ton@email.com",
    newsletterCta: "M'inscrire",
    newsletterSuccess: "C'est noté. Bienvenue dans la covée.",
  },

  catalog: {
    title: "Tous les produits",
    subtitle: "Le catalogue complet, trié par famille de horreur.",
    search: "Rechercher un produit…",
    searchLabel: "Rechercher",
    allCategories: "Toutes les catégories",
    sort: "Trier par",
    sortOptions: {
      featured: "Recommandés",
      newest: "Nouveautés",
      priceAsc: "Prix croissant",
      priceDesc: "Prix décroissant",
      rating: "Mieux notés",
    },
    filters: "Filtres",
  },

  product: {
    included: "Contenu du pack",
    compatibility: "Compatible avec",
    format: "Format",
    instant: "Télécharge dès le paiement",
    instantText:
      "Accès immédiat sur ta page de commande et par email. Aucun compte à créer.",
    license: "Licence",
    licenseText:
      "Usage commercial autorisé pour 1 projet, sans limite de durée.",
    ratingLabel: "avis",
    faqTitle: "Questions fréquentes",
    related: "Complète ta collection",
    breadcrumb: "Produits",
    addToCartAria: "Ajouter au panier",
    specs: "Caractéristiques",
    shippingTitle: "Livraison",
    shippingDefault: "Expédition sous 24 h, livraison en 3 à 5 jours ouvrés.",
    shippingDelay: "Délai",
    shippingDelayText:
      "Commande passée avant 16 h, expédiée le jour même. Livraison suivie par e-mail.",
    returns: "Retours",
    returnsText:
      "30 jours pour changer d'avis. Le produit doit être non ouvert et dans son emballage d'origine.",
    digitalLabel: "Téléchargement",
    physicalLabel: "Expédition",
  },

  checkout: {
    title: "Paiement",
    subtitle: "Il ne manque que la dernière formalité.",
    email: "Adresse email",
    emailHint: "C'est là que tu recevras tes liens de téléchargement.",
    name: "Nom complet",
    country: "Pays",
    orderSummary: "Récapitulatif",
    pay: "Payer",
    comingSoon: "Paiement indisponible",
    comingSoonText:
      "Le module de paiement arrive en phase 2. Ta commande est bien enregistrée dans le panier.",
    backToCart: "Retour au panier",

    secure: "Aucun paiement en ligne",
    whatsappNotice: "Paiement via WhatsApp",
    whatsappNoticeText:
      "Aucun paiement en ligne. Tu es redirigé vers une conversation WhatsApp avec le fournisseur, avec le récapitulatif de ta commande pré-rempli. C'est avec lui que tu règles le paiement.",
    whatsappCta: "Commander sur WhatsApp",
    whatsappError:
      "Le numéro WhatsApp du fournisseur n'est pas encore renseigné. Réessaie dans un instant.",
    address: "Adresse de livraison",
    addressHint: "Nécessaire pour les produits expédiés.",
    street: "Rue et numéro",
    city: "Ville",
    zip: "Code postal",
  },

  success: {
    title: "C'est réglé. Bonne création.",
    subtitle: "Tes packs sont prêts. Les liens ci-dessous n'expirent pas.",
    reference: "Référence",
    sentTo: "Envoyé à",
    download: "Télécharger",
    filesIncluded: "Fichiers inclus",
    nextTitle: "Et maintenant ?",
    nextText:
      "Garde cette page en favori : le mail de confirmation contient les mêmes liens.",
    backHome: "Retour à l'accueil",
    empty: "Aucune commande récente",
    emptyText:
      "Passe par le panier pour générer une commande de démonstration.",
    licence:
      "Licence personnelle et commerciale, sans limite de projets.",
    shippingTitle: "Expédié à",
    shippingPending: "Adresse enregistrée lors de la commande.",
    shipped: "En expédition",
  },

  about: {
    title: "À propos",
    body: [
      "Halloween est une petite boutique indépendante qui vend uniquement des produits digitaux à thème : illustrations, fichiers imprimables, LUTs, ambiances sonores et templates.",
      "Tout est produit en interne, testé dans de vrais logiciels, et livré quelques secondes après le paiement. Pas de stock, pas d'attente, pas de colis qui arrive trois semaines plus tard.",
      "La boutique s'adresse aux créateurs, graphistes, vidéastes et particuliers qui veulent monter une décoration Halloween soignée sans passer ses nuits à chercher des fichiers douteux.",
    ],
  },

  faq: {
    title: "Questions fréquentes",
    subtitle: "Tout ce qu'on nous demande avant le premier achat.",
    items: [
      {
        q: "Comment reçois-je mes fichiers ?",
        a: "Dès que le paiement est validé, tu trouves tes liens de téléchargement sur la page de confirmation et tu reçois le même accès par email. Rien à installer, rien à attendre.",
      },
      {
        q: "Puis-je utiliser ces fichiers commercialement ?",
        a: "Oui. Chaque pack inclut une licence commerciale pour un projet : tu peux l'utiliser sur des supports payants, pour des clients ou sur tes propres canaux. La revente du fichier source en tant que tel est interdite.",
      },
      {
        q: "Pourquoi n'y a-t-il pas de remboursement ?",
        a: "Les biens digitaux sont fournis immédiatement après l'achat. Conformément à la réglementation européenne, le droit de rétractation ne s'applique pas à ce type de contenu une fois le téléchargement effectué.",
      },
      {
        q: "Quels logiciels sont compatibles ?",
        a: "Chaque fiche produit précise les formats fournis et les logiciels compatibles. La plupart des packs couvrent Photoshop, Illustrator, Figma, Canva, Premiere, Resolve, After Effects et CapCut.",
      },
      {
        q: "Proposez-vous des packs en équipe ou des licences étendues ?",
        a: "Écris-nous : on peut discuter une licence multi-utilisateurs ou un pack sur mesure pour un projet d'agence.",
      },
      {
        q: "Le site est-il disponible hors de France ?",
        a: "Oui. Les prix sont affichés en euros et en dollars, et tous les fichiers sont téléchargeables depuis n'importe quel pays.",
      },
    ],
  },

  legal: {
    mentionsTitle: "Mentions légales",
    cgvTitle: "Conditions générales de vente",
    privacyTitle: "Politique de confidentialité",
    updated: "Dernière mise à jour",
    backHome: "Retour à l'accueil",
  },

  notFound: {
    title: "Cette page a été dévorée",
    text: "Le lien est cassé, ou la page n'a jamais existé. Il reste 10 produits à découvrir.",
    cta: "Voir les produits",
  },

  footer: {
    shop: "Boutique",
    help: "Aide",
    legal: "Légal",
    newsletter: "Newsletter",
    rights: "Tous droits réservés.",
    payment: "Moyens de paiement acceptés à la phase 2",
  },

  ambience: {
    motionOn: "Animations",
    motionOff: "Animations réduites",
    soundOn: "Son",
    soundOff: "Son coupé",
    cartBurst: "Ajouté au chaudron",
  },
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  siteName: "Halloween",
  siteTagline: "Digital products for a night to remember",

  nav: {
    products: "Products",
    categories: "Categories",
    about: "About",
    faq: "FAQ",
    legal: "Legal",
    menu: "Menu",
    close: "Close",
  },

  common: {
    addToCart: "Add to cart",
    added: "Added",
    buyNow: "Buy now",
    viewAll: "View all",
    viewProduct: "View product",
    from: "From",
    new: "New",
    bestseller: "Trending",
    lowStock: "Last pieces",
    promo: "Sale",
    instantDownload: "Instant download",
    freeUpdates: "Free updates",
    securePayment: "Secure payment",
    loading: "Loading…",
    results: "results",
    noResults: "No product matches your search.",
  },

  cart: {
    title: "Your cart",
    empty: "Your cart is empty.",
    emptyHint: "Go cause some mischief, Halloween won't wait.",
    item: "item",
    items: "items",
    subtotal: "Subtotal",
    total: "Total",
    checkout: "Checkout",
    remove: "Remove",
    addedToast: "Added to cart",
    onePerProduct: "One licence per product",
  },

  home: {
    heroKicker: "Halloween 2026 edition",
    heroTitle: "Digital products that make people scream",
    heroSubtitle:
      "Illustrations, LUTs, sound ambiences and templates ready to download. Click, pay, create: the ritual starts before midnight.",
    heroCta: "Enter the shop",
    heroCtaSecondary: "See what's new",
    stats: {
      products: "products",
      customers: "creators equipped",
      rating: "average rating",
      instant: "download",
    },
    countdownTitle: "The witching hour draws near",
    countdown: "Time left before Halloween night",
    categoriesTitle: "Choose your curse",
    categoriesSubtitle: "Five families of products, one night to ruin.",
    featuredTitle: "The most feared",
    featuredSubtitle: "What creators buy first.",
    howKicker: "How it works",
    howTitle: "Three steps, no trick",
    howSubtitle: "From cart to downloaded file, without the friction.",
    how: {
      step1: "Pick your fate",
      step1Text:
        "Browse the shop and find the pack that fits your project. Every product page lists the exact contents.",
      step2: "Pay safely",
      step2Text:
        "Bank card or your preferred payment method. Payments are handled by a secure provider.",
      step3: "Download and create",
      step3Text:
        "Your access link appears instantly on the order page and in your inbox. Zero waiting.",
    },
    trust: {
      instantTitle: "Instant download",
      instantText: "No waiting, no support ticket, no delay.",
      licenseTitle: "Commercial licence included",
      licenseText: "Use your files on every project, with no time limit.",
      supportTitle: "Human support",
      supportText: "A question about a file? We answer within 24 h.",
      qualityTitle: "Broadcast quality",
      qualityText:
        "Files tested in real software, never dug up from a share between strangers.",
    },
    newsletterTitle: "Get the spells before anyone else",
    newsletterText:
      "One email per month at most: new releases, discounts and absolutely no empty promises.",
    newsletterPlaceholder: "you@email.com",
    newsletterCta: "Subscribe",
    newsletterSuccess: "You're in. Welcome to the coven.",
  },

  catalog: {
    title: "All products",
    subtitle: "The full catalogue, sorted by flavour of horror.",
    search: "Search a product…",
    searchLabel: "Search",
    allCategories: "All categories",
    sort: "Sort by",
    sortOptions: {
      featured: "Recommended",
      newest: "Newest",
      priceAsc: "Price: low to high",
      priceDesc: "Price: high to low",
      rating: "Top rated",
    },
    filters: "Filters",
  },

  product: {
    included: "What's inside",
    compatibility: "Works with",
    format: "Format",
    instant: "Download the moment you pay",
    instantText:
      "Instant access on your order page and by email. No account to create.",
    license: "Licence",
    licenseText: "Commercial use allowed for 1 project, with no time limit.",
    ratingLabel: "reviews",
    faqTitle: "Frequently asked questions",
    related: "Complete your collection",
    breadcrumb: "Products",
    addToCartAria: "Add to cart",
    specs: "Specifications",
    shippingTitle: "Shipping",
    shippingDefault: "Ships within 24 h, delivered in 3 to 5 working days.",
    shippingDelay: "Timing",
    shippingDelayText:
      "Orders placed before 4 pm ship the same day. Tracked delivery by email.",
    returns: "Returns",
    returnsText:
      "30 days to change your mind. The item must be unopened and in its original packaging.",
    digitalLabel: "Download",
    physicalLabel: "Shipping",
  },

  checkout: {
    title: "Checkout",
    subtitle: "Only the last formality is missing.",
    email: "Email address",
    emailHint: "This is where your download links will land.",
    name: "Full name",
    country: "Country",
    orderSummary: "Order summary",
    pay: "Pay",
    comingSoon: "Payment unavailable",
    comingSoonText:
      "The payment module arrives in phase 2. Your items are safely stored in the cart.",
    backToCart: "Back to cart",

    secure: "No online payment",
    whatsappNotice: "Payment via WhatsApp",
    whatsappNoticeText:
      "No online payment. You are redirected to a WhatsApp conversation with the supplier, with your order summary pre-filled. You settle payment with them directly.",
    whatsappCta: "Order on WhatsApp",
    whatsappError:
      "The supplier's WhatsApp number is not set yet. Please try again shortly.",
    address: "Shipping address",
    addressHint: "Required for shipped products.",
    street: "Street and number",
    city: "City",
    zip: "Postcode",
  },

  success: {
    title: "All set. Go create.",
    subtitle: "Your packs are ready. The links below never expire.",
    reference: "Reference",
    sentTo: "Sent to",
    download: "Download",
    filesIncluded: "Included files",
    nextTitle: "And now?",
    nextText:
      "Bookmark this page: the confirmation email carries the same links.",
    backHome: "Back to home",
    empty: "No recent order",
    emptyText: "Go through the cart to create a demo order.",
    licence: "Personal and commercial licence, no project limit.",
    shippingTitle: "Shipped to",
    shippingPending: "Address saved with the order.",
    shipped: "Shipping",
  },

  about: {
    title: "About",
    body: [
      "Halloween is a small independent shop selling digital products only, with a Halloween theme: illustrations, printable files, LUTs, sound ambiences and templates.",
      "Everything is produced in-house, tested in real software, and delivered seconds after payment. No stock, no waiting, no parcel arriving three weeks late.",
      "The shop is made for creators, designers, video makers and anyone who wants a polished Halloween set without losing nights hunting down dodgy files.",
    ],
  },

  faq: {
    title: "Frequently asked questions",
    subtitle: "Everything people ask before their first purchase.",
    items: [
      {
        q: "How do I receive my files?",
        a: "As soon as payment is confirmed, your download links appear on the confirmation page and in your inbox. Nothing to install, nothing to wait for.",
      },
      {
        q: "Can I use these files commercially?",
        a: "Yes. Every pack includes a commercial licence for one project: you can use it on paid material, for clients or on your own channels. Reselling the source file as-is is not allowed.",
      },
      {
        q: "Why is there no refund?",
        a: "Digital goods are delivered immediately after purchase. Under European regulations, the right of withdrawal does not apply to this type of content once the download has been made.",
      },
      {
        q: "Which software is supported?",
        a: "Every product page lists the supplied formats and compatible software. Most packs cover Photoshop, Illustrator, Figma, Canva, Premiere, Resolve, After Effects and CapCut.",
      },
      {
        q: "Do you offer team packs or extended licences?",
        a: "Get in touch: we can discuss a multi-user licence or a custom pack for an agency project.",
      },
      {
        q: "Is the site available outside France?",
        a: "Yes. Prices are shown in euros and dollars, and all files are downloadable from any country.",
      },
    ],
  },

  legal: {
    mentionsTitle: "Legal notice",
    cgvTitle: "Terms and conditions of sale",
    privacyTitle: "Privacy policy",
    updated: "Last updated",
    backHome: "Back to home",
  },

  notFound: {
    title: "This page was devoured",
    text: "The link is broken, or the page never existed. 10 products are still waiting to be discovered.",
    cta: "See the products",
  },

  footer: {
    shop: "Shop",
    help: "Help",
    legal: "Legal",
    newsletter: "Newsletter",
    rights: "All rights reserved.",
    payment: "Payment methods accepted from phase 2",
  },

  ambience: {
    motionOn: "Animations",
    motionOff: "Reduced motion",
    soundOn: "Sound",
    soundOff: "Sound off",
    cartBurst: "Added to the cauldron",
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
