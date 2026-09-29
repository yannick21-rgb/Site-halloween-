import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { LEGAL_CONTENT } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Legal notice" };

export default function Page() {
  const content = LEGAL_CONTENT.en.mentions;
  return <LegalPage locale="en" slug="mentions" title={content.title} sections={content.sections} />;
}
