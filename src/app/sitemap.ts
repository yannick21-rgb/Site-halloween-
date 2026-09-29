import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

const BASE_URL = SITE_URL;

const STATIC_PATHS = [
  "",
  "/produits",
  "/a-propos",
  "/faq",
  "/legal/mentions",
  "/legal/cgv",
  "/legal/confidentialite",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    entries.push({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: path === "" || path === "/produits" ? "daily" : "monthly",
      priority: path === "" ? 1 : path === "/produits" ? 0.9 : 0.4,
      alternates: {
        languages: {
          fr: `${BASE_URL}${path}`,
          en: `${BASE_URL}/en${path}`,
        },
      },
    });
  }

  for (const product of PRODUCTS) {
    entries.push({
      url: `${BASE_URL}/produits/${product.slug}`,
      lastModified: new Date(product.publishedAt),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${BASE_URL}/produits/${product.slug}`,
          en: `${BASE_URL}/en/produits/${product.slug}`,
        },
      },
    });
  }

  return entries;
}
