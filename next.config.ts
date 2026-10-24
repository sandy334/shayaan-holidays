import type { NextConfig } from "next";

/**
 * GITHUB_PAGES=true builds a static export for GitHub Pages (see scripts/deploy-pages.sh).
 * PAGES_BASE_PATH is "/<repo>" for username.github.io/<repo>, or "" for a custom domain.
 * Normal builds (Vercel, `npm run start`) are unaffected.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.PAGES_BASE_PATH ?? "/shayaan-holidays";

const nextConfig: NextConfig = isPages
  ? {
      output: "export",
      basePath,
      trailingSlash: true,
      env: { NEXT_PUBLIC_BASE_PATH: basePath },
      // Static hosting has no image optimiser; the loader just prefixes the base path.
      images: { loader: "custom", loaderFile: "./src/lib/static-image-loader.ts" },
    }
  : {};

export default nextConfig;
