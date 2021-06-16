<template>
  <section class="post-list">
    <PostPreview
      v-for="post in posts"
      :id="post.id"
      :key="post.id"
      :is-admin="isAdmin"
      :thumbnail="post.thumbnail"
      :title="post.title"
      :preview-text="post.previewText"
    />
  </section>
</template>

<script lang="ts">
import PostPreview from '@/components/Posts/PostPreview.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PostPreviewed } from '@/interfaces/post'

@Component({
  components: { PostPreview }
})
export default class PostList extends Vue {
  /** 是否在admin頁面 */
  @Prop({ type: Boolean, default: false })
  readonly isAdmin!: boolean;

  /** 文章陣列 */
  @Prop({ type: Array, required: true })
  readonly posts!: PostPreviewed[];
}
</script>

<style scoped>
  .post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
