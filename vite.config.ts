import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { peerDependencies } from "./package.json";

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true, exclude: ["**/*.stories.ts", "**/*.test.tsx"] })
  ],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "ui",
      fileName: format => `ubmisg.${format}.js`,
      formats: ["es", "cjs", "umd"]
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
      output: { globals: { react: "React", "react-dom": "ReactDOM" } }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  // @ts-expect-error - 'test' is not in Vite's config type, but used by Vitest
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    include: ["**/*.test.{ts,tsx}"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html"], // optional: generate nice reports
      lines: 80,
      statements: 80,
      functions: 80,
      branches: 80,
      exclude: [
        "**/*.ts",
        "**/*.cjs",
        "**/*.stories.tsx",
        "dist/**/*.*",
        "**/dist/**/*.*",
        "storybook-static/**/*.*",
        ".storybook/**/*.*"
      ]
    }
  }
});
