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
        Buffer: true, // Needed for Polkadot.js
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
  },
  build: {
    target: "esnext",
  },
});
