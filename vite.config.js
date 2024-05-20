import { defineConfig } from "vite";
import { resolve } from "path";
// import html from '@rollup/plugin-html';
const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // main:"src/index.html",
        main: resolve(root, "./index.html"),
        primerPaso:(root, "pages", "frontPrimerPaso", "index.html"),
        act1: resolve(root, "pages", "actividad001", "act.html"),
      }
    },
    // plugins: [
    //   html({
    //     title: 'front_bloques_dhs',
    //     template: 'src/index.html' 
    //   })
    // ]
  },
    assetsDir: "img",
    assetsInclude: [
      "./interpreter/acorn.js",
      "./interpreter/interpreter.js",
      "**/*.css?type=text/css",
    ],
    base: "/front_bloques_dhs/",
});
