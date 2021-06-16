<template>
  <div class="admin-new-pist-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AdminPostForm from '@/components/Admin/AdminPostForm.vue'
import { PostEdited } from '@/interfaces/post'
import postsModule from '~/store/modules/PostsModule'

@Component({
  components: { AdminPostForm },
  layout: 'admin',
  middleware: ['check-auth', 'auth']
})
export default class extends Vue {
  /** 處理送出事件: 新增文章 */
  async onSubmitted (postData:PostEdited) {
    await postsModule.addPost(postData)
    this.$router.push('/admin')
  }
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
