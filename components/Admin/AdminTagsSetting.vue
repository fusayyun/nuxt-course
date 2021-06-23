<template>
  <div>
    <div>
      <font-awesome-layers @click="showModal = true">
        <font-awesome-icon :icon="['fas', 'tags']" border size="lg" />
      </font-awesome-layers>
    </div>
    <AppModal v-show="showModal" @close="onClose">
      <h3 slot="header">編輯標籤</h3>
      <div slot="body" class="modal-body">
        <div class="add-input">
          <input v-model="addedTag" placeholder="建立標籤" type="text" />
          <button type="button" @click="addTag">+</button>
        </div>
        <div class="tags-list" v-for="tag in loadTags" :key="tag.id">
          <font-awesome-icon :icon="['fas', 'trash']" @click="deleteTag(tag)" />
          <input type="text" name="" id="" disabled :value="tag.name" />
          <font-awesome-icon :icon="['fas', 'pen']" />
        </div>
      </div>
    </AppModal>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Vue } from "nuxt-property-decorator";
import AppModal from "~/components/UI/AppModal.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import tagsModule from "~/store/modules/TagsModule";

@Component({ components: { FontAwesomeIcon, AppModal } })
export default class extends Vue {
  showModal = false;
  addedTag = "";
  /** 按下完成關閉modal */
  @Emit("click")
  onClose() {
    this.showModal = false;
  }

  //FIXME 同名標籤禁止新增
  @Emit("click")
  addTag() {
    tagsModule.addTag(this.addedTag);
  }
  @Emit("click")
  deleteTag(tag: Record<string, string>) {
    tagsModule.deleteTag(tag);
  }

  get loadTags() {
    console.log(tagsModule.loadTags);
    return tagsModule.loadTags;
  }
}
</script>
<style lang="scss" scoped>
.modal-body {
  flex-direction: column;
  .add-input {
  }
  .tags-list {
    input {
      margin: 0 5px;
    }
  }
}
</style>
