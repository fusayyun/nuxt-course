import { Middleware } from '@nuxt/types'

const log: Middleware = () => console.log('[middleware] The Log Middleware is running.')

export default log
