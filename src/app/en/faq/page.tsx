import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/info-pages";

export const metadata: Metadata = { title: "Frequently asked questions" };

export default function Page() {
  return <FaqPage locale="en" />;
}
