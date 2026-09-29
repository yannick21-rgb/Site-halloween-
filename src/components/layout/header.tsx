"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useSite } from "@/components/providers/site-provider";
import { useCart } from "@/components/cart/cart-provider";
import { href } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/button";
import { CurrencySwitcher, LanguageSwitcher } from "@/components/layout/switchers";
import { AmbienceToggles } from "@/components/ambient/ambience-toggles";

export function AnnouncementBar() {
  const { dict } = useSite();
  return (
    <div className="relative overflow-hidden border-b border-ember/20 bg-ember/10 text-center">
      <p className="px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-ember sm:text-xs">
        {dict.announcement}
      </p>
    </div>
  );
}

export function Header() {
  const { dict, locale } = useSite();
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: href(locale, "/produits"), label: dict.nav.products },
    { href: `${href(locale, "/")}#categories`, label: dict.nav.categories },
    { href: href(locale, "/a-propos"), label: dict.nav.about },
    { href: href(locale, "/faq"), label: dict.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-bone/10 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href={href(locale, "/")}
          className="font-display text-2xl leading-none text-bone transition-colors hover:text-ember"
        >
          <span className="text-ember-gradient">Halloween</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((link, i) => (
            <Link
              key={`${link.href}-${i}`}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm text-bone/70 transition-colors hover:bg-bone/5 hover:text-ember"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
            <CurrencySwitcher />
          </div>

          <div className="hidden sm:block">
            <AmbienceToggles />
          </div>

          <button
            type="button"
            onClick={open}
            aria-label={`${dict.cart.title} (${count})`}
            className="relative rounded-full border border-bone/15 p-2.5 text-bone transition-colors hover:border-ember hover:text-ember"
          >
            <ShoppingBag size={18} aria-hidden="true" />
            {count > 0 && (
              <span
                key={count}
                className="pop-in absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ember px-1 text-[10px] font-bold text-ink"
              >
                {count}
              </span>
            )}
          </button>

          <ButtonLink
            href={href(locale, "/produits")}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {dict.common.viewAll}
          </ButtonLink>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={dict.nav.menu}
            className="rounded-full border border-bone/15 p-2.5 text-bone lg:hidden"
          >
            {menuOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="slide-down border-t border-bone/10 bg-ink-2 px-4 py-5 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((link, i) => (
              <Link
                key={`${link.href}-m-${i}`}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base text-bone/80 transition-colors hover:bg-bone/5 hover:text-ember"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-4 border-t border-bone/10 pt-5">
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <CurrencySwitcher />
            </div>
            <AmbienceToggles />
          </div>
        </div>
      )}
    </header>
  );
}
