import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import pluginSecurity from "eslint-plugin-security";
import pluginSecurityNode from "eslint-plugin-security-node";
import pluginNoUnsanitized from "eslint-plugin-no-unsanitized";

export default defineConfig([
  // Node.js CommonJS files (exclude test.js)
  {
    files: ["**/*.{js,cjs}"],
    ignores: ["repository/tests/test.js"], // <-- Ignore test.js, settle next block
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node, // INSTEAD OF GLOBALS.BROWSER
      },
    },
    plugins: {
      js,
      security: pluginSecurity,
      "security-node": pluginSecurityNode,
      "no-unsanitized": pluginNoUnsanitized
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginSecurity.configs.recommended.rules,
      ...pluginSecurityNode.configs.recommended.rules,
      ...pluginNoUnsanitized.configs.recommended.rules,
      "security/detect-eval-with-expression": "error",
    },
  },

  // // Specifically for unit testing using npx mocha
  // {
  //   files: ["tests/test.js"],
  //   languageOptions: {
  //     sourceType: "commonjs",
  //     globals: {
  //       ...globals.node,
  //       ...globals.mocha, // Enable mocha globals here
  //     },
  //   },
  //   plugins: {
  //     js,
  //     security: pluginSecurity,
  //     "security-node": pluginSecurityNode,
  //     "no-unsanitized": pluginNoUnsanitized
  //   },
  //   rules: {
  //     ...js.configs.recommended.rules,
  //     ...pluginSecurity.configs.recommended.rules,
  //     ...pluginSecurityNode.configs.recommended.rules,
  //     ...pluginNoUnsanitized.configs.recommended.rules,
  //     "security/detect-eval-with-expression": "error",
  //   },
  // },

  // ES Module files (.mjs)
  {
    files: ["**/*.mjs"],
    languageOptions: {
      sourceType: "module", // AMENDED FOR ES MODULES ONLY
      globals: globals.node,
    },
    plugins: {
      js,
      security: pluginSecurity,
      "security-node": pluginSecurityNode,
      "no-unsanitized": pluginNoUnsanitized
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginSecurity.configs.recommended.rules,
      ...pluginSecurityNode.configs.recommended.rules,
      ...pluginNoUnsanitized.configs.recommended.rules,
      "security-node/detect-unhandled-async-errors": "off", // broken rule because incompatible with ESM file structure
      "security/detect-eval-with-expression": "error",
    },
  },
]);
