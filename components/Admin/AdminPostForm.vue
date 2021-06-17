<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">
      Author Name
    </AppControlInput>

    <AppControlInput v-model="editedPost.title">
      Title
    </AppControlInput>

    <AppControlInput v-model="editedPost.thumbnail">
      Thumbnail Link
    </AppControlInput>

    <AppControlInput
      v-model="editedPost.content"
      control-type="textarea"
    >
      Content
    </AppControlInput>
    <AppControlInput
      v-model="editedPost.previewText"
      control-type="textarea"
    >
      Preview Text
    </AppControlInput>

    <AppButton type="submit">
      Save
    </AppButton>

    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel"
    >
      Cancel
    </AppButton>
  </form>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import { Post, PostEdited } from '~/interfaces/post'

@Component
export default class AdminPostForm extends Vue {
  /** 載入的文章 */
  @Prop({ type: Object, required: false })
  readonly post: Post | undefined;

  public editedPost: PostEdited =
  {
    author: '',
    title: '',
    thumbnail: '',
    content: '',
    previewText: ''
  };

  /** 儲存文章，觸發submit事件 */
  @Emit('submit')
  public onSave () {
    return this.editedPost
  };

  /** 取消編輯 */
  public onCancel () {
    this.$router.push('/admin')
  };

  /** 如果有擷取到文章，載入文章 */
  created () {
    if (this.post) { // 如果有文章載入
      this.editedPost = this.post
    }
  };
}
</script>
