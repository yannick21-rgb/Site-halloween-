import type { NextConfig } from "next";

/**
 * Hôtes autorisés pour les images distantes.
 *
 * `PRODUCT_IMAGES` peut pointer vers un fichier de `public/produits/` (aucune
 * configuration nécessaire) ou vers une image hébergée ailleurs. Dans ce
 * dernier cas, ajoute ici le domaine : un motif trop large ouvrirait la porte
 * à l'utilisation abusive de l'optimiseur d'images.
 */
const IMAGE_HOSTS = [
  "cdn.sanity.io",
  "images.unsplash.com",
  "res.cloudinary.com",
];

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    // Formats modernes : le navigateur choisit ce qu'il sait décoder.
    formats: ["image/avif", "image/webp"],
    // Les visuels produits sont servis dans des cadres 4/3 et carrés ; inutile
    // de générer des largeurs que le design n'utilise jamais.
    deviceSizes: [640, 828, 1080, 1200, 1600],
    imageSizes: [96, 160, 256, 384],
    remotePatterns: IMAGE_HOSTS.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
  },
};

export default nextConfig;
