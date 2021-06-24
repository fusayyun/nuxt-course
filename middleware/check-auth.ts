import { Middleware } from "@nuxt/types";
import TagsModule from "~/store/modules/TagsModule";
import PostsModule from "~/store/modules/PostsModule";

const checkAuth: Middleware = context => {
  console.log("[Middleware] Check Auth");
  // 從cookies重新獲取token
  PostsModule.initAuth(context.req);
  console.log("middleware先註冊module：", TagsModule.loadTags);
};

export default checkAuth;
