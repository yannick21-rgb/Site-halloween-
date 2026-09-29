"use client";

import { Volume2, VolumeX, Zap, ZapOff } from "lucide-react";
import { useSite } from "@/components/providers/site-provider";

/**
 * Réglages d'ambiance dans l'en-tête.
 *
 * Le son est coupé par défaut : le visiteur l'active explicitement. Les deux
 * boutons sont de vrais `button` avec `aria-pressed` pour les lecteurs d'écran.
 */
export function AmbienceToggles() {
  const { dict, reducedMotion, toggleReducedMotion, soundEnabled, toggleSound } =
    useSite();

  const buttonClass =
    "rounded-full border p-2.5 transition-colors";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={soundEnabled}
        aria-label={soundEnabled ? dict.ambience.soundOn : dict.ambience.soundOff}
        title={soundEnabled ? dict.ambience.soundOn : dict.ambience.soundOff}
        className={`${buttonClass} ${
          soundEnabled
            ? "border-ember/50 text-ember"
            : "border-bone/15 text-bone/45 hover:border-ember hover:text-ember"
        }`}
      >
        {soundEnabled ? (
          <Volume2 size={17} aria-hidden="true" />
        ) : (
          <VolumeX size={17} aria-hidden="true" />
        )}
      </button>

      <button
        type="button"
        onClick={toggleReducedMotion}
        aria-pressed={reducedMotion}
        aria-label={reducedMotion ? dict.ambience.motionOff : dict.ambience.motionOn}
        title={reducedMotion ? dict.ambience.motionOff : dict.ambience.motionOn}
        className={`${buttonClass} ${
          reducedMotion
            ? "border-bone/15 text-bone/45 hover:border-ember hover:text-ember"
            : "border-ember/50 text-ember"
        }`}
      >
        {reducedMotion ? (
          <ZapOff size={17} aria-hidden="true" />
        ) : (
          <Zap size={17} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
