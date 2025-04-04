import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
      },
    },
  },
  {
    plugins: {
      "@eslint/js": js,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // Base ESLint rules (adjusted for TypeScript)
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "comma-dangle": ["error", "never"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "no-console": "warn",
      curly: "error",
      "default-case": "error",
      "global-require": "error",
      "handle-callback-err": "warn",

      // TypeScript specific adjustments
      "@typescript-eslint/no-unused-vars": "warn", // replaces 'no-unused-vars'
      "@typescript-eslint/explicit-function-return-type": "off", // optional
      "@typescript-eslint/no-explicit-any": "warn", // recommended
      "@typescript-eslint/consistent-type-imports": "error", // recommended
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
]);
