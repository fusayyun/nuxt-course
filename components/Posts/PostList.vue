<template>
  <div>
    <div class="filter">
      <input v-model="filter" type="text" placeholder="輸入關鍵字">
    </div>
    <h5>
      共有{{ filteredPost.length }}篇文章
    </h5>
    <section class="post-list">
      <PostPreview
        v-for="post in filteredPost"
        :id="post.id"
        :key="post.id"
        :is-admin="isAdmin"
        :thumbnail="post.thumbnail"
        :title="post.title"
        :preview-text="post.previewText"
      />
    </section>
  </div>
</template>

<script lang="ts">
import PostPreview from '@/components/Posts/PostPreview.vue'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PostPreviewed } from '@/interfaces/post'

type keyPost = keyof PostPreviewed;

@Component({
  components: { PostPreview }
})
export default class PostList extends Vue {
  filter=''

  /** 是否在admin頁面 */
  @Prop({ type: Boolean, default: false })
  readonly isAdmin!: boolean;

  /** 文章陣列 */
  @Prop({ type: Array, required: true })
  readonly posts!: PostPreviewed[];

  get filteredPost () {
    const fields:keyPost[] = ['title', 'previewText']
    return this.posts.filter((post:PostPreviewed) => {
      let containFlag = false
      fields.forEach((field) => {
        // TODO 物件的key值這樣做好嗎?
        if (post[field].toLowerCase().includes(this.filter.toLowerCase())) { containFlag = true }
      })
      return containFlag
    }).map((post) => {
      if (this.filter === '') { return post }
      const cache = { ...post }
      fields.forEach((field) => {
        const regex = new RegExp(this.filter, 'i')
        const match = post[field].match(regex)
        if (match) {
          cache[field] = post[field].replace(regex, "<span class='highlight'>" + match[0] + '</span>')
        }
      })
      return cache
    })
  }
}
</script>

<style lang="scss" scoped>
  div{
    text-align: center;
    .post-list {
      display: flex;
      padding: 20px;
      box-sizing: border-box;
      flex-wrap: wrap;
      justify-content: center;
    }
    .filter{
      display: flex;
      padding: 20px;
      justify-content: center;
      box-sizing: border-box;
      flex-wrap: wrap;
    }
  }

</style>
