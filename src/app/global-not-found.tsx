import "./globals.css";
import type { Metadata } from "next";
import { fontClass } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "404 · Halloween",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontClass}>
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center antialiased">
        <span className="font-display text-8xl text-ember-gradient" aria-hidden="true">
          404
        </span>
        <h1 className="text-3xl text-bone sm:text-4xl">Cette page a été dévorée</h1>
        <p className="max-w-md text-bone/60">
          Le lien est cassé, ou la page n&apos;a jamais existé. Il reste 10 produits à
          découvrir.
        </p>
        <a
          href="/produits"
          className="rounded-full bg-ember px-7 py-3.5 font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-ember-2"
        >
          Voir les produits
        </a>
        <a href="/" className="text-sm text-bone/45 underline-offset-4 hover:text-ember hover:underline">
          Retour à l&apos;accueil
        </a>
      </body>
    </html>
  );
}
