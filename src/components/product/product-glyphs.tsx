/**
 * Illustrations dédiées à chaque produit.
 *
 * Une entrée par `slug` : chaque fiche produit affiche un visuel qui lui est
 * propre au lieu de réutiliser un glyphe générique. Le style reprend les
 * conventions de `product-artwork.tsx` : traits en `currentColor` (le dégradé
 * du produit), `fill="none"`, `strokeWidth` 2.2, et pleins en `#0B0A0F`.
 *
 * Ces entrées sont fusionnées avec les glyphes génériques dans `GLYPHS`, donc
 * le rendu (dégradé, ombre portée, survol) est identique partout.
 */
export const PRODUCT_GLYPHS = {
  /* ------------------------------ Physique ------------------------------ */

  "ghost-lamp": (
    <g>
      <path d="M24 18h16l-3 8H27z" />
      <path d="M32 26v5" />
      <path d="M22 48V37a10 10 0 0 1 20 0v11l-5-4-5 4-5-4z" />
      <circle cx="28" cy="39" r="2" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="36" cy="39" r="2" className="fill-[#0B0A0F] stroke-none" />
      <path d="M15 22l-4-3M49 22l4-3M32 12V5" />
    </g>
  ),

  "light-string": (
    <g>
      <path d="M6 20c10 12 18 16 26 16s16-4 26-16" />
      <path d="M17 36v5" />
      <circle cx="17" cy="45" r="5" />
      <path d="M17 40c-1-2 0-4 2-4" />
      <path d="M41 36v4" />
      <path d="M41 40c-3-4-7-5-9-4 1 3-1 4-2 5-2 1-3 3-2 4 2-1 3 0 4 1 1-1 3-1 4 0 2 1 4 0 5-1l2-4z" />
      <path d="M41 40c3-4 7-5 9-4-1 3 1 4 2 5 2 1 3 3 2 4-2-1-3 0-4 1-1 1-3 1-4 0-2 1-4 0-5 1l-2-4z" />
    </g>
  ),

  "led-pumpkin": (
    <g>
      <path d="M32 24c-2-4-1-8 2-9 3-1 5 2 4 6" strokeWidth="3" />
      <ellipse cx="32" cy="42" rx="19" ry="17" />
      <circle cx="26" cy="40" r="2.4" className="fill-current stroke-none" />
      <circle cx="38" cy="40" r="2.4" className="fill-current stroke-none" />
      <path d="M25 49c3 3 5 4 7 4s4-1 7-4" className="fill-none" />
      <path d="M13 30c-2 4-2 8 0 12M51 30c2 4 2 8 0 12" />
    </g>
  ),

  skeleton: (
    <g>
      <path d="M22 30a10 10 0 1 1 20 0c0 4-2 7-4 8v3a2 2 0 0 1-2 2H28a2 2 0 0 1-2-2v-3c-2-1-4-4-4-8z" />
      <circle cx="27" cy="29" r="3" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="37" cy="29" r="3" className="fill-[#0B0A0F] stroke-none" />
      <path d="M30 37h4M32 37v5" />
      <path d="M24 52v-8M32 54v-9M40 52v-8" />
      <path d="M22 44l-8 6M42 44l8 6" />
    </g>
  ),

  "ghost-eyes": (
    <g>
      <path
        d="M14 44V30a18 18 0 0 1 36 0v14l-6-5-6 5-6-5-6 5z"
        opacity="0.45"
      />
      <ellipse cx="25" cy="34" rx="4" ry="5" className="fill-current stroke-none" />
      <ellipse cx="39" cy="34" rx="4" ry="5" className="fill-current stroke-none" />
    </g>
  ),

  "inflatable-ghost": (
    <g>
      <path d="M18 50V32a14 14 0 0 1 28 0v18l-5-4-5 4-4-4-4 4-5-4z" />
      <circle cx="27" cy="34" r="2.6" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="37" cy="34" r="2.6" className="fill-[#0B0A0F] stroke-none" />
      <path d="M28 42c2 2 6 2 8 0" className="fill-none" />
      <path d="M13 38c-2 1-3 3-2 5M51 38c2 1 3 3 2 5" />
    </g>
  ),

  "ghost-candles": (
    <g>
      <path d="M20 44V34a6 6 0 0 1 12 0v10l-3-2-3 2-3-2z" />
      <path d="M38 46V36a6 6 0 0 1 12 0v10l-3-2-3 2-3-2z" />
      <path d="M26 28c2 3 3 4 3 6a3 3 0 0 1-6 0c0-2 1-3 3-6z" />
      <path d="M44 30c2 3 3 4 3 6a3 3 0 0 1-6 0c0-2 1-3 3-6z" />
      <circle cx="26" cy="36" r="1.4" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="44" cy="38" r="1.4" className="fill-[#0B0A0F] stroke-none" />
    </g>
  ),

  "skull-candle": (
    <g>
      <path d="M22 36a10 10 0 1 1 20 0c0 4-2 7-4 8v3a2 2 0 0 1-2 2H28a2 2 0 0 1-2-2v-3c-2-1-4-4-4-8z" />
      <circle cx="27" cy="35" r="3" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="37" cy="35" r="3" className="fill-[#0B0A0F] stroke-none" />
      <path d="M32 22c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9z" />
      <path d="M24 48h16" strokeDasharray="2 3" strokeWidth="1.4" />
    </g>
  ),

  "wax-melt": (
    <g>
      <path d="M18 40h28l-3 10a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4z" />
      <path d="M24 40c0-6 3-9 8-9s8 3 8 9" />
      <path d="M32 31v-6" />
      <path d="M32 18c2 3 3 4 3 6a3 3 0 0 1-6 0c0-2 1-3 3-6z" />
      <path d="M14 54h36" />
    </g>
  ),

  "candy-bucket": (
    <g>
      <path d="M20 30h24l-3 20a4 4 0 0 1-4 4H27a4 4 0 0 1-4-4z" />
      <path d="M20 30c0-4 5-7 12-7s12 3 12 7" />
      <circle cx="26" cy="24" r="3" />
      <path d="M23 24l-3-2M29 24l3-2" />
      <circle cx="36" cy="22" r="3" />
      <path d="M33 22l-3-2M39 22l3-2" />
      <path d="M26 42h12" strokeDasharray="3 3" strokeWidth="1.4" />
    </g>
  ),

  "treat-bag": (
    <g>
      <path d="M22 26h20l-2 24a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4z" />
      <path d="M22 26c0-3 4-5 10-5s10 2 10 5" />
      <path d="M28 21c0-4 2-6 4-6s4 2 4 6" />
      <circle cx="28" cy="38" r="2.4" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="36" cy="38" r="2.4" className="fill-[#0B0A0F] stroke-none" />
      <path d="M29 45c2 2 4 2 6 0" />
    </g>
  ),

  "costume-tee": (
    <g>
      <path d="M24 20l-8 4 3 8 4-2v22h22V30l4 2 3-8-8-4a8 8 0 0 1-16 0z" />
      <path d="M28 34c2 2 6 2 8 0M32 30v6" />
    </g>
  ),

  hoodie: (
    <g>
      <path d="M24 22l-8 5 3 8 4-2v21h22V33l4 2 3-8-8-5a10 10 0 0 1-20 0z" />
      <path d="M26 22a6 6 0 0 0 12 0" />
      <path d="M28 44h8M32 40v10" />
      <circle cx="29" cy="34" r="1.6" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="35" cy="34" r="1.6" className="fill-[#0B0A0F] stroke-none" />
    </g>
  ),

  "adult-costume": (
    <g>
      <path d="M32 14c-8 0-14 6-14 16 0 12 6 22 14 22s14-10 14-22c0-10-6-16-14-16z" />
      <path d="M24 22l-4 10M40 22l4 10" />
      <path d="M22 30a10 10 0 0 1 20 0v6a10 10 0 0 1-20 0z" />
      <circle cx="28" cy="33" r="1.8" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="36" cy="33" r="1.8" className="fill-[#0B0A0F] stroke-none" />
    </g>
  ),

  "kid-costume": (
    <g>
      <path d="M32 16c-6 0-10 5-10 12 0 9 4 16 10 16s10-7 10-16c0-7-4-12-10-12z" />
      <path d="M26 24l-3 8M38 24l3 8" />
      <path d="M44 12l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" />
      <path d="M44 20v-4" />
    </g>
  ),

  "pet-costume": (
    <g>
      <path d="M18 40l2-12 6 5a10 10 0 0 1 8 0l6-5 2 12c0 6-4 9-12 9s-12-3-12-9z" />
      <path d="M20 30l-6-4M44 30l6-4" />
      <circle cx="28" cy="36" r="2" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="36" cy="36" r="2" className="fill-[#0B0A0F] stroke-none" />
    </g>
  ),

  "horror-mask": (
    <g>
      <path d="M20 26c0-6 5-10 12-10s12 4 12 10c0 8-4 14-8 16-2 1-4 1-6 0-4-2-8-8-8-16z" />
      <ellipse cx="27" cy="30" rx="3" ry="4" className="fill-[#0B0A0F] stroke-none" />
      <ellipse cx="37" cy="30" rx="3" ry="4" className="fill-[#0B0A0F] stroke-none" />
      <path d="M28 44c2 2 6 2 8 0" />
      <path d="M24 20c2-2 6-2 8 0M32 18v-4" />
    </g>
  ),

  "makeup-kit": (
    <g>
      <rect x="16" y="24" width="32" height="22" rx="3" />
      <circle cx="24" cy="33" r="3" />
      <circle cx="32" cy="33" r="3" />
      <circle cx="40" cy="33" r="3" />
      <path d="M20 40h24" />
      <path
        d="M46 14c3 4 4 6 4 8a4 4 0 0 1-8 0c0-2 1-4 4-8z"
        className="fill-[#8B0000] stroke-none"
      />
    </g>
  ),

  "diy-kit": (
    <g>
      <circle cx="22" cy="20" r="4" />
      <circle cx="22" cy="44" r="4" />
      <path d="M24 23l16 18M24 41L40 23" />
      <path d="M44 14h10v10H44z" />
      <path d="M46 18h6M46 21h6" />
    </g>
  ),

  "party-pack": (
    <g>
      <ellipse cx="26" cy="40" rx="12" ry="4" />
      <path d="M40 34h8v10a4 4 0 0 1-4 4h-4z" />
      <path d="M14 20c0-4 3-6 6-6" />
      <ellipse cx="20" cy="12" rx="6" ry="7" />
      <path d="M48 18l3-3 3 3-3 3z" />
    </g>
  ),

  "party-box": (
    <g>
      <path d="M16 30h32v20a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4z" />
      <path d="M16 30l4-10h24l4 10" />
      <path d="M28 20v-6M36 20v-6" />
      <circle cx="28" cy="10" r="4" />
      <circle cx="36" cy="10" r="4" />
      <path d="M24 40h16" strokeDasharray="3 3" />
    </g>
  ),

  "kids-pack": (
    <g>
      <path d="M20 32h24v16a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4z" />
      <path d="M20 32l3-8h18l3 8" />
      <circle cx="32" cy="20" r="5" />
      <path d="M28 20h8M32 15v10" />
    </g>
  ),

  "porch-pack": (
    <g>
      <path d="M18 50V22l14-10 14 10v28" />
      <path d="M26 50V36h12v14" />
      <circle cx="35" cy="42" r="1" className="fill-[#0B0A0F] stroke-none" />
      <path d="M14 24l4-3M50 24l-4-3" />
      <path d="M44 12c-2-3-5-4-6-3 1 2 0 3-1 4-2 1-3 3-2 4 2-1 3 0 4 1 1-1 3-1 4 0 2 1 4 0 5-1l2-4z" />
    </g>
  ),

  /* ------------------------------ Digitaux ------------------------------ */

  "creepy-art": (
    <g>
      <path d="M32 52V30c0-8-4-12-10-14 2 4 0 6-2 8-3 2-4 5-3 8-2-1-4 0-5 2 3 2 4 5 4 8-1 2-1 4 0 6" />
      <path d="M32 30c0-6 3-10 8-12-2 3-1 5 1 7 2 1 3 3 3 5" />
      <circle cx="28" cy="24" r="1.6" className="fill-[#0B0A0F] stroke-none" />
      <circle cx="36" cy="22" r="1.6" className="fill-[#0B0A0F] stroke-none" />
    </g>
  ),

  pattern: (
    <g>
      <circle cx="20" cy="20" r="5" />
      <path d="M36 16l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" />
      <path d="M20 36c-2-3-5-4-6-3 1 2 0 3-1 4-2 1-3 3-2 4 2-1 3 0 4 1 1-1 3-1 4 0 2 1 4 0 5-1l2-4z" />
      <path d="M40 34l1.5 3.5 3.5 1.5-3.5 1.5L40 44l-1.5-3.5L35 40l3.5-1.5z" />
      <circle cx="24" cy="46" r="2.5" />
    </g>
  ),

  invitation: (
    <g>
      <rect x="14" y="20" width="36" height="26" rx="2" />
      <path d="M14 22l18 12 18-12" />
      <path d="M24 40h16" strokeDasharray="2 3" />
    </g>
  ),

  "table-set": (
    <g>
      <ellipse cx="24" cy="34" rx="12" ry="10" />
      <ellipse cx="24" cy="34" rx="6" ry="4" />
      <path d="M42 22h10v20H42z" />
      <path d="M45 27h4M45 31h4" />
    </g>
  ),

  lut: (
    <g>
      <circle cx="32" cy="34" r="16" />
      <path d="M32 18v32M16 34h32M21 23l22 22M43 23L21 45" />
      <circle cx="32" cy="34" r="4" />
      <path d="M44 14c-2-3-5-4-6-3 1 2 0 3-1 4-2 1-3 3-2 4 2-1 3 0 4 1 1-1 3-1 4 0 2 1 4 0 5-1l2-4z" />
    </g>
  ),

  smoke: (
    <g>
      <path d="M12 40c4-6 2-10 6-14s8-4 10-9c2 5 6 6 6 11s-4 8-4 12" />
      <path
        d="M24 44c4-4 2-8 5-11s6-3 7-7c1 4 4 5 4 9s-3 6-3 9"
        opacity="0.6"
      />
      <path d="M16 50h32" strokeDasharray="2 4" />
    </g>
  ),

  audio: (
    <g>
      <rect x="18" y="26" width="14" height="20" rx="2" />
      <circle cx="25" cy="40" r="3" />
      <circle cx="25" cy="31" r="1.4" className="fill-[#0B0A0F] stroke-none" />
      <path d="M38 30c4 4 4 8 0 12M44 26c7 7 7 15 0 22" />
      <path d="M46 20c-2-3-5-4-6-3 1 2 0 3-1 4-2 1-3 3-2 4 2-1 3 0 4 1 1-1 3-1 4 0 2 1 4 0 5-1l2-4z" />
    </g>
  ),

  whoosh: (
    <g>
      <path d="M34 8L18 36h10l-4 20 18-30H32z" />
      <path d="M12 14l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
      <path d="M52 40l1.5 4 4 1.5-4 1.5L52 51l-1.5-4-4-1.5 4-1.5z" />
    </g>
  ),

  template: (
    <g>
      <rect x="16" y="14" width="32" height="38" rx="2" />
      <path d="M16 22h32" />
      <rect x="20" y="26" width="12" height="10" />
      <path d="M36 26h8M36 30h8M36 34h5" />
      <path d="M20 40h24" strokeDasharray="2 3" />
    </g>
  ),

  "social-kit": (
    <g>
      <rect x="22" y="12" width="20" height="42" rx="4" />
      <path d="M29 16h6" />
      <circle cx="32" cy="26" r="4" />
      <path d="M26 38h12" strokeDasharray="2 3" />
      <path d="M14 20l-2-2M50 20l2-2M14 48l-2 2M50 48l2 2" />
    </g>
  ),
} satisfies Record<string, React.ReactNode>;
