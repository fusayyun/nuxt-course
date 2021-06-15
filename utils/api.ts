import { NuxtAxiosInstance } from '@nuxtjs/axios'

// 會報錯
// eslint-disable-next-line import/no-mutable-exports
let $axios: NuxtAxiosInstance

export function initializeAxios (axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
}

export { $axios }
