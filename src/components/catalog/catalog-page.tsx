import { Suspense } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";

export function CatalogPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.28em] text-ember">
          {dict.siteName}
        </span>
        <h1 className="text-4xl text-bone sm:text-5xl">{dict.catalog.title}</h1>
        <p className="max-w-2xl text-bone/55">{dict.catalog.subtitle}</p>
      </header>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="skeleton h-96 rounded-2xl"
                aria-hidden="true"
              />
            ))}
          </div>
        }
      >
        <CatalogBrowser />
      </Suspense>
    </div>
  );
}
