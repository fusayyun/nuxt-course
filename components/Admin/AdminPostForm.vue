<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSave)">
      <AppControlInput
        v-model="editedPost.author"
        :rules="`${annonymous?'':'required'}`"
        :disabled="annonymous"
        name="作者"
      >
        作者名稱
      </AppControlInput>

      <div><input v-model="annonymous" type="checkbox" @change="onChange()"> 匿名</div>

      <AppControlInput
        v-model="editedPost.title"
        name="標題"
        required
      >
        標題
      </AppControlInput>

      <AppControlInput
        v-model="editedPost.thumbnail"
        name="縮圖"
        required
        rules="imageUrl"
      >
        縮圖連結
      </AppControlInput>

      <AppDropdown :catogories="catogories" @delete="onDelete">
        文章類別
      </AppDropdown>
      <AppControlInput
        v-model="editedPost.content"
        control-type="textarea"
        name="內文"
      >
        內文
      </AppControlInput>

      <AppControlInput
        v-model="editedPost.previewText"
        control-type="textarea"
        name="文章預覽"
        required
      >
        文章預覽
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
  </ValidationObserver>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import { Post, PostEdited } from '~/interfaces/post'

@Component
export default class AdminPostForm extends Vue {
  annonymous= false
  catogories = ['音樂', '電影']
  /** 載入的文章 */
  @Prop({ type: Object, required: false })
  readonly post: Post | undefined;

  // /** 下拉式選單 */
  // @Prop({ type: Array })
  // readonly catogories!:string[];

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
    console.log(this.editedPost)
    return this.editedPost
  };

  /** 取消編輯 */
  public onCancel () {
    this.$router.push('/admin')
  };

  public onChange () {
    if (this.annonymous) {
      this.editedPost.author = ''
    }
  }

  onDelete (option:string) {
    this.catogories = this.catogories.filter(value => value !== option)
    console.log(this.catogories)
  }

  /** 如果有擷取到文章，載入文章 */
  created () {
    if (this.post) { // 如果有文章載入
      this.editedPost = this.post
    }
  };
}
</script>
