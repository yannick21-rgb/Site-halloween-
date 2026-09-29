import type { Metadata } from "next";
import { OrderSuccessPage } from "@/components/checkout/order-success-page";

export const metadata: Metadata = {
  title: "Commande confirmée",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OrderSuccessPage />;
}
