/**
 * Configuration globale du site.
 *
 * Remplace les placeholders `halloween.example` dispersés dans le projet par un
 * seul point de configuration. Tout ce qui est personalisable (domaine, réseaux
 * sociaux, email de contact) vit ici.
 */

/**
 * URL canonique du site, sans slash final.
 *
 * En développement, Next.js sert le site sur `localhost`, on garde donc la
 * valeur de production par défaut et on documente le remplacement.
 */
export const SITE_URL = "https://halloween.example";

/** Nom affiché dans le header, le footer et les onglets. */
export const SITE_NAME = "Halloween";

/** Email de contact affiché dans les pages légales. */
export const CONTACT_EMAIL = "contact@halloween.example";

export type SocialKey = "instagram" | "x" | "youtube" | "github";

export type Social = {
  key: SocialKey;
  /** Libellé accessible, affiché en `aria-label`. */
  label: string;
  /**
   * URL du profil. Laisser `null` pour ne pas afficher du tout l'icône :
   * aucun lien mort n'est rendu tant que le compte n'existe pas.
   */
  url: string | null;
};

/**
 * Réseaux sociaux. Un `url` à `null` masque l'entrée côté footer.
 * Renseigne ici tes vrais profils une fois les comptes créés.
 */
export const SOCIALS: Social[] = [
  { key: "instagram", label: "Instagram", url: null },
  { key: "x", label: "X", url: null },
  { key: "youtube", label: "YouTube", url: null },
  { key: "github", label: "GitHub", url: null },
];

/**
 * Numéro WhatsApp du fournisseur, au format international sans « + » ni espaces
 * (ex. « 33612345678 » pour la France).
 *
 * Le bouton de paiement ne déclenche aucun paiement en ligne : il ouvre une
 * conversation WhatsApp avec un message pré-rempli récapitulant la commande.
 * C'est avec le fournisseur que le paiement se règle.
 *
 * ⚠️ Renseigne ton vrai numéro avant la mise en production.
 */
export const WHATSAPP_NUMBER = "33612345678";

/**
 * Construit une URL absolue à partir d'un chemin interne.
 * Utilisé par le sitemap, le JSON-LD et les métadonnées OpenGraph.
 */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
