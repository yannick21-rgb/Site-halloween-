import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { LEGAL_CONTENT } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function Page() {
  const content = LEGAL_CONTENT.fr.confidentialite;
  return <LegalPage locale="fr" slug="confidentialite" title={content.title} sections={content.sections} />;
}
