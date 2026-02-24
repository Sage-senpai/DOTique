import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    nodePolyfills({
      protocolImports: true,
      globals: {
        Buffer: true,
        process: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: ["buffer", "events", "stream", "util"],
    exclude: ["@polkadot-api/descriptors"],
  },
  build: {
    target: "esnext",
    sourcemap: false,
    minify: "esbuild",
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Polkadot chain layer
          "polkadot-vendor": [
            "polkadot-api",
            "@polkadot-api/smoldot",
            "@polkadot/util",
            "@polkadot/util-crypto",
            "@polkadot/types",
          ],
          // 3D / canvas (heaviest — lazily loaded)
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          // Animation libs
          "animation-vendor": ["framer-motion", "gsap"],
          // Supabase + data
          "supabase-vendor": ["@supabase/supabase-js"],
          // Forms + UI utilities
          "ui-vendor": ["react-hook-form", "zustand", "@tanstack/react-query"],
        },
      },
    },
  },
  worker: {
    format: "es",
    plugins: () => [],
  },
});

