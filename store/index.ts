import Vue from 'vue'
import Vuex from 'vuex'
// import { Context } from '@nuxt/types'
// import { initializeStores } from '~/plugins/store-accessor'
import { Post } from '~/interfaces/post'
// import postsModule from '~/store/modules/PostsModule'
// import { RootState } from '~/interfaces'
// const initializer = (initStore: Store<any>) => initializeStores(initStore)
// export const plugins = [initializer]
// export * from '~/plugins/store-accessor'
interface RootState {}
// 不加這行會報錯
Vue.use(Vuex)

export const store = new Vuex.Store<RootState>({
  actions: {
    nuxtServerInit: async (vuexContext, context) => {
      return await context.app.$axios
        .$get('/posts.json')
        .then((data: Post[]) => {
          const postsArray = []
          for (const key in data) {
            postsArray.push({ ...data[key], id: key })
          }
          vuexContext.commit('PostsModule/SET_POSTS', postsArray)
        })
        .catch((e:Error) => context.error(e))
    }
  }
  // modules: {
  //   postsModule
  // }
})

// 一定要是default
export default function createStore () {
  return store
}
// https://nuxtjs.org/docs/2.x/directory-structure/store#plugins-in-the-store
// const actions: ActionTree<RootState, RootState> ={
//   async nuxtServerInit(vuexContext:Context, context:Context):Promise<any> => {
//     return await context.app.$axios
//       .$get('/posts.json')
//       .then((data: Post[]) => {
//         const postsArray = []
//         for (const key in data) {
//           postsArray.push({ ...data[key], id: key })
//         }
//         console.log('test', vuexContext)
//         vuexContext.commit('SET_POSTS', postsArray)
//       }).then(() =>
//         console.log('rootState', vuexContext.rootState.postsModule)
//       )
//       .catch((e:Error) => context.error(e))
//     }
// }
// export const actions = {
//   nuxtServerInit: ({}, context:Context) => {
//     initializeStores(context.store)
//     return context.app.$axios
//       .$get('/posts.json')
//       .then((data: Post[]) => {
//         const postsArray = []
//         for (const key in data) {
//           postsArray.push({ ...data[key], id: key })
//         }
//         postsStore.setPosts(postsArray)
//       })
//       .catch((e:Error) => context.error(e))
//   }
// }
