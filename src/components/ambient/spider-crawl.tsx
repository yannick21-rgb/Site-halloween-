/**
 * Araignées qui parcourent l'écran.
 *
 * Trois espèces, trois allures, tirées en rotation par `flight-cues.tsx`
 * (jamais la même deux fois de suite).
 *
 * Anatomie d'après l'anatomie réelle des araignées :
 *
 * - le corps est en DEUX parties, le céphalothorax (prosoma, à l'avant) et
 *   l'abdomen (opisthosoma, à l'arrière), reliés par un pédicel étroit ;
 * - les HUIT pattes s'attachent toutes au céphalothorax, jamais le long du
 *   corps ;
 * - chaque patte est ARTICULÉE : le genou (fémur + patelle/tibia) est le point
 *   le plus éloigné du corps et la pointe se recourbe vers l'axe. Cette
 *   cassure distingue une araignée d'un simple bâton — une patte droite se
 *   lirait comme un trait, une patte arquée comme un animal ;
 * - quatre yeux au bord antérieur du céphalothorax et deux rangées de petits
 *   yeux latéraux, disposés de part et d'autre des pédipalpes ;
 * - la marche est une marche tétrapode alternée : au sol `{G1, G3, D2, D4}`
 *   pendant que `{D1, D3, G2, D4}` se lèvent, puis inversion (Foelix 1996,
 *   Spagna et al.).
 *
 * Les trois variantes ne sont pas le même animal redimensionné mais trois
 * espèces : les proportions sont calculées à partir de `BASE_LEGS` et
 * `SPECIES`.
 */

export const SPIDER_VARIANTS = ["drop", "line", "ground"] as const;
export type SpiderVariant = (typeof SPIDER_VARIANTS)[number];

export type SpiderCueParams = {
  variant: SpiderVariant;
  /** Durée totale du passage, en secondes. */
  duration: number;
  /** Position horizontale du pivot de fil (variante `drop`). */
  anchor: number;
  /** Longueur de la descente (variante `drop`). */
  drop: number;
  /** Angle de balancement (variante `drop`). */
  swing: number;
  /** Hauteur du passage (variantes `line` et `ground`). */
  level: number;
  /** Sens de marche : 1 vers la droite, -1 vers la gauche. */
  direction: 1 | -1;
};

/**
 * Géométrie de base, vue de dessus, l'animal regardant vers +x.
 *
 * L'orientation est dictée par l'anatomie : les yeux et les pédipalpes sont
 * sur le bord AVANT du céphalothorax, donc le plus loin possible de
 * l'abdomen. C'est ce repère qui dit de quel côté la tête regarde.
 *
 * Chaque patte est un arc à trois points (`a` attache → `k` genou → `t` tarse),
 * tracé en deux quadriques. Le coude au genou reste net, mais les segments
 * gardent une courbure vivante : c'est le compromis qui, comparé sur image,
 * ressemble le plus à une patte d'araignée.
 *
 * `a` est sur le céphalothorax, l'ordre va de 1 (avant) à 4 (arrière) ; le
 * flanc du bas est le miroir exact par rapport à l'axe du corps.
 */
const AXIS = 22;
type Leg = { a: [number, number]; k: [number, number]; t: [number, number] };

const BASE_LEGS: Leg[] = [
  // Flanc du haut, de l'avant (1) vers l'arrière (4).
  //
  // Le genou (`k`) est franchement écarté du corps et la pointe (`t`) se
  // recourbe vers l'axe : c'est ce crochet qui distingue une araignée d'un
  // simple bâton. Comparé sur image, c'est cette géométrie qui se lit le
  // mieux — une courbe continue se lit comme un tentacule, un coude trop
  // ouvert comme un bras de robot.
  { a: [34, 18.4], k: [45, 9], t: [38.5, 3.5] },
  { a: [31, 17.6], k: [39.5, 6.5], t: [30.5, 2] },
  { a: [28, 17.2], k: [33, 5.5], t: [22.5, 2] },
  { a: [25, 18], k: [18.5, 8.5], t: [8.5, 4] },
  // Flanc du bas : miroir exact par rapport à l'axe du corps (y → 44 − y).
  { a: [34, 25.6], k: [45, 35], t: [38.5, 40.5] },
  { a: [31, 26.4], k: [39.5, 37.5], t: [30.5, 42] },
  { a: [28, 26.8], k: [33, 38.5], t: [22.5, 42] },
  { a: [25, 26], k: [18.5, 35.5], t: [8.5, 40] },
];

