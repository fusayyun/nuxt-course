<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AdminPostForm from '@/components/Admin/AdminPostForm.vue'
import { Post, PostEdited } from '@/interfaces/post'
import postsModule from '~/store/modules/PostsModule'
@Component({
  components: { AdminPostForm },
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  /** 向firebase擷取特定文章 */
  async asyncData (context) {
    try {
      const loadedPost = await context.app.$axios.$get('/posts/' + context.params.postId + '.json')
      return {
        loadedPost: { ...loadedPost, id: context.params.postId }
      }
    } catch (error) {
      console.log(error)
    }
  }
})
export default class extends Vue {
  /** asyncData 載入文章 */
  loadedPost!: Post;
  /** 送出處理 */
  async onSubmitted (editedPost:PostEdited) {
    await postsModule.editPost({ ...editedPost, id: this.loadedPost.id, updatedDate: this.loadedPost.updatedDate })
    this.$router.push('/admin')
  };
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
