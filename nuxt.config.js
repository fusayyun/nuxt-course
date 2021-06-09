
export default {

  /**
    * Headers of the page
    * 也就是頁面上的\<head>
    * 適用所有頁面
    */
  head: {
    title: 'Fu Blog', // 網頁名稱
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      // 網頁icon
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // 字體
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300&display=swap' }
    ]
  },

  //  客製化 progress-bar: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading
  loading: {
    throttle: 0, // 緩衝時間：預設200看不到，設置為0則可以看到
    color: '#7fc7dd',
    height: '4px'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/styles/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/core-components.ts',
    '~plugins/date-filter.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],
  // axios modules: https://axios.nuxtjs.org/options
  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-35f4b-default-rtdb.asia-southeast1.firebasedatabase.app'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    // 後端連結，如果run在node server則會注入前面的變數
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-35f4b-default-rtdb.asia-southeast1.firebasedatabase.app',
    fbAPIKey: 'AIzaSyAz9Gh9zsKmsq5G5wDvFLACOTv6r3NCcLs'
  },

  target: 'server',
  router: {
    base: '/nuxt-course/'
  },
  /**
   * 頁面轉換設定
   */
  transition: {
    name: 'fade',
    mode: 'out-in'
  }

  // serverMiddleware:[
  //   '~/api'
  // ]
}