/**
 * Marche tétrapode alternée. D'après Foelix (1996) et Spagna et al. : les
 * pattes `I` et `III` d'un flanc sont au sol en même temps que les pattes
 * `II` et `IV` de l'autre, les quatre autres se levant pendant ce temps.
 *
 * L'ordre suit `BASE_LEGS` : 0→3 le flanc du haut, 4→7 celui du bas. Un
 * tétrapode vaut 0, l'autre 0,5 — soit une demi-période de décalage.
 */
const GAIT = [0, 0.5, 0, 0.5, 0.5, 0, 0.5, 0];

/** Amplitude de foulure par patte : les pattes avant jambes plus. */
const REACH = [7, 6, 5.5, 4.5, 7, 6, 5.5, 4.5];

/**
 * Espèces. `leg` allonge la patte depuis son point d'attache (genou et pointe
 * s'éloignent), `body` réduit le corps autour du pivot céphalique. Le rapport
 * entre les DEUX est ce qui distingue une espèce : c'est la longueur des
 * pattes rapportée à la taille du corps qui caractérise un pholque d'une
 * lycosée, bien plus que la couleur.
 *
 * `stroke` est en unités du viewBox, et le viewBox est rendu à 1:1 (38 unités
 * pour 38 px) : une valeur de 0.8 fait donc moins d'un pixel à l'écran et
 * disparaît. C'est la contrainte qui borne le réglage du pholque.
 *
 * `label` n'est pas affiché : il documente l'espèce visée.
 */
const SPECIES: Record<
  SpiderVariant,
  { leg: number; body: number; stroke: number; mark: boolean; label: string }
> = {
  // Agélénide des maisons : robuste, pattes moyennes.
  drop: { leg: 1, body: 1, stroke: 1.35, mark: false, label: "agélénide" },
  // Pholque : le plus dégingandé des trois. Un vrai pholque a le corps sept
  // fois plus petit que ses pattes, rapport impossible ici sans que l'animal
  // devienne une tache de pixels à 38 px. On garde le caractère — nettement
  // le plus longiligne, rapport 1,83 contre ~1 pour les deux autres — en
  // remontant le corps et en raccourcissant un peu les pattes.
  line: { leg: 1.32, body: 0.72, stroke: 1.05, mark: false, label: "pholque" },
  // Lycosée : abdomen volumineux, pattes puissantes.
  ground: { leg: 1.18, body: 1.16, stroke: 1.6, mark: true, label: "lycosée" },
};

/** Étire un point depuis son point d'attache : allonge la patte sans la
 * déplacer de sa naissance. */
function stretch(origin: [number, number], p: [number, number], k: number) {
  return [
    origin[0] + (p[0] - origin[0]) * k,
    origin[1] + (p[1] - origin[1]) * k,
  ] as [number, number];
}

const round = (n: number) => Math.round(n * 100) / 100;

