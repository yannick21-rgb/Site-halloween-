"use client";

import dynamic from "next/dynamic";
import { useSite } from "@/components/providers/site-provider";

/**
 * Couche d'ambiance globale.
 *
 * Deux précautions :
 * - `ssr: false` car tous ces effets n'ont de sens qu'après hydratation, et
 *   l'option n'est autorisée que depuis un Client Component (cf. la doc Next
 *   embarquée dans `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md`) ;
 * - rien n'est rendu si le visiteur a demandé des animations réduites, ce qui
 *   évite de payer le chargement du JavaScript pour un effet invisible.
 */
const Mist = dynamic(
  () => import("@/components/ambient/mist").then((m) => m.Mist),
  { ssr: false },
);
const CandleGlow = dynamic(
  () => import("@/components/ambient/candle-glow").then((m) => m.CandleGlow),
  { ssr: false },
);
const SpiderWeb = dynamic(
  () => import("@/components/ambient/spider-web").then((m) => m.SpiderWeb),
  { ssr: false },
);
const GhostDrift = dynamic(
  () => import("@/components/ambient/ghost-drift").then((m) => m.GhostDrift),
  { ssr: false },
);
const IntroOverlay = dynamic(
  () => import("@/components/ambient/intro-overlay").then((m) => m.IntroOverlay),
  { ssr: false },
);
const AmbientSound = dynamic(
  () => import("@/components/ambient/ambient-sound").then((m) => m.AmbientSound),
  { ssr: false },
);

export function AmbientLayer() {
  const { reducedMotion, soundEnabled } = useSite();

  // Le son est indépendant du réglage d'animation : on peut vouloir une page
  // calme avec une nappe sonore, ou l'inverse.
  return (
    <>
      {soundEnabled && <AmbientSound />}
      {reducedMotion ? null : (
        <>
          <IntroOverlay />
          <Mist />
          <CandleGlow />
          <SpiderWeb />
          <GhostDrift />
        </>
      )}
    </>
  );
}
