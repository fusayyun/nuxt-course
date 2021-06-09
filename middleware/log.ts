import { Middleware } from '@nuxt/types';

const log: Middleware = context => console.log('[middleware] The Log Middleware is running.')

export default log;
