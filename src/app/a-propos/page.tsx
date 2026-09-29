import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/info-pages";

export const metadata: Metadata = { title: "À propos" };

export default function Page() {
  return <AboutPage locale="fr" />;
}
