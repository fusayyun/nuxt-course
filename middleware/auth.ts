import { Middleware } from "@nuxt/types";

const auth: Middleware = context => {
  console.log("[Middleware] Just Auth");
  // 如果未登入
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/admin/auth"); // 導向登入頁面
  }
};

export default auth;
