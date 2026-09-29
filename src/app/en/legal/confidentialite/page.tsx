import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { LEGAL_CONTENT } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Privacy policy" };

export default function Page() {
  const content = LEGAL_CONTENT.en.confidentialite;
  return <LegalPage locale="en" slug="confidentialite" title={content.title} sections={content.sections} />;
}
