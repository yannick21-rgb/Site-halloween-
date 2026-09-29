"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { CURRENCIES, type Currency } from "@/lib/format";

type SiteContextValue = {
  locale: Locale;
  dict: Dictionary;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  /** Le visiteur demande des animations réduites. */
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  toggleReducedMotion: () => void;
  /** Le son d'ambiance est coupé par défaut. */
  soundEnabled: boolean;
  toggleSound: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

const CURRENCY_STORAGE_KEY = "halloween:currency";
const MOTION_STORAGE_KEY = "halloween:reduced-motion";
const SOUND_STORAGE_KEY = "halloween:sound";

/** Marque le document pour que le CSS puisse neutraliser les animations. */
function applyMotionAttribute(reduced: boolean) {
  document.documentElement.dataset.motion = reduced ? "reduced" : "full";
}

export function SiteProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const [currency, setCurrencyState] = useState<Currency>("EUR");
  const [reducedMotion, setReducedMotionState] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (stored && (CURRENCIES as readonly string[]).includes(stored)) {
      setCurrencyState(stored as Currency);
    }

    // Au premier passage, on respecte le réglage système. Ensuite, le choix
    // explicite du visiteur prime et est mémorisé.
    const storedMotion = window.localStorage.getItem(MOTION_STORAGE_KEY);
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReducedMotionState(
      storedMotion === null ? prefersReduced : storedMotion === "1",
    );

    setSoundEnabled(window.localStorage.getItem(SOUND_STORAGE_KEY) === "1");
  }, []);

  useEffect(() => {
    applyMotionAttribute(reducedMotion);
  }, [reducedMotion]);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    window.localStorage.setItem(CURRENCY_STORAGE_KEY, next);
  }, []);

  const setReducedMotion = useCallback((value: boolean) => {
    setReducedMotionState(value);
    window.localStorage.setItem(MOTION_STORAGE_KEY, value ? "1" : "0");
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotionState((current) => {
      window.localStorage.setItem(MOTION_STORAGE_KEY, current ? "0" : "1");
      return !current;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((current) => {
      window.localStorage.setItem(SOUND_STORAGE_KEY, current ? "0" : "1");
      return !current;
    });
  }, []);

  const value = useMemo(
    () => ({
      locale,
      dict,
      currency,
      setCurrency,
      reducedMotion,
      setReducedMotion,
      toggleReducedMotion,
      soundEnabled,
      toggleSound,
    }),
    [
      locale,
      dict,
      currency,
      setCurrency,
      reducedMotion,
      setReducedMotion,
      toggleReducedMotion,
      soundEnabled,
      toggleSound,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite doit être utilisé dans un SiteProvider");
  }
  return context;
}

export function useDict(): Dictionary {
  return useSite().dict;
}
