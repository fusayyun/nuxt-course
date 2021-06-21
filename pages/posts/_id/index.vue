<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">
        {{ loadedPost.title }}
      </h1>
      <div class="post-details">
        <div class="post-detail">
          <!-- 使用date-filter處理日期格式: https://vuejs.org/v2/guide/filters.html -->
          Last updated on {{ loadedPost.updatedDate | date }}
        </div>
        <div class="post-detail">
          Written by {{ loadedPost.author?loadedPost.author:'匿名' }}
        </div>
      </div>
      <p class="post-content">
        {{ loadedPost.content }}
      </p>
    </section>
    <section class="post-feedback">
      <p>讓我知道你有什麼想法，請寄信到<a href="mailto:siyun.fu@tpisoftware.com">siyun.fu@tpisoftware.com</a>。</p>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Post } from '@/interfaces/post'

@Component({
  /** 網頁標題 */
  head: {
    title: 'a Blog Post'
  },
  /** 文章載入 */
  async asyncData (context) {
    try {
      const loadedPost = await context.app.$axios.$get('/posts/' + context.params.id + '.json')
      return { loadedPost }
    } catch (error) {
      console.log(error)
    }
  }
})
export default class extends Vue {
  /**  asyncData 載入的文章 */
  loadedPost!: Post;
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
