<template>
  <div>
    <div class="filter">
      <AppControlInput v-model="filter" placeholder="請輸入關鍵字" />
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

  // FIXME SyntaxError: Invalid regular expression: /[/: Unterminated character class
  /** 篩選後的文章 */
  get filteredPost () {
    if (!this.filter) { return this.posts } // 如果是filter是空值，返回原始陣列
    const fields:(keyof PostPreviewed)[] = ['title', 'previewText']
    return this.posts.filter((post:PostPreviewed) => {
      for (const field of fields) {
        if (post[field].toLowerCase().includes(this.filter.toLowerCase())) {
          return true
        }
      }
      return false
    }).map((post) => {
      const cache = JSON.parse(JSON.stringify(post))
      let regex:RegExp
      try {
        regex = new RegExp(this.filter, 'i')
      } catch (error) {
        return post
      }
      fields.forEach((field) => {
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
      flex-wrap: wrap;
      justify-content: center;
    }
    .filter{
      display: flex;
      padding: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
