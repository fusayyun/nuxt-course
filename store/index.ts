import Vue from 'vue'
import Vuex from 'vuex'
import { Post } from '~/interfaces/post'
interface RootState {}
// 不加這行會報錯
Vue.use(Vuex)
export const store = new Vuex.Store<RootState>({
  actions: {
    nuxtServerInit: async (vuexContext, context) => {
      try {
        const data:Record<string, Post> = await context.app.$axios.$get('/posts.json')
        const postsArray:Post[] = Object.values(data)
        const posts = Object.keys(data).map((id, index) => {
          return { ...postsArray[index], id }
        })
        vuexContext.commit('PostsModule/SET_POSTS', posts)
      } catch (error) {
        context.error(error)
      }
    }
  }
})
export default function createStore () {
  return store
}
