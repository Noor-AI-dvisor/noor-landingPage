import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  // Every host (Cloudflare Workers/Pages, custom domains, etc.) serves this
  // from the domain root. Only the GitHub Pages deploy (see package.json's
  // "predeploy" script) needs the /noor-landingPage/ subpath.
  base: process.env.GH_PAGES ? "/noor-landingPage/" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
