"use client";

/**
 * Stockage de la commande en local.
 *
 * En phase 1 le paiement n'est pas branché : `placeDemoOrder` simule la
 * validation et conserve un instantané de la commande pour que la page de
 * confirmation survive au vidage du panier.
 *
 * En phase 2, remplacer `placeDemoOrder` par l'appel au prestataire de paiement
 * et `readOrder` par une lecture serveur (cookie de session + base de données).
 * Le reste de l'interface n'a pas besoin de changer.
 */

const STORAGE_KEY = "halloween:order";

export type Order = {
  reference: string;
  email: string;
  name: string;
  country: string;
  /** Slugs des produits achetés, dans l'ordre du panier. */
  slugs: string[];
  currency: "EUR" | "USD";
  total: number;
  createdAt: string;
  /** Adresse de livraison, renseignée si le panier contient des produits physiques. */
  address?: string;
  /** Le panier contenait au moins un produit expédié. */
  shipping: boolean;
};

function reference(): string {
  const now = new Date();
  const stamp = [
    now.getFullYear().toString().slice(-2),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HAL-${stamp}-${suffix}`;
}

export function placeDemoOrder(input: {
  email: string;
  name: string;
  country: string;
  address?: string;
  shipping: boolean;
  slugs: string[];
  currency: "EUR" | "USD";
  total: number;
}): Order {
  const order: Order = {
    ...input,
    reference: reference(),
    createdAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    /* stockage indisponible (navigation privée) : la page reste consultable */
  }

  return order;
}

export function readOrder(): Order | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const order = parsed as Partial<Order>;
    if (!Array.isArray(order.slugs) || typeof order.reference !== "string") {
      return null;
    }
    return order as Order;
  } catch {
    return null;
  }
}

export function clearOrder(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* rien à faire */
  }
}
