"use client";

import { useEffect, useRef } from "react";

/**
 * Lueur de bougie qui suit le pointeur.
 *
 * Volontairement sobre : une seule position, deux transformations par frame au
 * maximum, et rien du tout sur les appareils tactiles où le pointeur n'existe
 * pas. Le style est écrit directement sur les propriétés pour éviter un
 * recalcul de style complet à chaque mouvement.
 */
export function CandleGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Aucun pointeur fin : on n'allume rien.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    // Lissage : la lueur rattrape le curseur avec un léger retard.
    const step = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = window.requestAnimationFrame(step);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      glow.dataset.visible = "true";
    };

    const onPointerLeave = () => {
      glow.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    frame = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="ambient-layer" aria-hidden="true">
      <div ref={glowRef} className="candle-glow" data-visible="false" />
    </div>
  );
}
