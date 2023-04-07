module.exports = {
  extends: ["@nuxtjs/eslint-config-typescript", "prettier"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
  },
};
