import "../globals.css";
import { fontClass } from "@/lib/fonts";
import { SiteShell, buildMetadata } from "@/components/layout/site-shell";

export const metadata = buildMetadata("en");

export default function RootLayout({
  children,
}: LayoutProps<"/en">) {
  return (
    <html lang="en" className={fontClass}>
      <body className="min-h-screen antialiased">
        <SiteShell locale="en">{children}</SiteShell>
      </body>
    </html>
  );
}
