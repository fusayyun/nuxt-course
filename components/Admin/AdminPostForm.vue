<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSave)">
      <AppControlInput
        v-model="editedPost.author"
        :rules="`${annonymous ? '' : 'required'}`"
        :disabled="annonymous"
        name="作者"
      >
        作者名稱
      </AppControlInput>

      <div>
        <input v-model="annonymous" type="checkbox" @change="onChange" /> 匿名
      </div>

      <AppControlInput v-model="editedPost.title" name="標題" required>
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
      <AppDropdown
        :catogories="catogories"
        :value.sync="tags"
        label="name"
        track-by="id"
        taggable
        multiple
        @addOption="onAdd"
      >
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
import { Component, Vue, Prop, Emit } from "nuxt-property-decorator";
import { Post, PostEdited } from "~/interfaces/post";
import TagsModule from "~/store/modules/TagsModule";

//TODO 不需要在這裡刪除了
//TODO 文章新增標籤資料
//TODO 新增標籤到store和firebase
@Component
export default class AdminPostForm extends Vue {
  /** 選取的tags */
  tags: string[] = [];
  annonymous = false;
  // catogories = [
  //   { name: "音樂", id: "xxx" },
  //   { name: "電影", id: "yyy" }
  // ];
  editedPost: PostEdited = {
    author: "",
    title: "",
    thumbnail: "",
    content: "",
    previewText: ""
  };

  get catogories() {
    return TagsModule.loadTags;
  }

  /** 載入的文章 */
  @Prop({ type: Object, required: false })
  readonly post: Post | undefined;

  /** 儲存文章，觸發submit事件 */
  @Emit("submit")
  public onSave() {
    console.log(this.editedPost);
    return this.editedPost;
  }

  /** 取消編輯 */
  @Emit("calick")
  public onCancel() {
    this.$router.push("/admin");
  }

  @Emit("change")
  public onChange() {
    if (this.annonymous) {
      this.editedPost.author = "";
    }
  }
  // @Emit("delete")
  // onDelete(option: Record<string, string>) {
  //   this.catogories = this.catogories.filter(value => value !== option);
  //   console.log(this.catogories);
  // }
  @Emit("addOption")
  onAdd(createdOption: any) {
    console.log(createdOption);
    this.catogories.push(createdOption);
  }

  /** 如果有擷取到文章，載入文章 */
  created() {
    if (this.post) {
      // 如果有文章載入
      this.editedPost = this.post;
    }
  }
}
</script>
