import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

/// <reference types="vite/client" />

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://wascoyur.github.io/ishop/",
  plugins: [
    react(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
  ],
});
