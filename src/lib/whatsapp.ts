import { SITE_NAME } from "@/lib/site";
import { formatPrice, type Currency } from "@/lib/format";
import type { Product } from "@/lib/products";
import type { Locale } from "@/lib/i18n";

/**
 * Construit l'URL de redirection WhatsApp.
 *
 * Aucun paiement en ligne n'a lieu : le client ouvre une conversation avec le
 * fournisseur, avec un message pré-rempli récapitulant la commande. Le
 * paiement se règle ensuite directement avec le fournisseur.
 *
 * Le numéro est lu depuis `WHATSAPP_NUMBER` (src/lib/site.ts). S'il n'est pas
 * renseigné, la fonction renvoie `null` : le checkout affiche alors un message
 * d'attente plutôt qu'un lien mort.
 */
export function buildWhatsAppUrl(options: {
  items: Product[];
  currency: Currency;
  locale: Locale;
  name: string;
  email: string;
  address?: string;
  phone: string;
}): string | null {
  const phone = options.phone.replace(/\D/g, "");
  // Un numéro WhatsApp valide fait au moins 8 chiffres (indicatif compris).
  if (phone.length < 8) return null;

  const lines: string[] = [
    `Bonjour ${SITE_NAME}, je souhaite passer commande :`,
    "",
  ];

  for (const product of options.items) {
    const title = product.locale[options.locale].title;
    const price = formatPrice(product.prices[options.currency], options.currency);
    lines.push(`• ${title} × 1 — ${price}`);
  }

  const total = options.items.reduce(
    (sum, product) => sum + product.prices[options.currency],
    0,
  );
  lines.push("", `Total : ${formatPrice(total, options.currency)}`);
  lines.push("", `Nom : ${options.name}`, `Email : ${options.email}`);

  if (options.address) {
    lines.push("", "Adresse de livraison :", options.address);
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}
