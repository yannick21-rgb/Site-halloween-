import type { ReactNode } from "react";
import type { Product } from "@/lib/products";
import type { Dictionary } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";

export function Badge({
  children,
  tone = "ember",
}: {
  children: ReactNode;
  tone?: "ember" | "violet" | "blood" | "neutral";
}) {
  const tones = {
    ember: "bg-ember text-ink",
    violet: "bg-violet text-ink",
    blood: "bg-blood text-bone",
    neutral: "bg-bone/10 text-bone/80 border border-bone/15",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Stars({
  rating,
  reviews,
  label,
}: {
  rating: number;
  reviews?: number;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-bone/60">
      <span className="flex gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={i < Math.round(rating) ? "text-ember" : "text-bone/25"}
          >
            ★
          </span>
        ))}
      </span>
      <span className="sr-only">{rating} / 5</span>
      <span aria-hidden="true">{rating.toFixed(1)}</span>
      {reviews !== undefined && (
        <span aria-hidden="true">
          ({reviews} {label ?? ""})
        </span>
      )}
    </div>
  );
}

export function PriceTag({
  product,
  currency,
  dict,
  size = "md",
}: {
  product: Product;
  currency: "EUR" | "USD";
  dict: Dictionary;
  size?: "md" | "lg";
}) {
  const hasDiscount = Boolean(product.compareAt);
  const scale = size === "lg" ? "text-4xl" : "text-2xl";

  return (
    <div className="flex flex-wrap items-baseline gap-2.5">
      {hasDiscount && (
        <span className="text-sm text-bone/40 line-through">
          {formatPrice(product.compareAt!.EUR, "EUR")}
        </span>
      )}
      <span className={`font-display ${scale} text-bone leading-none`}>
        {formatPrice(product.prices[currency], currency)}
      </span>
      {product.badge && (
        <Badge tone={product.badge === "promo" ? "blood" : "ember"}>
          {dict.common[product.badge]}
        </Badge>
      )}
    </div>
  );
}
