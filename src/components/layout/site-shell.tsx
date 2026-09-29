import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { SiteProvider } from "@/components/providers/site-provider";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { AmbientLayer } from "@/components/ambient/ambient-layer";
import { AnnouncementBar, Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: `${dict.siteName} — ${dict.siteTagline}`,
      default: `${dict.siteName} — ${dict.siteTagline}`,
      template: `%s · ${dict.siteName}`,
    },
    description: dict.home.heroSubtitle,
    keywords: [
      "Halloween",
      "produits digitaux",
      "illustrations Halloween",
      "LUTs horreur",
      "ambiances audio Halloween",
      "templates Canva Halloween",
    ],
    alternates: {
      canonical: locale === "fr" ? "/" : "/en",
      languages: { fr: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: dict.siteName,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      title: `${dict.siteName} — ${dict.siteTagline}`,
      description: dict.home.heroSubtitle,
      url: locale === "fr" ? "/" : "/en",
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.siteName} — ${dict.siteTagline}`,
      description: dict.home.heroSubtitle,
    },
    robots: { index: true, follow: true },
  };
}

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const dict = getDictionary(locale);

  return (
    <SiteProvider locale={locale} dict={dict}>
      <CartProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-200 focus:rounded-full focus:bg-ember focus:px-4 focus:py-2 focus:text-ink"
        >
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <div className="flex min-h-screen flex-col">
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <CartDrawer />
        <AmbientLayer />
      </CartProvider>
    </SiteProvider>
  );
}
