import js from "@eslint/js";

export default [
  js.configs.recommended,
  // Node.js CJS files (generate-stock.js, stock-database.js)
  {
    files: ["generate-stock.js", "stock-database.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "writable",
        exports: "writable",
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
        Promise: "readonly",
        Map: "readonly",
        Set: "readonly",
        Buffer: "readonly",
        window: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
  // Browser JS files (chart-config.js, stock/*.js)
  {
    files: ["chart-config.js", "stock/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        fetch: "readonly",
        Promise: "readonly",
        Map: "readonly",
        Set: "readonly",
        TradingView: "readonly",
        LightweightCharts: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-undef": "error",
    },
  },
  {
    ignores: ["node_modules/**"],
  },
];
