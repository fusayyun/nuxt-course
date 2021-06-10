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
import { Post } from '@/interfaces/post'

@Component({
  components: { AdminPostForm },
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  /** 向firebase擷取特定文章 */
  asyncData (context) {
    return context.app.$axios
      .$get('/posts/' +
          context.params.postId +
          '.json')
      .then((data: Post) => {
        return {
          loadedPost: data
        }
      })
      .catch((e: Error) => context.error(e))
  }
})
export default class extends Vue {
  loadedPost!: Post;
  onSubmitted (editedPost: Pick<Post, 'author' | 'title'| 'thumbnail'| 'content' | 'previewText'>) {
    this.$store.dispatch('editPost', editedPost)
      .then(() => {
        this.$router.push('/admin')
      })
  };
}
</script>
<!--script>
import AdminPostForm from '@/components/Admin/AdminPostForm'
export default {
  layout: 'admin',
  middleware: ['check-auth','auth'],
  components:{
    AdminPostForm
  },
  asyncData(context){
    return context.app.$axios
      .$get('/posts/' +
          context.params.postId +
          '.json')
      .then( data => {
        return{
          loadedPost: {...data, id: context.params.postId}
        }
      })
      .catch( e=> context.error(e));
  },
  methods:{
    onSubmitted(editedPost){
      this.$store.dispatch('editPost', editedPost)
        .then(()=>{
          this.$router.push('/admin');
        })
    }
  }

}
</script-->
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
