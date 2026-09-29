import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { LEGAL_CONTENT } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Mentions légales" };

export default function Page() {
  const content = LEGAL_CONTENT.fr.mentions;
  return <LegalPage locale="fr" slug="mentions" title={content.title} sections={content.sections} />;
}
