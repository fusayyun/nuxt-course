<template>
  <nuxt-link class="post-preview" :to="postLink">
    <article>
      <div class="post-thumbnail" :style="{backgroundImage: 'url('+thumbnail+')'}" />
      <div class="post-content">
        <h1>{{ title }}</h1>
        <p>{{ previewText }}</p>
      </div>
    </article>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class PostPreview extends Vue {
  /** 是否在Admin頁面 */
  @Prop({
    type: Boolean,
    default: true
  })
  readonly isAdmin!: boolean;

  /** 文章ID */
  @Prop({
    type: String,
    required: true
  })
  readonly id!: string;

  /** 文章標題 */
  @Prop({
    type: String,
    required: true
  })
  readonly title!: string;

  /** 文章預覽文字 */
  @Prop({
    type: String,
    required: true
  })
  readonly previewText!: string;

  /** 文章預覽圖 */
  @Prop({
    type: String,
    required: true
  })
  readonly thumbnail!: string;

  /** Admin頁面?文章編輯頁:文章閱覽頁 */
  get postLink (): string {
    return this.isAdmin ? '/admin/' + this.id : '/posts/' + this.id
  }
}
</script>

<style scoped>

.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}
</style>
