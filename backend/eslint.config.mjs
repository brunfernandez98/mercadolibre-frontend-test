import eslint from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        require: "readonly",
        exports: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "max-len": ["error", { code: 80 }],
      "no-unused-vars": ["error", { args: "none" }],
      indent: ["error", 2],
      eqeqeq: ["error", "always"],
      "@typescript-eslint/no-explicit-any": 0,
    },
  },
]
