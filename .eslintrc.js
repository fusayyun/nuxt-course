module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended",
    "prettier/vue"
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    "no-console": "off",
    "vue/component-name-in-template-casing": ["error", "PascalCase"]
  }
};
