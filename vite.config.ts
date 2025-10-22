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
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          "polkadot-vendor": [
            "polkadot-api",
            "@polkadot-api/smoldot",
            "@polkadot/util",
            "@polkadot/util-crypto",
          ],
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
    },
  },
  worker: {
    format: "es",
    plugins: () => [],
  },
});

