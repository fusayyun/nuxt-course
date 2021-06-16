<template>
  <div class="posts-page">
    <section class="post-list">
      <PostList :posts="loadedPosts" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
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

<style scoped>
  .posts-page{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
