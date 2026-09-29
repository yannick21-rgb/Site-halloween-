import Link from "next/link";
import { getDictionary, href, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { FaqAccordion } from "@/components/product/faq-accordion";

export function AboutPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.28em] text-ember">
          {dict.siteName}
        </span>
        <h1 className="mt-3 text-4xl text-bone sm:text-5xl">
          {dict.about.title}
        </h1>
      </Reveal>

      <div className="mt-10 flex flex-col gap-6">
        {dict.about.body.map((paragraph) => (
          <Reveal key={paragraph.slice(0, 32)}>
            <p className="text-lg leading-relaxed text-bone/70">{paragraph}</p>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            href={href(locale, "/produits")}
            className="rounded-full bg-ember px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-ember-2"
          >
            {dict.catalog.title}
          </Link>
          <Link
            href={href(locale, "/faq")}
            className="rounded-full border border-bone/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-bone transition-colors hover:border-ember hover:text-ember"
          >
            {dict.faq.title}
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

export function FaqPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.28em] text-ember">
          {dict.nav.faq}
        </span>
        <h1 className="mt-3 text-4xl text-bone sm:text-5xl">{dict.faq.title}</h1>
        <p className="mt-3 text-bone/55">{dict.faq.subtitle}</p>
      </Reveal>

      <div className="mt-12">
        <FaqAccordion items={dict.faq.items} />
      </div>
    </div>
  );
}
