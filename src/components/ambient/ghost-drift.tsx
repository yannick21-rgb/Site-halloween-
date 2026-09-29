/**
 * Apparitions de fantômes aux bords de l'écran.
 *
 * Aucun JavaScript : les fantômes sont fixes et toujours dans le viewport, donc
 * un `IntersectionObserver` n'apporterait rien. Tout est en CSS, y compris la
 * réaction au défilement via `animation-timeline: scroll()`.
 */
export function GhostDrift() {
  return (
    <div className="ambient-layer" aria-hidden="true">
      <div className="ghost ghost--left" />
      <div className="ghost ghost--right" />
    </div>
  );
}
