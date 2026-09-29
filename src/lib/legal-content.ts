import type { LegalSection } from "@/components/pages/legal-page";

export const LEGAL_CONTENT = {
  fr: {
    mentions: {
      title: "Mentions légales",
      sections: [
        {
          heading: "Éditeur du site",
          paragraphs: [
            "Le site Halloween est édité par une structure indépendante spécialisée dans la création et la vente de produits digitaux à thème Halloween.",
            "Le siège social est situé en France. Le directeur de la publication est le représentant de la structure éditrice.",
            "Pour toute question relative à l'éditeur, utiliser le formulaire de contact mis à disposition sur la page FAQ.",
          ],
        },
        {
          heading: "Hébergement",
          paragraphs: [
            "Le site est hébergé sur une infrastructure cloud scalable assurant la disponibilité, la sécurité et la sauvegarde des données.",
            "Les noms de domaine sont enregistrés auprès d'un registrar agréé. Les coordonnées complètes de l'hébergeur et du registrar sont communiquées sur demande écrite adressée à l'éditeur.",
          ],
        },
        {
          heading: "Propriété intellectuelle",
          paragraphs: [
            "L'ensemble des éléments du site (textes, visuels, illustrations, éléments graphiques, code source et identité visuelle) est protégé par le droit d'auteur.",
            "Toute reproduction, même partielle, de ces éléments sans autorisation écrite préalable est interdite. Les produits vendus demeurent la propriété de leurs auteurs ; seule une licence d'utilisation est accordée à l'acheteur.",
          ],
        },
        {
          heading: "Responsabilité",
          paragraphs: [
            "L'éditeur s'efforce d'assurer l'exactitude des informations publiées, mais ne saurait garantir l'absence totale d'erreurs ou d'omissions.",
            "Les produits sont des fichiers numériques fournis tels quels. Leur compatibilité avec les logiciels de l'utilisateur relève de la responsabilité de ce dernier.",
          ],
        },
      ] satisfies LegalSection[],
    },
    cgv: {
      title: "Conditions générales de vente",
      sections: [
        {
          heading: "Objet et champ d'application",
          paragraphs: [
            "Les présentes conditions régissent les ventes de produits digitaux conclues sur le site Halloween entre l'éditeur et tout acheteur majeur agissant à titre de non-professionnel ou professionnel.",
            "Toute commande implique l'adhésion sans réserve aux présentes conditions, qui prévalent sur les conditions d'achat du client sauf accord écrit contraire.",
          ],
        },
        {
          heading: "Produits et licences",
          paragraphs: [
            "Les produits vendus sont des fichiers numériques livrés par téléchargement. Chaque fiche produit précise les formats fournis, les logiciels compatibles et le contenu exact du pack.",
            "L'achat accorde une licence d'utilisation non exclusive pour un (1) projet, sans limitation de durée. La revente, la redistribution ou la cession du fichier source en tant que tel est formellement interdite.",
          ],
        },
        {
          heading: "Prix et paiement",
          paragraphs: [
            "Les prix sont indiqués en euros et en dollars. Les prix sont susceptibles de varier à tout moment ; le prix applicable est celui affiché au moment de la commande.",
            "Le paiement est effectué via un prestataire certifié. Les données bancaires sont collectées directement par ce prestataire et ne transitent jamais par les serveurs de l'éditeur.",
            "Le règlement est dû à la commande. L'éditeur se réserve le droit de refuser ou d'annuler toute commande en cas de soupçon de fraude ou d'incident de paiement antérieur.",
          ],
        },
        {
          heading: "Livraison",
          paragraphs: [
            "La livraison est entièrement numérique et immédiate. Les liens de téléchargement sont affichés sur la page de confirmation de commande et transmis par email à l'adresse renseignée lors du paiement.",
            "Aucun délai d'expédition n'est applicable. L'acheteur est seul responsable de l'exactitude de l'adresse email fournie et de la conservation de ses accès.",
          ],
        },
        {
          heading: "Droit de rétractation et remboursement",
          paragraphs: [
            "Conformément à l'article 16 du Code de la consommation français, le droit de rétractation ne peut être exercé pour les contenus numériques non fournis sur un support matériel et dont l'exécution a commencé après accord préalable exprès de l'acheteur et renoncement exprès à son droit de rétractation.",
            "En validant sa commande, l'acheteur reconnaît que les fichiers lui sont fournis immédiatement, qu'il renonce à son droit de rétractation, et qu'aucun remboursement ne pourra être accordé pour un produit déjà téléchargé, sauf défaut technique avéré signalé sous 7 jours.",
          ],
        },
        {
          heading: "Obligations de l'acheteur",
          paragraphs: ["L'acheteur s'engage à :"],
          list: [
            "fournir des informations exactes et à jour lors de la commande ;",
            "utiliser les fichiers dans le cadre de la licence accordée, sans tentative de revente ou de redistribution ;",
            "ne pas tenter de contourner les mécanismes de protection des fichiers sources ;",
            "contacter l'éditeur en cas de difficulté technique d'accès à un fichier acheté.",
          ],
        },
        {
          heading: "Réclamations et service après-vente",
          paragraphs: [
            "Toute réclamation relative à un produit doit être adressée à l'éditeur dans un délai de 7 jours suivant l'achat, en précisant la référence du produit et la nature du problème rencontré.",
            "L'éditeur s'engage à traiter les demandes relatives au bon fonctionnement des fichiers dans un délai de 30 jours.",
          ],
        },
        {
          heading: "Droit applicable et litiges",
          paragraphs: [
            "Les présentes conditions sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut d'accord, les tribunaux français compétents seront saisis.",
            "La plateforme de règlement en ligne des litiges de la consommation européenne est accessible à l'adresse suivante : ec.europa.eu/consumers/odr",
          ],
        },
      ] satisfies LegalSection[],
    },
    confidentialite: {
      title: "Politique de confidentialité",
      sections: [
        {
          heading: "Responsable du traitement",
          paragraphs: [
            "L'éditeur du site est responsable des traitements de données décrits ci-dessous. Le RGPD s'applique à l'ensemble des données collectées sur ce site.",
          ],
        },
        {
          heading: "Données collectées",
          paragraphs: [
            "Le site est conçu pour minimiser la collecte. Aucune création de compte utilisateur n'est requise pour l'achat.",
            "Le contenu de votre panier est stocké localement dans votre navigateur (localStorage) et n'est jamais transmis à nos serveurs.",
          ],
          list: [
            "Adresse email : collectée lors du paiement, utilisée pour l'envoi des liens de téléchargement et la facturation.",
            "Adresse IP et données techniques : collectées par l'hébergeur à des fins de sécurité et de journalisation.",
            "Données de navigation :Mesurées de façon agrégée et sans cookie publicitaire.",
          ],
        },
        {
          heading: "Finalités et base légale",
          paragraphs: [
            "Les données sont utilisées pour exécuter le contrat de vente, prévenir la fraude, répondre à vos demandes et respecter nos obligations légales et comptables.",
            "Aucune donnée n'est vendue, louée ou cédée à des tiers à des fins commerciales. Les prestataires techniques (hébergement, paiement, email) n'accèdent aux données que dans le cadre strict de leur mission.",
          ],
        },
        {
          heading: "Durée de conservation",
          paragraphs: [
            "Les données de commande sont conservées pendant la durée légale requise à des fins comptables et fiscales. Les données techniques de navigation sont conservées 13 mois maximum.",
          ],
        },
        {
          heading: "Vos droits",
          paragraphs: [
            "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition, ainsi que du droit à la portabilité de vos données.",
            "Pour exercer ces droits, adressez votre demande à l'éditeur. Vous disposez également du droit d'introduire une réclamation auprès de l'autorité de contrôle compétente.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "Ce site n'utilise aucun cookie publicitaire ni traceur tiers à des fins de profilage. Seuls les strictements nécessaires au fonctionnement du panier et à la mémorisation de votre devise sont utilisés.",
          ],
        },
      ] satisfies LegalSection[],
    },
  },
  en: {
    mentions: {
      title: "Legal notice",
      sections: [
        {
          heading: "Site publisher",
          paragraphs: [
            "The Halloween website is published by an independent structure specialising in the creation and sale of Halloween-themed digital products.",
            "Its registered office is located in France. The publication director is the representative of the publishing entity.",
            "For any question about the publisher, use the contact form available on the FAQ page.",
          ],
        },
        {
          heading: "Hosting",
          paragraphs: [
            "The site is hosted on a scalable cloud infrastructure providing availability, security and data backups.",
            "Domain names are registered through an accredited registrar. Full hosting and registrar details are provided on written request to the publisher.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "All elements of the site (texts, visuals, illustrations, graphic assets, source code and visual identity) are protected by copyright law.",
            "Any reproduction, even partial, without prior written authorisation is prohibited. The products sold remain the property of their authors; only a usage licence is granted to the buyer.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "The publisher makes reasonable efforts to ensure the accuracy of published information, but cannot guarantee the complete absence of errors or omissions.",
            "Products are digital files supplied as is. Their compatibility with the user's software remains the user's responsibility.",
          ],
        },
      ] satisfies LegalSection[],
    },
    cgv: {
      title: "Terms and conditions of sale",
      sections: [
        {
          heading: "Purpose and scope",
          paragraphs: [
            "These terms govern the sale of digital products concluded on the Halloween website between the publisher and any adult buyer acting as a non-professional or professional.",
            "Any order implies unconditional acceptance of these terms, which prevail over the buyer's own conditions of purchase unless agreed otherwise in writing.",
          ],
        },
        {
          heading: "Products and licences",
          paragraphs: [
            "Products are digital files delivered by download. Each product page lists the supplied formats, compatible software and the exact pack contents.",
            "Purchase grants a non-exclusive licence for one (1) project, with no time limit. Reselling, redistributing or transferring the source file as such is strictly prohibited.",
          ],
        },
        {
          heading: "Prices and payment",
          paragraphs: [
            "Prices are shown in euros and dollars. Prices may change at any time; the applicable price is the one displayed at the time of order.",
            "Payment is made through a certified provider. Card details are collected directly by that provider and never transit through the publisher's servers.",
            "Payment is due at the time of order. The publisher reserves the right to refuse or cancel any order in case of suspected fraud or a previous payment incident.",
          ],
        },
        {
          heading: "Delivery",
          paragraphs: [
            "Delivery is entirely digital and immediate. Download links are shown on the order confirmation page and sent by email to the address provided at checkout.",
            "No shipping time applies. The buyer is solely responsible for the accuracy of the email address provided and for keeping their access details.",
          ],
        },
        {
          heading: "Right of withdrawal and refunds",
          paragraphs: [
            "Under Article 16 of the French Consumer Code, the right of withdrawal cannot be exercised for digital content not supplied on a physical medium where performance has begun with the buyer's prior express consent and express waiver of that right.",
            "By validating an order, the buyer acknowledges that files are supplied immediately, waives their right of withdrawal, and accepts that no refund can be granted for an already-downloaded product, except for a proven technical defect reported within 7 days.",
          ],
        },
        {
          heading: "Buyer obligations",
          paragraphs: ["The buyer undertakes to:"],
          list: [
            "provide accurate and up-to-date information when ordering;",
            "use the files within the scope of the granted licence, without attempting to resell or redistribute them;",
            "not attempt to circumvent the protection mechanisms on the source files;",
            "contact the publisher if they experience technical difficulty accessing a purchased file.",
          ],
        },
        {
          heading: "Complaints and after-sales service",
          paragraphs: [
            "Any complaint about a product must be sent to the publisher within 7 days of purchase, stating the product reference and the nature of the problem.",
            "The publisher undertakes to handle file functionality issues within 30 days.",
          ],
        },
        {
          heading: "Applicable law and disputes",
          paragraphs: [
            "These terms are governed by French law. In the event of a dispute, an amicable solution will be sought before any legal action. Failing agreement, the competent French courts will have jurisdiction.",
            "The European Commission's online dispute resolution platform is available at: ec.europa.eu/consumers/odr",
          ],
        },
      ] satisfies LegalSection[],
    },
    confidentialite: {
      title: "Privacy policy",
      sections: [
        {
          heading: "Data controller",
          paragraphs: [
            "The publisher of the site is responsible for the data processing described below. The GDPR applies to all data collected on this site.",
          ],
        },
        {
          heading: "Data collected",
          paragraphs: [
            "The site is designed to minimise collection. No user account is required to purchase.",
            "Your cart contents are stored locally in your browser (localStorage) and are never transmitted to our servers.",
          ],
          list: [
            "Email address: collected at payment, used to send download links and invoices.",
            "IP address and technical data: collected by the host for security and logging purposes.",
            "Browsing data: measured in aggregate form, with no advertising cookie.",
          ],
        },
        {
          heading: "Purposes and legal basis",
          paragraphs: [
            "Data is used to perform the sales contract, prevent fraud, answer your requests and meet our legal and accounting obligations.",
            "No data is sold, rented or transferred to third parties for commercial purposes. Technical providers (hosting, payment, email) only access data within the strict scope of their mission.",
          ],
        },
        {
          heading: "Retention period",
          paragraphs: [
            "Order data is kept for the legally required period for accounting and tax purposes. Technical browsing data is kept for up to 13 months.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You have the right to access, rectify, erase, restrict and object to processing, as well as the right to data portability.",
            "To exercise these rights, send your request to the publisher. You also have the right to lodge a complaint with the competent supervisory authority.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "This site uses no advertising cookies and no third-party profiling trackers. Only what is strictly necessary for the cart to work and to remember your currency is used.",
          ],
        },
      ] satisfies LegalSection[],
    },
  },
} as const;
