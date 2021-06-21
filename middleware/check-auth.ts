import { Middleware } from '@nuxt/types'
import PostsModule from '~/store/modules/PostsModule'
const checkAuth: Middleware = (context) => {
  console.log('[Middleware] Check Auth')
  // 從cookies重新獲取token
  PostsModule.initAuth(context.req)
}

export default checkAuth
