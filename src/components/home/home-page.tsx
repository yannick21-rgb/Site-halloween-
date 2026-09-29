import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  Candy,
  Clapperboard,
  Flame,
  Gift,
  Lamp,
  LayoutTemplate,
  Printer,
  Shirt,
  Sparkles,
  Wand,
  Zap,
  ShieldCheck,
  Headset,
  BadgeCheck,
  Download,
} from "lucide-react";
import { CATEGORIES, CATEGORY_META, PRODUCTS, getFeaturedProducts } from "@/lib/products";
import { href, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { ProductGrid } from "@/components/product/product-card";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { StaggerList } from "@/components/ui/motion";
import { ButtonLink } from "@/components/ui/button";
import { Countdown } from "@/components/home/countdown";
import { ProductVisual } from "@/components/product/product-visual";

/**
 * Table des icônes de catégorie.
 *
 * `Record<string, LucideIcon>` avec une valeur de repli : une catégorie
 * éditoriale inconnue affiche une étincelle au lieu de faire planter la page.
 */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Candy,
  Clapperboard,
  AudioLines,
  Flame,
  Gift,
  Lamp,
  LayoutTemplate,
  Printer,
  Shirt,
  Sparkles,
  Wand,
};

function categoryIcon(name: string): LucideIcon {
  return CATEGORY_ICONS[name] ?? Sparkles;
}

const FEATURED_GLYPHS = ["ghost", "skull", "spider", "cat"] as const;

