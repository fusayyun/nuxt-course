import { Middleware } from '@nuxt/types'
// import { getModule } from 'vuex-module-decorators'
import PostsModule from '~/store/modules/PostsModule'
const checkAuth: Middleware = (context) => {
  console.log('[Middleware] Check Auth')
  // 從cookies或localStorage重新獲取token
  // const MyModuleInstance = getModule(PostsModule, context.app.$store)
  PostsModule.initAuth(context.req)
}

export default checkAuth
