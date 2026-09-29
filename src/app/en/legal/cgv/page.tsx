import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { LEGAL_CONTENT } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Terms and conditions of sale" };

export default function Page() {
  const content = LEGAL_CONTENT.en.cgv;
  return <LegalPage locale="en" slug="cgv" title={content.title} sections={content.sections} />;
}
