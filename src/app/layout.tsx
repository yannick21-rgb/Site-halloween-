import "./globals.css";
import { fontClass } from "@/lib/fonts";
import { SiteShell, buildMetadata } from "@/components/layout/site-shell";

export const metadata = buildMetadata("fr");

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="fr" className={fontClass}>
      <body className="min-h-screen antialiased">
        <SiteShell locale="fr">{children}</SiteShell>
      </body>
    </html>
  );
}
