"use client";

import { useEffect, useRef, useState } from "react";
import {
  BAT_ROUTES,
  BatFlight,
  type BatRoute,
} from "@/components/ambient/bat-flight";
import {
  SPIDER_VARIANTS,
  SpiderCrawl,
  type SpiderVariant,
} from "@/components/ambient/spider-crawl";

/**
 * Apparitions ponctuelles : chauves-souris qui traversent l'écran et araignées
 * qui le parcourent.
 *
 * Ce qui distingue ces deux effets de la brume ou des fantômes : ils ne sont pas
 * toujours là. Une minuterie décide *quand* l'animal arrive et *par où* il
 * passe, puis le retire. Le mouvement lui-même est entièrement en CSS — aucune
 * boucle `requestAnimationFrame`, donc aucun coût entre deux apparitions.
 *
 * Un ordonnanceur pilote les deux familles, mais sur deux horloges
 * indépendantes : le rythme des chauves-souris n'a rien à voir avec celui des
 * araignées.
 *
 * Rien n'est rendu quand le visiteur a demandé des animations réduites : le
 * parent (`AmbientLayer`) ne monte même pas ce composant, le réglage du site
 * coupe donc tout d'un coup comme la brume.
 */

type Range = readonly [number, number];

/** Toutes les durées sont en millisecondes. */
const TIMING = {
  bat: {
    /** Avant la toute première apparition. */
    first: [6_000, 12_000],
    /** Attente après la fin d'un passage, avant le suivant. */
    idle: [10_000, 20_000],
    /** Durée d'un passage. */
    hold: [5_000, 9_000],
  },
  spider: {
    first: [20_000, 40_000],
    /* Une attente de 15 à 25 s après un passage de 18 à 22 s place trois
       apparitions en 1 min 40 à 2 min 20 : les trois variantes passent bien
       dans la fenêtre demandée. */
    idle: [15_000, 25_000],
    hold: [18_000, 22_000],
  },
} as const satisfies Record<string, Record<string, Range>>;

function between([min, max]: Range): number {
  return min + Math.random() * (max - min);
}

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

type BatCue = {
  route: BatRoute;
  /** Position verticale de départ, en pourcentage du viewport. */
  top: number;
  flipped: boolean;
  duration: number;
};

type SpiderCue = {
  variant: SpiderVariant;
  duration: number;
  /** Position horizontale du pivot de fil (variante `drop`). */
  anchor: number;
  /** Longueur de la descente (variante `drop`). */
  drop: number;
  /** Angle de balancement final (variante `drop`). */
  swing: number;
  /** Hauteur du passage (variantes `line` et `ground`). */
  level: number;
  /** Sens de marche : 1 vers la droite, -1 vers la gauche. */
  direction: 1 | -1;
};

function createBat(): BatCue {
  return {
    route: pick(BAT_ROUTES),
    // La trajectoire reste dans le tiers haut et le tiers bas : jamais de
    // passage prolonged au milieu d'un paragraphe.
    top: 6 + Math.random() * 58,
    // Un miroir sur deux, pour que deux passages consécutifs ne se ressemblent
    // pas exactement.
    flipped: Math.random() < 0.5,
    duration: between(TIMING.bat.hold),
  };
}

function createSpider(previous: SpiderCue | null): SpiderCue {
  // Jamais deux fois la même variante d'affilée : les trois sont donc vues en
  // trois apparitions au plus.
  const variant = pick(
    SPIDER_VARIANTS.filter((item) => item !== previous?.variant),
  );

  return {
    variant,
    duration: between(TIMING.spider.hold),
    anchor: 14 + Math.random() * 58,
    // La descente va jusqu'à mi-écran : assez pour sortir du cadre en
    // remontant, pas assez pour barrer la lecture.
    drop: Math.round(window.innerHeight * (0.26 + Math.random() * 0.16)),
    swing: 34 + Math.random() * 26,
    // `line` se pose dans le tiers haut, `ground` reste collé au bas.
    level:
      variant === "ground" ? 86 + Math.random() * 8 : 12 + Math.random() * 30,
    direction: Math.random() < 0.5 ? 1 : -1,
  };
}

/**
 * Horloge d'apparitions : rend un objet d'apparition tant qu'il est « en vol »,
 * `null` sinon.
 *
 * - la minuterie est vidée quand l'onglet passe en arrière-plan, et l'animal en
 *   cours est retiré : au retour, le visiteur ne trouve pas une chauve-souris
 *   figée au milieu de l'écran ;
 * - le décompte repart d'un délai plein au retour, pour ne pas déclencher une
 *   apparition immédiate ;
 * - la clé change à chaque passage, ce qui remonte l'élément et redémarre ses
 *   animations CSS — sans cela le même nœud DOM réutiliserait une animation
 *   déjà terminée.
 */
function useOccasionalCue<Cue extends { duration: number }>(
  timing: { first: Range; idle: Range },
  create: (previous: Cue | null) => Cue,
): (Cue & { key: number }) | null {
  const [entry, setEntry] = useState<{ key: number; cue: Cue } | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const sequence = useRef(0);
  const last = useRef<Cue | null>(null);

  useEffect(() => {
    let stopped = false;

    const clearTimer = () => {
      if (timer.current !== undefined) window.clearTimeout(timer.current);
      timer.current = undefined;
    };

    const schedule = (delay: number) => {
      clearTimer();
      timer.current = window.setTimeout(() => {
        if (stopped) return;
        const next = create(last.current);
        last.current = next;
        setEntry({ key: sequence.current++, cue: next });
        // L'attente se compte après la fin du passage, et l'on réutilise la
        // durée réelle de l'animation plutôt qu'un nouveau tirage : la
        // minuterie ne peut donc jamais couper un animal en plein vol.
        schedule(between(timing.idle) + next.duration * 1000);
      }, delay);
    };

    const start = () => {
      setEntry(null);
      schedule(between(timing.first));
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        clearTimer();
        setEntry(null);
      } else {
        start();
      }
    };

    // Sous 768 px le CSS masque ces effets : inutile de faire tourner les
    // minuteries et de provoquer un rendu React pour rien. Le seuil est
    // celui du bloc mobile de `globals.css`.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onScreenChange = () => {
      if (desktop.matches) {
        start();
      } else {
        clearTimer();
        setEntry(null);
      }
    };

    if (desktop.matches) start();
    document.addEventListener("visibilitychange", onVisibilityChange);
    desktop.addEventListener("change", onScreenChange);

    return () => {
      stopped = true;
      clearTimer();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      desktop.removeEventListener("change", onScreenChange);
    };
  }, [timing, create]);

  return entry ? { ...entry.cue, key: entry.key } : null;
}

export function FlightCues() {
  const bat = useOccasionalCue<BatCue>(TIMING.bat, createBat);
  const spider = useOccasionalCue<SpiderCue>(TIMING.spider, createSpider);

  // `key` est retirée par React et n'atteint jamais les props : le spread ne
  // laisse que les paramètres du composant.
  return (
    <>
      {bat ? <BatFlight {...bat} key={bat.key} /> : null}
      {spider ? <SpiderCrawl {...spider} key={spider.key} /> : null}
    </>
  );
}