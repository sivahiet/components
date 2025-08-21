import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "UBMInputMask",
      fileName: format => `ubmisg.isg-inputmask.${format}.js`,
      formats: ["es", "cjs", "umd"]
    },
    rollupOptions: {
      // Exclude peer dependencies from the bundle
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
