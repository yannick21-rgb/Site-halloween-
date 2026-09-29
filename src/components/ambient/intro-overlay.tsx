"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSite } from "@/components/providers/site-provider";
import { href } from "@/lib/i18n";

/**
 * Écran d'introduction affiché à chaque visite sur la page d'accueil.
 *
 * Contraintes :
 * - uniquement sur l'accueil, sinon la navigation interne devient pénible ;
 * - jamais affiché si le visiteur a demandé des animations réduites ;
 * - toujours skippable (bouton, Échap ou clic) pour ne jamais bloquer la page ;
 * - se retire tout seul au bout de `DURATION` : c'est un effet, pas un mur.
 */
const DURATION = 2600;

export function IntroOverlay() {
  const { dict, locale, reducedMotion } = useSite();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const isHome = pathname === href(locale, "/");

  useEffect(() => {
    if (reducedMotion || !isHome) return;

    // Léger délai : l'intro n'apparaît pas pendant l'hydratation.
    const timer = window.setTimeout(() => setVisible(true), 220);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, isHome]);

  const dismiss = useCallback(() => {
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 480);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(dismiss, DURATION);
    return () => window.clearTimeout(timer);
  }, [visible, dismiss]);

  useEffect(() => {
    if (!visible) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") dismiss();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, dismiss]);

  if (!visible) return null;

  return (
    <div
      className={`intro-veil${leaving ? " intro-veil--leaving" : ""}`}
      role="dialog"
      aria-label={dict.ambience.introLine2}
      onClick={dismiss}
    >
      <div className="intro-fog" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="intro-line intro-line--one">{dict.ambience.introLine1}</p>
        <h2 className="font-display text-4xl text-bone sm:text-6xl">
          {dict.siteName}
        </h2>
        <p className="intro-line intro-line--two">{dict.ambience.introLine2}</p>

        <button
          type="button"
          onClick={dismiss}
          className="mt-10 rounded-full border border-ember/50 bg-ember/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ember transition-colors hover:bg-ember hover:text-ink"
        >
          {dict.ambience.enter}
        </button>
      </div>

      <button
        type="button"
        onClick={dismiss}
        className="absolute bottom-6 right-6 z-10 rounded-full border border-bone/20 px-4 py-2 text-xs text-bone/60 transition-colors hover:border-ember hover:text-ember"
      >
        {dict.ambience.skip}
      </button>
    </div>
  );
}
