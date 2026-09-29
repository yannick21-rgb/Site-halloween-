import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/info-pages";

export const metadata: Metadata = { title: "Questions fréquentes" };

export default function Page() {
  return <FaqPage locale="fr" />;
}
