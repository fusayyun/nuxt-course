<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="$router.push('/admin/new-post')">
        新增文章
      </AppButton>
      <AppButton @click="onLogout">
        登出
      </AppButton>
    </section>
    <section class="existing-posts">
      <h1>現存文章</h1>
      <PostList is-admin :posts="loadedPosts" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import postsModule from '~/store/modules/PostsModule'
@Component({
  middleware: ['check-auth', 'auth'],
  layout: 'admin'
})
export default class extends Vue {
  /** 取得文件列表 */
  get loadedPosts () {
    return postsModule.loadPosts
  }

  /** 登出事件處理 */
  onLogout () {
    postsModule.logout()
    this.$router.push('/admin/auth') // 登出後回到登入頁面
  };
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
