import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import { visualizer } from "rollup-plugin-visualizer";
import basicSsl from "@vitejs/plugin-basic-ssl";
import fs from "fs";
import path from "path";

/// <reference types="vite/client" />

const projectRootDir = path.resolve(__dirname);
const srcFiles = fs.readdirSync(path.join(projectRootDir, "src"));
const srcFolders = srcFiles.filter((fileName) => {
  const fileStat = fs.statSync(path.join(projectRootDir, "src", fileName));
  return fileStat.isDirectory();
});
const alias = srcFolders.reduce((acc, folderName) => {
  acc[folderName] = path.join(projectRootDir, "src", folderName);
  return acc;
}, {});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let ghPages;
  // if (mode === "production") {
  //   ghPages = "https://wascoyur.github.io/ishop/";
  // }
  return {
    base: ghPages,
    resolve: {
      alias,
    },
    plugins: [
      react(),
      checker({
        // e.g. use TypeScript check
        typescript: true,
      }),
      visualizer({
        emitFile: false,
        filename: "stats.html",
      }),
      basicSsl(),
    ],
    server: {
      open: true,
      cors: false,
    },
    css: {
      modules: {
        localsConvention: "dashesOnly",
        generateScopedName: (name: string, filePath: string): string => {
          const [, fileName] = filePath.split("/").reverse();
          return `${fileName}_${name}`;
        },
      },
    },
  };
});
