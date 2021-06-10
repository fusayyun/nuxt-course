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
import { Post } from '~/interfaces/post'

@Component
export default class AdminPostForm extends Vue {
  /**
   * 文章
   */
  @Prop({ type: Object, required: false })
  readonly post: Post | undefined;
  // get editedPost(): Post{
  //   return this.post
  //   ? { ...this.post }
  //   : {
  //     author:"",
  //     title:"",
  //     thumbnail: "",
  //     content: "",
  //     previewText:"",
  //   }
  // }

  /**
   * 編輯文章
   */
  public editedPost: Pick<Post, 'author' | 'title'| 'thumbnail'| 'content' | 'previewText'> =
  {
    author: '',
    title: '',
    thumbnail: '',
    content: '',
    previewText: ''
  };

  /**
   * 儲存文章，觸發submit事件
   */
  @Emit('submit')
  public onSave () {
    return this.editedPost
  };

  /**
   * 取消編輯
   */
  public onCancel () {
    this.$router.push('/admin')
  };

  /**
   * 如果有擷取到文章，載入文章
   */
  created () {
    if (this.post) {
      this.editedPost = this.post
    }
  };
}
</script>
<!--script>
import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'
export default {
  components:{
    AppControlInput,
    AppButton
  },
  props:{
    post:{
      type: Object,
      required: false
    }
  },
  data(){
    return{
      editedPost:this.post
      ? { ...this.post }
      : {
        author:"",
        title:"",
        thumbnail: "",
        content: "",
        previewText:"",
      }`
    }
  },
  methods:{
    onSave(){
      // 儲存文章
      this.$emit('submit',this.editedPost)
    },
    onCancel(){
      // 上一步
      this.$router.push('/admin')
    }
  }
}
</script-->
