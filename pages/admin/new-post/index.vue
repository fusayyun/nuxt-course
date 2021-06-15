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
import { Post } from '@/interfaces/post'
import { getModule } from 'vuex-module-decorators'
import postsModule from '~/store/modules/PostsModule'

@Component({
  components: { AdminPostForm },
  layout: 'admin',
  middleware: ['check-auth', 'auth']
})
export default class extends Vue {
  /** 處理送出事件: 新增文章 */
  onSubmitted (postData:Pick<Post, 'author' | 'title'| 'thumbnail'| 'content' | 'previewText'>) {
    const MyModuleInstance = getModule(postsModule, this.$store)
    MyModuleInstance.addPost(postData).then(() => {
      this.$router.push('/admin')
    })
  }
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
  methods:{
    onSubmitted(postData){
      this.$store.dispatch('addPost', postData).then(()=>{
        this.$router.push('/admin');
      })
    }
  }
}
</script-->
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
