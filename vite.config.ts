/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    setupFiles: "./src/setupTests.ts",
    environment: "jsdom",
    testTimeout: 10000,
  },
});
