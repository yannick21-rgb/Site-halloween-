"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProduct, type Product } from "@/lib/products";
import type { Currency } from "@/lib/format";

const STORAGE_KEY = "halloween:cart";

type CartState = {
  slugs: string[];
  isOpen: boolean;
  ready: boolean;
};

type CartContextValue = CartState & {
  items: Product[];
  count: number;
  total: (currency: Currency) => number;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  has: (slug: string) => boolean;
  clear: () => void;
  open: () => void;
  close: () => void;
  lastAdded: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredSlugs(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (v): v is string => typeof v === "string" && getProduct(v) !== undefined,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    setSlugs(readStoredSlugs());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  }, [slugs, ready]);

  const add = useCallback((slug: string) => {
    setSlugs((current) =>
      current.includes(slug) ? current : [...current, slug],
    );
    setLastAdded(slug);
    setIsOpen(true);
  }, []);

  const remove = useCallback((slug: string) => {
    setSlugs((current) => current.filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => setSlugs([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!lastAdded) return;
    const timer = window.setTimeout(() => setLastAdded(null), 2600);
    return () => window.clearTimeout(timer);
  }, [lastAdded]);

  const items = useMemo(
    () => slugs.map((slug) => getProduct(slug)).filter((p) => p !== undefined),
    [slugs],
  );

  const total = useCallback(
    (currency: Currency) =>
      items.reduce((sum, product) => sum + product.prices[currency], 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      slugs,
      items,
      count: items.length,
      total,
      add,
      remove,
      has: (slug: string) => slugs.includes(slug),
      clear,
      open,
      close,
      isOpen,
      ready,
      lastAdded,
    }),
    [slugs, items, total, add, remove, clear, open, close, isOpen, ready, lastAdded],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans un CartProvider");
  }
  return context;
}
