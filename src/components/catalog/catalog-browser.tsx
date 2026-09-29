"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useSite } from "@/components/providers/site-provider";
import { CATEGORIES, CATEGORY_META, PRODUCTS } from "@/lib/products";
import { ProductGrid } from "@/components/product/product-card";
import { useDict } from "@/components/providers/site-provider";

const SORTS = ["featured", "newest", "priceAsc", "priceDesc", "rating"] as const;
type Sort = (typeof SORTS)[number];

export function CatalogBrowser() {
  const dict = useDict();
  const { locale, currency } = useSite();
  const router = useRouter();
  const params = useSearchParams();

  const query = params.get("q") ?? "";
  const categoryParam = params.get("categorie") ?? params.get("category") ?? "";
  const sortParam = (params.get("tri") ?? "featured") as Sort;

  const category = CATEGORIES.find((c) => c === categoryParam);
  const sort = SORTS.includes(sortParam) ? sortParam : "featured";

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = PRODUCTS.filter((product) => {
      if (category && product.category !== category) return false;
      if (!needle) return true;
      const copy = product.locale[locale];
      return (
        copy.title.toLowerCase().includes(needle) ||
        copy.tagline.toLowerCase().includes(needle) ||
        copy.description.toLowerCase().includes(needle)
      );
    });

    const sorted = [...filtered];
    switch (sort) {
      case "newest":
        sorted.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
        break;
      case "priceAsc":
        sorted.sort((a, b) => a.prices[currency] - b.prices[currency]);
        break;
      case "priceDesc":
        sorted.sort((a, b) => b.prices[currency] - a.prices[currency]);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort(
          (a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating,
        );
    }
    return sorted;
  }, [category, query, sort, locale, currency]);

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const search = next.toString();
    router.replace(search ? `?${search}` : "?", { scroll: false });
  }

  const hasFilters = Boolean(query || category || sort !== "featured");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="catalog-search" className="sr-only">
            {dict.catalog.searchLabel}
          </label>
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bone/40"
          />
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(event) => update("q", event.target.value)}
            placeholder={dict.catalog.search}
            className="w-full rounded-full border border-bone/15 bg-ink-2/70 py-3 pl-11 pr-4 text-sm text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={16}
            aria-hidden="true"
            className="text-bone/40"
          />
          <label htmlFor="catalog-sort" className="sr-only">
            {dict.catalog.sort}
          </label>
          <select
            id="catalog-sort"
            value={sort}
            onChange={(event) => update("tri", event.target.value)}
            className="cursor-pointer rounded-full border border-bone/15 bg-ink-2/70 px-4 py-3 text-sm text-bone focus:border-ember focus:outline-none"
          >
            {SORTS.map((option) => (
              <option key={option} value={option} className="bg-ink-2">
                {dict.catalog.sortOptions[option]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => update("categorie", "")}
          aria-pressed={!category}
          className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
            !category
              ? "border-ember bg-ember text-ink"
              : "border-bone/15 text-bone/60 hover:border-ember hover:text-ember"
          }`}
        >
          {dict.catalog.allCategories}
        </button>
        {CATEGORIES.map((item) => {
          const active = item === category;
          return (
            <button
              key={item}
              type="button"
              onClick={() => update("categorie", item)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                active
                  ? "border-ember bg-ember text-ink"
                  : "border-bone/15 text-bone/60 hover:border-ember hover:text-ember"
              }`}
            >
              {CATEGORY_META[item][locale].label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-bone/10 pt-5">
        <p className="text-sm text-bone/50">
          <span className="font-semibold text-bone">{results.length}</span>{" "}
          {dict.common.results}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => router.replace("?", { scroll: false })}
            className="flex items-center gap-1.5 text-xs text-bone/50 transition-colors hover:text-ember"
          >
            <X size={13} aria-hidden="true" />
            {dict.catalog.filters}
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="card-spooky flex flex-col items-center gap-3 rounded-2xl px-6 py-20 text-center">
          <span className="text-5xl" aria-hidden="true">
            🕸️
          </span>
          <p className="text-bone/70">{dict.common.noResults}</p>
        </div>
      ) : (
        <ProductGrid products={results} />
      )}
    </div>
  );
}
