<template>
  <ValidationObserver v-slot="{ handleSubmit }" >
    <form @submit.prevent="handleSubmit(onSave)">
      <AppControlInput :rules = "`${annonymous?'':'required'}`" v-model="author" :disabled="annonymous" name="作者">
        作者名稱
      </AppControlInput>
      <div><input type="checkbox" v-model="annonymous" /> 匿名</div>
      <AppControlInput v-model="editedPost.title" name="標題" required>
        標題
      </AppControlInput>

      <AppControlInput v-model="editedPost.thumbnail" name="縮圖" required rules="imageUrl">
        縮圖連結
      </AppControlInput>

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
import { extend } from 'vee-validate'

extend('imageUrl', {
  validate: value=>{
    let expression  = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*).(jpg|gif|png)/
    let regex = new RegExp(expression)
    return value.match(regex)
  },
  message:"此網址非圖片網址"
})

@Component
export default class AdminPostForm extends Vue {

  annonymous= false

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

  get author(){
    console.log('getter')
    return this.editedPost.author=this.annonymous?'':this.editedPost.author
  }
  // TODO 不會有動作
  set author(value){
    console.log('setter')
    this.editedPost.author=value
  }

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

  /** 如果有擷取到文章，載入文章 */
  created () {
    if (this.post) { // 如果有文章載入
      this.editedPost = this.post
    }
  };
}
</script>
