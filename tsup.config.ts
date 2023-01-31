import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/bin.ts"],
  target: "esnext",
  minify: true,
  format: ["esm"],
  sourcemap: true,
  clean: true,
})
