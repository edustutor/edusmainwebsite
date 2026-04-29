import nextPlugin from "@next/eslint-plugin-next";

/** ESLint 9 flat config, kept lightweight to play nicely with Vercel builds. */
export default [
  {
    ignores: [".next/**", "node_modules/**"],
  },
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // EDUS-specific overrides:
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
    },
  },
];
