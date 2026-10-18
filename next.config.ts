import type { NextConfig } from "next";

/**
 * Sitio servido como export estático bajo el subdirectorio /aviat
 * (ej: https://cassdev.com.ar/aviat).
 *
 * - output: "export"  → genera HTML/CSS/JS estático en la carpeta `out/`.
 * - basePath/assetPrefix → hacen que todas las rutas y assets cuelguen de /aviat.
 * - images.unoptimized → requerido por el export estático (sin servidor de imágenes).
 * - trailingSlash → genera carpetas con index.html, más amigable para Apache/cPanel.
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/aviat",
  assetPrefix: "/aviat",
  distDir: "dist",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
