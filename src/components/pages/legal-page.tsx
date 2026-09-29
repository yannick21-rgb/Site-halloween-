import Link from "next/link";
import { getDictionary, href, type Locale } from "@/lib/i18n";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export function LegalPage({
  locale,
  slug,
  title,
  sections,
}: {
  locale: Locale;
  slug: "mentions" | "cgv" | "confidentialite";
  title: string;
  sections: LegalSection[];
}) {
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <span className="text-xs uppercase tracking-[0.28em] text-ember">
        {dict.legal.backHome}
      </span>
      <h1 className="mt-3 text-4xl text-bone sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-bone/40">
        {dict.legal.updated} : 1ᵉʳ septembre 2026
      </p>

      <nav className="mt-8 flex flex-wrap gap-2 border-b border-bone/10 pb-8">
        {(["mentions", "cgv", "confidentialite"] as const).map((item) => (
          <Link
            key={item}
            href={href(locale, `/legal/${item}`)}
            aria-current={item === slug ? "page" : undefined}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
              item === slug
                ? "border-ember bg-ember text-ink"
                : "border-bone/15 text-bone/60 hover:border-ember hover:text-ember"
            }`}
          >
            {dict.legal[
              item === "mentions"
                ? "mentionsTitle"
                : item === "cgv"
                  ? "cgvTitle"
                  : "privacyTitle"
            ]}
          </Link>
        ))}
      </nav>

      <div className="mt-10 flex flex-col gap-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl text-bone">{section.heading}</h2>
            <div className="mt-3 flex flex-col gap-3">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-sm leading-relaxed text-bone/65"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {section.list && (
              <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm text-bone/65">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
