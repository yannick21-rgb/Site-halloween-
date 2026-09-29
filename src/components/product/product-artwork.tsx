import Link from "next/link";
import type { ArtGlyph } from "@/lib/products";
import { PRODUCT_GLYPHS } from "@/components/product/product-glyphs";

/**
 * Glyphes génériques, utilisés pour la décoration (accueil, bandeau…).
 * Les illustrations propres à chaque produit vivent dans `product-glyphs.tsx`.
 *
 * Sans annotation de type : TS déduit les 8 clés, et la fusion avec
 * `PRODUCT_GLYPHS` couvre ainsi l'intégralité de `ArtGlyph`.
 */
const BASE_GLYPHS = {
  pumpkin: (
    <g>
      <path d="M32 22c-2-4-1-8 2-9 3-1 5 2 4 6" strokeWidth="3" />
      <ellipse cx="32" cy="40" rx="20" ry="18" />
      <circle cx="25" cy="37" r="3.2" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="39" cy="37" r="3.2" className="fill-[#0B0A0F] stroke-none" />
      <path
        d="M23 48c3 4 6 5 9 5s6-1 9-5"
        className="fill-none stroke-[#0B0A0F]"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  ),
  ghost: (
    <g>
      <path d="M20 48V34a12 12 0 0 1 24 0v14l-6-5-6 5-6-5z" />
      <circle cx="27" cy="32" r="2.8" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="37" cy="32" r="2.8" className="fill-[#0B0A0F] stroke-none" />
      <ellipse cx="32" cy="41" rx="3" ry="4" className="fill-[#0B0A0F] stroke-none" />
    </g>
  ),
  skull: (
    <g>
      <path d="M20 34a12 12 0 1 1 24 0c0 5-2 8-5 10v4a2 2 0 0 1-2 2H27a2 2 0 0 1-2-2v-4c-3-2-5-5-5-10z" />
      <circle cx="26" cy="33" r="3.4" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="38" cy="33" r="3.4" className="fill-[#0B0A0F] stroke-none" />
      <path
        d="M29 42h6M32 42v6"
        className="fill-none stroke-[#0B0A0F]"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  ),
  bat: (
    <g>
      <path d="M32 34c-3-6-8-8-10-7 1 3-1 4-3 5-3 1-4 4-3 6 2-1 3 0 4 2 1-2 3-2 4-1 2 1 4 0 5-1l3-4z" />
      <path d="M32 34c3-6 8-8 10-7-1 3 1 4 3 5 3 1 4 4 3 6-2-1-3 0-4 2-1-2-3-2-4-1-2 1-4 0-5-1z" />
      <circle cx="30" cy="29" r="1.6" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="34" cy="29" r="1.6" className="fill-[#0B0A0F] stroke-none" />
    </g>
  ),
  spider: (
    <g>
      <ellipse cx="32" cy="38" rx="9" ry="11" />
      <path
        d="M23 33l-9-5M23 38l-10 0M23 43l-9 5M41 33l9-5M41 38l10 0M41 43l9 5"
        className="fill-none"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="30" cy="24" r="1.6" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="35" cy="24" r="1.6" className="fill-[#0B0A0F] stroke-none" />
      <path
        d="M32 22v-9m0 0 5 4m-5-4-5 4"
        className="fill-none" strokeDasharray="2 3"
        strokeWidth="1.4"
      />
    </g>
  ),
  cat: (
    <g>
      <path d="M20 40l2-14 7 6a13 13 0 0 1 6 0l7-6 2 14c0 8-5 12-12 12s-12-4-12-12z" />
      <circle cx="27" cy="38" r="2.4" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="37" cy="38" r="2.4" className="fill-[#0B0A0F] stroke-none" />
      <path
        d="M32 43l-2.5-2.5h5z"
        className="fill-[#0B0A0F] stroke-none"
      />
      <path
        d="M22 45h-7M22 48h-7M42 45h7M42 48h7"
        className="fill-none"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </g>
  ),
  candle: (
    <g>
      <path d="M26 32h12v20a4 4 0 0 1-4 4H30a4 4 0 0 1-4-4z" />
      <path d="M32 18c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9z" className="fill-none" />
      <path
        d="M26 42h12M26 48h12"
        className="fill-none" strokeDasharray="3 4"
        strokeWidth="1.4"
      />
    </g>
  ),
  moon: (
    <g>
      <path d="M40 20a18 18 0 1 0 4 26 20 20 0 0 1-4-26z" />
      <circle cx="18" cy="22" r="1.6" className="fill-current stroke-none" opacity="0.7" />
      <circle cx="13" cy="34" r="1.2" className="fill-current stroke-none" opacity="0.5" />
      <circle cx="20" cy="44" r="1.4" className="fill-current stroke-none" opacity="0.6" />
    </g>
  ),
};

/**
 * Table des visuels : glyphes génériques + illustration dédiée par produit.
 *
 * `satisfies` (et non une annotation) : le type reste celui de la fusion, mais
 * le compilateur vérifie que chaque nom de `ART_GLYPHS` a bien une entrée.
 */
const GLYPHS = {
  ...BASE_GLYPHS,
  ...PRODUCT_GLYPHS,
} satisfies Record<ArtGlyph, React.ReactNode>;

export function ProductArtwork({
  glyph,
  from,
  to,
  className = "",
}: {
  glyph: ArtGlyph;
  from: string;
  to: string;
  className?: string;
}) {
  const gradientId = `art-${glyph}-${from.replace("#", "")}-${to.replace("#", "")}`;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="presentation"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill={`url(#${gradientId})`} opacity="0.22" />
      <g
        stroke={`url(#${gradientId})`}
        className="drop-shadow-[0_0_10px_rgba(255,92,0,0.35)]"
      >
        {GLYPHS[glyph]}
      </g>
    </svg>
  );
}

export function ProductArtworkLink({
  slug,
  glyph,
  from,
  to,
  locale,
  label,
  className = "",
}: {
  slug: string;
  glyph: ArtGlyph;
  from: string;
  to: string;
  locale: string;
  label: string;
  className?: string;
}) {
  const base = locale === "en" ? "/en" : "";
  return (
    <Link
      href={`${base}/produits/${slug}`}
      aria-label={label}
      className={`group relative block overflow-hidden ${className}`}
    >
      <ProductArtwork
        glyph={glyph}
        from={from}
        to={to}
        className="h-full w-full transition-transform duration-500 group-hover:scale-105"
      />
    </Link>
  );
}
