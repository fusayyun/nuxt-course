import Vue from "vue";
import Vuex from "vuex";
import { Post } from "~/interfaces/post";
interface RootState {}
// 不加這行會報錯
Vue.use(Vuex);
export const store = new Vuex.Store<RootState>({
  actions: {
    nuxtServerInit: async (vuexContext, context) => {
      try {
        const data: Record<string, Post> = await context.app.$axios.$get(
          "/posts.json"
        );
        const postsArray: Post[] = Object.values(data);
        const posts = Object.keys(data).map((id, index) => {
          return { ...postsArray[index], id };
        });
        vuexContext.commit("PostsModule/SET_POSTS", posts);
        const tagsJson: Record<
          string,
          Record<string, string>
        > = await context.app.$axios.$get("/tags.json");
        const tagsArray: Record<string, string>[] = Object.values(tagsJson);
        const tags = Object.keys(tagsJson).map((id, index) => ({
          ...tagsArray[index],
          id
        }));
        vuexContext.commit("TagsModule/SET_TAGS", tags);
      } catch (error) {
        context.error(error);
      }
    }
  }
});
export default function createStore() {
  return store;
}
