<template>
  <div class="posts-page">
    <section class="post-list">
      <PostList :posts="loadedPosts" />
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import { getModule } from 'vuex-module-decorators'
import postsModule from '~/store/modules/PostsModule'
@Component({
  middleware: 'log'
})
export default class extends Vue {
  get loadedPosts () {
    return postsModule.loadedPosts
  }
}
</script>
<!--script>
export default {
  middleware: 'log',
  computed:{
    loadedPosts(){
      return this.$store.getters.loadedPosts
    }
  }
}
</script-->
<style scoped>
  .posts-page{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
