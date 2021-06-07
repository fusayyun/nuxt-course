export default function (context) {
  console.log('[Middleware] Check Auth');
  // 從cookies或localStorage重新獲取token
  context.store.dispatch('initAuth', context.req);
}