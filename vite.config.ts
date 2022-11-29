import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    coverage: {
      provider: "istanbul", // or 'c8'
      reporter: ["text", "json", "html"],
    },
    environment: "happy-dom", // or 'jsdom'
    setupFiles: "./src/tests/setup.ts",
  },
});