export function SpiderCrawl({
  variant,
  duration,
  anchor,
  drop,
  swing,
  level,
  direction,
}: SpiderCueParams) {
  const style = {
    "--spider-duration": `${duration}s`,
    "--spider-anchor": `${anchor}%`,
    "--spider-drop": `${drop}px`,
    "--spider-swing": `${swing}deg`,
    "--spider-level": `${level}%`,
    "--spider-direction": direction,
  } as React.CSSProperties;

  const species = SPECIES[variant];
  const body = species.body;

  const legs = BASE_LEGS.map((leg, index) => {
    const k = stretch(leg.a, leg.k, species.leg);
    const t = stretch(leg.a, leg.t, species.leg);
    // Chaque segment est une quadrique passant par son milieu : le coude reste
    // net au genou tout en gardant une articulation vivante.
    const d =
      `M${leg.a[0]} ${leg.a[1]}` +
      ` Q${round((leg.a[0] + k[0]) / 2)} ${round((leg.a[1] + k[1]) / 2)}` +
      ` ${round(k[0])} ${round(k[1])}` +
      ` Q${round((k[0] + t[0]) / 2)} ${round((k[1] + t[1]) / 2)}` +
      ` ${round(t[0])} ${round(t[1])}`;
    return (
      <path
        key={index}
        className="sl-leg"
        style={
          {
            "--stroke-width": species.stroke,
            "--ox": `${leg.a[0]}px`,
            "--oy": `${leg.a[1]}px`,
            "--reach": `${REACH[index]}deg`,
            "--phase": `${GAIT[index] * -0.42}s`,
          } as React.CSSProperties
        }
        d={d}
      />
    );
  });

  // Le corps est dessiné à sa taille normale puis réduit autour du pivot, ce
  // qui rétrécit l'abdomen sans déplacer la tête.
  const bodyScale = `translate(${round(30 - 30 * body)} ${
    round(AXIS - AXIS * body)
  }) scale(${body})`;

  const spider = (
    <span className="crawler-flip">
      <svg
        className="crawler-svg"
        viewBox="6 1 38 42"
        width="38"
        height="42"
        aria-hidden="true"
      >
        {/* Les huit pattes sont HORS du groupe redimensionné : leur longueur
            est une grandeur indépendante de celle du corps. Dans le même
            groupe, les deux échelles se multiplieraient et un pholque se
            retrouverait avec des pattes de longueur normale. */}
        {legs}
        <g transform={bodyScale}>
          {/* Abdomen (opisthosoma) : la plus grosse masse, à l'arrière, plus
              large que le céphalothorax. */}
          <ellipse className="sl-abdomen" cx="12" cy={AXIS} rx="8.5" ry="8" />
          {/* Marque médio-dorsale claire : signature des lycosées. */}
          <ellipse
            className="sl-mark"
            data-on={species.mark ? "true" : "false"}
            cx="12"
            cy="18.5"
            rx="4.4"
            ry="2.2"
          />
          {/* Pédicel : la fine « taille » entre les deux parties du corps. */}
          <rect
            className="sl-pedicel"
            x="19.4"
            y={AXIS - 0.7}
            width="3.6"
            height="1.4"
            rx="0.7"
          />
          {/* Céphalothorax : porte les yeux, les pédipalpes et les huit
              pattes. Plus étroit que l'abdomen. */}
          <ellipse className="sl-carapace" cx="30" cy={AXIS} rx="7" ry="6.2" />
          {/* Les yeux : deux rangées serrées sur le bord avant, les médians
              antérieurs les plus gros. Discrets — à cette échelle un œil trop
              clair se lirait comme une tache. */}
          <circle className="sl-eye" cx="34.6" cy="20.6" r="0.8" />
          <circle className="sl-eye" cx="34.6" cy="23.4" r="0.8" />
          <circle className="sl-eye sl-eye--small" cx="33" cy="19" r="0.5" />
          <circle className="sl-eye sl-eye--small" cx="33" cy="25" r="0.5" />
          {/* Pédipalpes : le second jeu d'appendices, courts, en avant des
              pattes et de part et d'autre des chelicères. */}
          <path className="sl-palp" d="M35.6 19.4 Q37.6 17.6 38.9 16.6" />
          <path className="sl-palp" d="M35.6 24.6 Q37.6 26.4 38.9 27.4" />
        </g>
      </svg>
    </span>
  );

  // Variante « suspension » : le bras est le rail de soie. Il porte la
  // rotation, son enfant porte la descente — un seul axe par élément.
  if (variant === "drop") {
    return (
      <div className="crawler crawler--drop" style={style} aria-hidden="true">
        <span className="crawler-arm">
          <span className="crawler-thread" />
          <span className="crawler-stop">{spider}</span>
        </span>
      </div>
    );
  }

  // Variantes « fil tendu » et « sol » : même anatomie, hauteurs et vitesses
  // différentes, sens de marche tiré au sort.
  return (
    <div className={`crawler crawler--${variant}`} style={style} aria-hidden="true">
      <span className="crawler-thread" />
      <span className="crawler-track">{spider}</span>
    </div>
  );
}