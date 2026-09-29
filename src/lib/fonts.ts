import { Creepster, Inter } from "next/font/google";

export const fontDisplay = Creepster({
  variable: "--font-creepster",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const fontBody = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const fontClass = `${fontDisplay.variable} ${fontBody.variable}`;
