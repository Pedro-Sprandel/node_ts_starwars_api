import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.node } },
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"], rules: {
    "indent": ["error", 2],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "comma-dangle": ["error", "never"],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "no-console": "warn",
    "no-unused-vars": "warn",
    "curly": "error",
    "default-case": "error",
    "global-require": "error",
    "handle-callback-err": "warn"
  } },
  tseslint.configs.recommended
]);