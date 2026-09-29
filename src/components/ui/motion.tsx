"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Primitives d'animation, en CSS uniquement.
 *
 * Le rendu est piloté par les classes de `globals.css` (`.rise`,
 * `.rise-on-mount`, `.panel-in`, `.hover-lift`…) ; ici on se contente
 * d'observer l'entrée des éléments dans l'écran.
 *
 * Pourquoi pas de librairie d'animation : dans cet environnement les paquets
 * `motion` / `framer-motion` sont installables mais non résolvables — leur
 * dépendance `motion-dom` reste dans le cache du gestionnaire de paquets et le
 * bundler ne remonte pas jusqu'à elle depuis le projet. Le CSS couvre le besoin
 * (révélations au défilement, cascades, panneaux, ressorts simples) sans
 * JavaScript supplémentaire.
 *
 * Le bloc `@media (prefers-reduced-motion: reduce)` de `globals.css` neutralise
 * toutes ces animations d'un coup pour qui limite les animations au niveau
 * système.
 */

/** Signale une fois qu'un élément est visible à l'écran. */
export function useInViewOnce<T extends HTMLElement>(
  options: { amount?: number; rootMargin?: string } = {},
) {
  const { amount = 0.2, rootMargin = "0px 0px -10% 0px" } = options;
  const [node, setNode] = useState<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!node) return;

    // Pas d'IntersectionObserver : on affiche tout plutôt que de rien.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: amount, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, amount, rootMargin]);

  return { ref: setNode, visible } as const;
}

/** Traduit les options en variables CSS consommées par `.rise*`. */
function riseStyle({
  delay = 0,
  y = 24,
  duration = 0.65,
}: {
  delay?: number;
  y?: number;
  duration?: number;
}): CSSProperties {
  return {
    "--rise-delay": `${delay}ms`,
    "--rise-y": `${y}px`,
    "--rise-duration": `${duration * 1000}ms`,
  } as CSSProperties;
}

export type RevealOptions = {
  children: ReactNode;
  /** Millisecondes avant le début de l'animation. */
  delay?: number;
  /** Distance verticale de départ, en pixels. */
  y?: number;
  /** Durée en secondes. */
  duration?: number;
  className?: string;
  /** Se déclenche au montage plutôt qu'à l'entrée dans l'écran. */
  onMount?: boolean;
  as?: "div" | "li" | "article" | "section" | "ul" | "dl" | "header";
};

/**
 * Apparition : monte et fond quand l'élément entre dans l'écran.
 *
 * ```tsx
 * <FadeIn delay={120}><Carte /></FadeIn>
 * ```
 */
export function FadeIn({
  children,
  delay = 0,
  y = 24,
  duration = 0.65,
  className = "",
  onMount = false,
  as = "div",
}: RevealOptions) {
  const Tag = as;
  const { ref, visible } = useInViewOnce<HTMLElement>({ amount: 0.2 });
  const style = riseStyle({ delay, y, duration });

  if (onMount) {
    return (
      <Tag className={`rise-on-mount ${className}`} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`rise ${visible ? "is-visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

/**
 * Cascade au montage, pour le premier écran : chaque enfant est décalé du
 * précédent. Utile quand rien n'est encore déployé au défilement.
 *
 * Les enfants sont clonés pour recevoir la classe et la variable de délai :
 * aucun `<div>` n'est ajouté, le DOM reste exactement ce qu'il serait sans
 * animation.
 *
 * ```tsx
 * <StaggerList className="flex flex-col gap-4">
 *   <span>…</span>
 *   <h1>…</h1>
 * </StaggerList>
 * ```
 */
export function StaggerList({
  children,
  className = "",
  step = 90,
  delay = 0,
  y = 26,
  duration = 0.65,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Millisecondes entre deux enfants. */
  step?: number;
  delay?: number;
  y?: number;
  duration?: number;
  as?: "div" | "ul" | "dl" | "header" | "section";
}) {
  const Tag = as;
  const items = Children.toArray(children);

  return (
    <Tag className={className}>
      {items.map((child, position) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<{ className?: string; style?: CSSProperties }>, {
              className: `rise-on-mount ${
                (child.props as { className?: string }).className ?? ""
              }`.trim(),
              style: {
                ...riseStyle({ delay: delay + position * step, y, duration }),
                ...(child.props as { style?: CSSProperties }).style,
              },
            })
          : child,
      )}
    </Tag>
  );
}
