// eslint.config.js
import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended, // Enables ESLint's recommended rules
  {
    // General configuration for JavaScript files
    files: ["**/*.js"], // Apply this config to all .js files
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript features
      sourceType: "module",  // Use ES modules
      globals: {
        ...globals.browser, // Standard browser globals
        ...globals.node,    // Standard Node.js globals
        THREE: "readonly",  // Custom global for Three.js
        dat: "readonly"     // Custom global for dat.gui
      }
    },
    rules: {
      // Customize or override rules from eslint:recommended here
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Warn about unused variables, ignore if prefixed with _
      "no-undef": "warn", // Warn about undefined variables (globals should be defined above)
      "no-prototype-builtins": "warn", // Warn if using Object.prototype builtins directly
      // Add any other project-specific rules or overrides
    }
  },
  {
    // Configuration specifically for test files if needed
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.vitest // Add Vitest globals for test files
      }
    }
  }
];