/** Bandeau défilant : deux fois la même liste pour un défilement sans fin. */
const MARQUEE_GLYPHS = [
  "\u{1F383}",
  "\u{1F47B}",
  "\u{1F480}",
  "\u{1F987}",
  "\u{1F577}\u{FE0F}",
  "\u{1F408}",
  "\u{1F56F}\u{FE0F}",
  "\u{1F319}",
];

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const featured = getFeaturedProducts();
  const steps = [
    { title: dict.home.how.step1, text: dict.home.how.step1Text },
    { title: dict.home.how.step2, text: dict.home.how.step2Text },
    { title: dict.home.how.step3, text: dict.home.how.step3Text },
  ];
  const trust = [
    {
      icon: Download,
      title: dict.home.trust.instantTitle,
      text: dict.home.trust.instantText,
    },
    {
      icon: ShieldCheck,
      title: dict.home.trust.licenseTitle,
      text: dict.home.trust.licenseText,
    },
    {
      icon: Headset,
      title: dict.home.trust.supportTitle,
      text: dict.home.trust.supportText,
    },
    {
      icon: BadgeCheck,
      title: dict.home.trust.qualityTitle,
      text: dict.home.trust.qualityText,
    },
  ];
  const stats = [
    { value: PRODUCTS.length, label: dict.home.stats.products },
    { value: "4,9", label: dict.home.stats.rating },
    { value: "2 400+", label: dict.home.stats.customers },
    { value: "< 60s", label: dict.home.stats.instant },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
        >
          <div className="absolute left-[8%] top-16 animate-float text-7xl opacity-15">
            🎃
          </div>
          <div
            className="absolute right-[10%] top-32 hidden animate-float text-6xl opacity-15 sm:block"
            style={{ animationDelay: "1.5s" }}
          >
            👻
          </div>
          <div
            className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 animate-float text-5xl opacity-10 lg:block"
            style={{ animationDelay: "3s" }}
          >
            🕷️
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <StaggerList className="flex flex-col items-start gap-7" delay={80} step={85}>
              <span className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ember">
                <Zap size={13} aria-hidden="true" />
                {dict.home.heroKicker}
              </span>

              <h1 className="text-5xl leading-[1.02] text-bone sm:text-6xl lg:text-7xl">
                <span className="text-ember-gradient neon">
                  {dict.home.heroTitle}
                </span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-bone/65">
                {dict.home.heroSubtitle}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={href(locale, "/produits")} size="lg">
                  {dict.home.heroCta}
                  <ArrowRight size={18} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  href={href(locale, "/produits") + "?tri=newest"}
                  variant="secondary"
                  size="lg"
                >
                  {dict.home.heroCtaSecondary}
                </ButtonLink>
              </div>

              <dl className="mt-4 grid w-full grid-cols-2 gap-6 border-t border-bone/10 pt-7 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-3xl text-bone">
                      {stat.value}
                    </dd>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-bone/45">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </dl>
            </StaggerList>

            <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4">
              {FEATURED_GLYPHS.map((glyph, index) => {
                const product = featured[index % featured.length];
                return (
                  <div
                    key={glyph}
                    className={`card-spooky hover-lift rise-on-mount overflow-hidden rounded-2xl ${
                      index % 2 === 1 ? "translate-y-6" : ""
                    }`}
                    style={{
                      "--rise-delay": `${500 + index * 110}ms`,
                      "--rise-y": "34px",
                    } as CSSProperties}
                  >
                    <Link
                      href={href(locale, `/produits/${product.slug}`)}
                      className="block"
                    >
                      <ProductVisual
                        product={product}
                        sizes="(min-width: 1024px) 20vw, 40vw"
                        className="aspect-square w-full transition-transform duration-500 hover:scale-105"
                      />
                      <span className="block truncate px-3 py-2.5 text-xs text-bone/70">
                        {product.locale[locale].title}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Countdown />

      {/* CATÉGORIES */}
      <section
        id="categories"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            kicker={dict.nav.categories}
            title={dict.home.categoriesTitle}
            subtitle={dict.home.categoriesSubtitle}
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, index) => {
            const meta = CATEGORY_META[category][locale];
            const Icon = categoryIcon(meta.icon);
            const count = PRODUCTS.filter(
              (p) => p.category === category,
            ).length;

            return (
              <Reveal key={category} delay={index * 70}>
                <Link
                  href={`${href(locale, "/produits")}?categorie=${category}`}
                  className="card-spooky group flex h-full flex-col gap-3 rounded-2xl p-6"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember/12 text-ember transition-colors group-hover:bg-ember group-hover:text-ink">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="text-xl text-bone">{meta.label}</h3>
                  <p className="text-sm text-bone/55">{meta.description}</p>
                  <span className="mt-auto pt-3 text-xs uppercase tracking-[0.18em] text-ember">
                    {count} {dict.common.results}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* BANDEAU DÉFILANT */}
      <div
        className="overflow-hidden border-y border-ember/20 bg-ember/5 py-4"
        aria-hidden="true"
      >
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
          {[...MARQUEE_GLYPHS, ...MARQUEE_GLYPHS].map((glyph, index) => (
            <span
              key={index}
              className="font-display text-2xl text-ember/50 sm:text-3xl"
            >
              {glyph}
            </span>
          ))}
        </div>
      </div>

      {/* PRODUITS MIS EN AVANT */}
      <section className="relative border-y border-bone/10 bg-ink-2/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              kicker={dict.common.bestseller}
              title={dict.home.featuredTitle}
              subtitle={dict.home.featuredSubtitle}
            />
          </Reveal>
          <ProductGrid products={featured} />
          <div className="mt-12 flex justify-center">
            <ButtonLink href={href(locale, "/produits")} variant="secondary" size="lg">
              {dict.common.viewAll}
              <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker={dict.home.howKicker}
            title={dict.home.howTitle}
            subtitle={dict.home.howSubtitle}
          />
        </Reveal>

        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 90}>
              <li className="card-spooky relative h-full overflow-hidden rounded-2xl p-7">
                <span
                  className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl text-bone/[0.06]"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div className="relative flex flex-col gap-3">
                  <span className="font-display text-4xl text-ember">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl text-bone">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-bone/55">
                    {step.text}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* CONFIANCE */}
      <section className="border-t border-bone/10 bg-web/30">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trust.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 70}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-bone/10 p-6">
                <Icon size={24} className="text-ember" aria-hidden="true" />
                <h3 className="text-base font-semibold text-bone">{title}</h3>
                <p className="text-sm text-bone/50">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
