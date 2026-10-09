/**
 * Chauves-souris en vol.
 *
 * Aucun JavaScript dans ce fichier : le composant pose le décor (position de
 * départ, sens de passage) et les keyframes conduisent le mouvement. Le
 * déclenchement aléatoire est piloté par `flight-cues.tsx`.
 *
 * La silhouette suit l'anatomie réelle d'une aile de chiroptère : la membrane
 * est tendue sur des doigts démesurément allongés, et son bord de fuite est
 * découpé en festons entre les pointes des doigts — c'est ce festonnement,
 * plus que tout le reste, qui fait reconnaître une chauve-souris au premier
 * coup d'œil. La petite membrane en éventail sous le corps est l'uropatagium,
 * tendue entre les pattes arrière et la queue.
 */

export const BAT_ROUTES = ["rise", "fall", "level", "dive"] as const;
export type BatRoute = (typeof BAT_ROUTES)[number];

export type BatCueParams = {
  /** Trajectoire tirée au sort : diagonale montante, descendante, horizontale
   * ou plongée. */
  route: BatRoute;
  /** Position verticale de départ, en pourcentage du viewport. */
  top: number;
  /** Miroir horizontal : pour que deux passages ne se ressemblent pas. */
  flipped: boolean;
  /** Durée de la traversée, en secondes. */
  duration: number;
};

const WING_RIGHT =
  "M23 11 C 28 5, 36 2, 45 4 Q 41 6, 38 13 Q 34 13, 31 17 Q 28.5 15.5, 26 18.5 Z";
const WING_LEFT =
  "M23 11 C 18 5, 10 2, 1 4 Q 5 6, 8 13 Q 12 13, 15 17 Q 17.5 15.5, 20 18.5 Z";

export function BatFlight({ route, top, flipped, duration }: BatCueParams) {
  return (
    <div
      className={`bat-flight bat-flight--${route}`}
      style={
        {
          "--bat-top": `${top}%`,
          "--bat-duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      <span className="bat-wing-svg" data-flipped={flipped ? "true" : "false"}>
        <svg viewBox="0 0 46 26" width="46" height="26" focusable="false">
          {/* Ailes : la rotation se fait autour de l'épaule (x = 23). */}
          <path className="bat-wing bat-wing--left" d={WING_LEFT} />
          <path className="bat-wing bat-wing--right" d={WING_RIGHT} />

          {/* Pattes arrière et uropatagium : la petite poche à insectes. */}
          <path
            className="bat-membrane"
            d="M20.6 17 Q21.2 21, 23 24.2 Q24.8 21, 25.4 17 Q23 19.4, 20.6 17 Z"
          />

          {/* Oreilles, puis tête et thorax. */}
          <path className="bat-fur" d="M20.9 6.2 L19.4 0.6 L22.7 4.6 Z" />
          <path className="bat-fur" d="M25.1 6.2 L26.6 0.6 L23.3 4.6 Z" />
          <ellipse className="bat-fur" cx="23" cy="8.4" rx="3.3" ry="3.1" />
          <ellipse className="bat-fur" cx="23" cy="14.6" rx="2.7" ry="4.1" />
        </svg>
      </span>
    </div>
  );
}