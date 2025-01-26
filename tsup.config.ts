import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Main entry point
  outDir: "dist",
  format: ["cjs", "esm"], // Build both CommonJS and ESM formats
  dts: true, // Generate TypeScript declaration files
  sourcemap: true, // Include sourcemaps
  clean: true, // Clean output directory before building
  minify: true, // Minify the output
});
