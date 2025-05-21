// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 1) pull in Next.js’s core-web-vitals + TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2) your custom overrides
  {
    rules: {
      // Turn the base rule into a warning
      "no-unused-vars": ["warn", {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",   // ignore function args named _foo
        varsIgnorePattern: "^_",   // ignore variables named _bar
      }],

      // And for TS-specific checks, also warn (or you can turn it off)
      "@typescript-eslint/no-unused-vars": ["warn", {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }],
    },
  },
];
