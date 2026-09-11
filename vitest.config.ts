import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

// @vitejs/plugin-react can be imported as default function or nested default depending on ESM/CJS interop
const resolveReactPlugin = () => {
  const pluginAny = react as unknown as { default?: { default?: () => unknown } | (() => unknown) } | (() => unknown);
  if (typeof pluginAny === "function") return pluginAny();
  if (typeof pluginAny?.default === "function") return pluginAny.default();
  if (typeof (pluginAny?.default as { default?: () => unknown })?.default === "function") {
    return (pluginAny.default as { default: () => unknown }).default();
  }
  return undefined;
};

export default defineConfig({
  plugins: [resolveReactPlugin()].filter(Boolean) as never[],

  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.{ts,tsx}", "scripts/**/*.test.ts"],
    exclude: ["node_modules", ".next", "src/generated", "**/*.int.test.ts"],
    setupFiles: ["./vitest.setup.ts"],
    testTimeout: 20_000,
    server: { deps: { inline: ["next-auth"] } },

  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "server-only": path.resolve(__dirname, "./tests/stubs/server-only.ts"),
    },
  },
});
