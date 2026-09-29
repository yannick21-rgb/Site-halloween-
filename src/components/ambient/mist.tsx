"use client";

/**
 * Brume qui dérive en permanence au bas de l'écran.
 *
 * Rendue en CSS pur (deux couches de dégradés animés) plutôt qu'en canvas :
 * le coût GPU reste négligeable et le composant tient en une div.
 */
export function Mist() {
  return (
    <div className="ambient-layer" aria-hidden="true">
      <div className="mist mist--far" />
      <div className="mist mist--near" />
    </div>
  );
}
