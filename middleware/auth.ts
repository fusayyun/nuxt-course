import { Middleware } from '@nuxt/types'
import PostsModule from '~/store/modules/PostsModule'

const auth: Middleware = (context) => {
  console.log('[Middleware] Just Auth')
  // 如果未登入
  if (!PostsModule.isAuthenticated) {
    context.redirect('/admin/auth') // 導向登入頁面
  }
}

export default auth
