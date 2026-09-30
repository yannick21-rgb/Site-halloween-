"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { AtSign, Camera, Code, Play } from "lucide-react";
import { useSite } from "@/components/providers/site-provider";
import { href } from "@/lib/i18n";
import { CATEGORIES, CATEGORY_META } from "@/lib/products";
import { SOCIALS } from "@/lib/site";
import { NewsletterForm } from "@/components/home/newsletter-form";

// lucide-react v1 a retiré les logos de marque : on utilise des icônes génériques.
const SOCIAL_ICONS = {
  instagram: Camera,
  x: AtSign,
  youtube: Play,
  github: Code,
} as const;

/**
 * Hauteur de la première ligne du pied de page.
 *
 * Les quatre colonnes doivent démarrer sur la même ligne de base, sinon le
 * grand logotype de la colonne 1 décale visuellement les trois titres
 * « majuscules » des autres colonnes : sur PC, le décalage est évident. On
 * impose donc une boîte de hauteur fixe, centrée verticalement, partagée par
 * le logotype et par tous les titres de colonne.
 */
const FIRST_ROW_CLASS = "flex h-7 items-center";

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h3
      className={`${FIRST_ROW_CLASS} text-xs font-bold uppercase tracking-[0.2em] text-ember`}
    >
      {children}
    </h3>
  );
}

export function Footer() {
  const { dict, locale } = useSite();
  const year = 2026;

  return (
    <footer className="mt-24 border-t border-bone/10 bg-ink-2/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid items-start gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link href={href(locale, "/")} className={FIRST_ROW_CLASS}>
              <span className="font-display text-2xl leading-none text-bone">
                <span className="text-ember-gradient">Halloween</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm text-bone/50">{dict.siteTagline}</p>
            <div className="mt-2 flex gap-2">
              {SOCIALS.filter((social) => social.url).map((social) => {
                const Icon = SOCIAL_ICONS[social.key];
                return (
                  <a
                    key={social.key}
                    href={social.url ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-full border border-bone/15 p-2 text-bone/60 transition-colors hover:border-ember hover:text-ember"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav className="flex flex-col gap-3" aria-label={dict.footer.shop}>
            <FooterHeading>{dict.footer.shop}</FooterHeading>
            <ul className="flex flex-col gap-2 text-sm text-bone/55">
              <li>
                <Link
                  href={href(locale, "/produits")}
                  className="transition-colors hover:text-ember"
                >
                  {dict.catalog.title}
                </Link>
              </li>
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    href={`${href(locale, "/produits")}?categorie=${category}`}
                    className="transition-colors hover:text-ember"
                  >
                    {CATEGORY_META[category][locale].label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col gap-3" aria-label={dict.footer.help}>
            <FooterHeading>{dict.footer.help}</FooterHeading>
            <ul className="flex flex-col gap-2 text-sm text-bone/55">
              <li>
                <Link
                  href={href(locale, "/faq")}
                  className="transition-colors hover:text-ember"
                >
                  {dict.faq.title}
                </Link>
              </li>
              <li>
                <Link
                  href={href(locale, "/a-propos")}
                  className="transition-colors hover:text-ember"
                >
                  {dict.about.title}
                </Link>
              </li>
            </ul>

            <h3 className="mt-4 flex h-7 items-center text-xs font-bold uppercase tracking-[0.2em] text-ember">
              {dict.footer.legal}
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-bone/55">
              <li>
                <Link
                  href={href(locale, "/legal/mentions")}
                  className="transition-colors hover:text-ember"
                >
                  {dict.legal.mentionsTitle}
                </Link>
              </li>
              <li>
                <Link
                  href={href(locale, "/legal/cgv")}
                  className="transition-colors hover:text-ember"
                >
                  {dict.legal.cgvTitle}
                </Link>
              </li>
              <li>
                <Link
                  href={href(locale, "/legal/confidentialite")}
                  className="transition-colors hover:text-ember"
                >
                  {dict.legal.privacyTitle}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <FooterHeading>{dict.footer.newsletter}</FooterHeading>
            <p className="text-sm text-bone/50">{dict.home.newsletterText}</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-bone/10 pt-6 text-xs text-bone/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Halloween. {dict.footer.rights}
          </p>
          <p className="sm:text-right">{dict.footer.payment}</p>
        </div>
      </div>
    </footer>
  );
}
