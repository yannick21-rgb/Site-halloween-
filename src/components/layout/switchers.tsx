"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "@/components/providers/site-provider";
import { CURRENCIES, type Currency } from "@/lib/format";
import { LOCALES, href, stripLocale, type Locale } from "@/lib/i18n";

const LOCALE_LABEL: Record<Locale, string> = { fr: "FR", en: "EN" };

export function LanguageSwitcher() {
  const { locale } = useSite();
  const pathname = usePathname();
  const path = stripLocale(pathname ?? "/");

  return (
    <div
      className="flex items-center rounded-full border border-bone/15 p-0.5"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={href(code, path)}
            hrefLang={code}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors ${
              active
                ? "bg-ember text-ink"
                : "text-bone/55 hover:text-ember"
            }`}
          >
            {LOCALE_LABEL[code]}
          </Link>
        );
      })}
    </div>
  );
}

export function CurrencySwitcher() {
  const { currency, setCurrency } = useSite();

  return (
    <div
      className="flex items-center rounded-full border border-bone/15 p-0.5"
      role="group"
      aria-label="Currency"
    >
      {CURRENCIES.map((code) => {
        const active = code === currency;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setCurrency(code as Currency)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors ${
              active ? "bg-bone text-ink" : "text-bone/55 hover:text-ember"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
