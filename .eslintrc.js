
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    "@vue/prettier" //使用 prettier
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off'
  }
}
