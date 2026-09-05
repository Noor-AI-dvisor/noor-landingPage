import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  // Cloudflare Pages builds set CF_PAGES=1 and serve from the domain root;
  // GitHub Pages serves this repo from a /noor-landingPage/ subpath.
  base: process.env.CF_PAGES ? "/" : "/noor-landingPage/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
