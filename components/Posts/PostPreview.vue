<template>
  <nuxt-link class="post-preview" :to="postLink">
    <article>
      <div class="post-thumbnail" :style="{backgroundImage: 'url('+thumbnail+')'}" />
      <div class="post-content">
        <h1 v-html="title" />
        <p v-html="previewText" />
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

<style lang="scss" scoped>

.post-preview {
  text-decoration: none;
  color: black;
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;

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
  &:hover, &:active {
    .post-content {
      background-color: #ccc;
    }
  }
  ::v-deep .highlight {
    background-color: rgb(245, 180, 0);
    color: white;
    padding: 0px 5px;
  }
}
@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

</style>
