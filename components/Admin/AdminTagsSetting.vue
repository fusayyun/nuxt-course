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
        <ValidationProvider
          v-slot="{ errors }"
          :rules="{ excluded: this.loadTags.map(tag => tag.name) }"
        >
          <div class="add-input">
            <input
              v-model="addedTag"
              placeholder="建立標籤"
              type="text"
              name="標籤"
            />
            <button type="button" @click="addTag">+</button>
          </div>
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <div class="tags-list" v-for="tag in loadTags" :key="tag.id">
          <font-awesome-icon :icon="['fas', 'trash']" @click="deleteTag(tag)" />
          <input
            type="text"
            :disabled="tag.id !== editing"
            v-model="tag.name"
          />
          <font-awesome-icon
            v-if="tag.id === editing"
            :icon="['fas', 'check']"
            @click="editTag(tag)"
          />
          <font-awesome-icon
            v-else
            :icon="['fas', 'pen']"
            @click="edit(tag.id)"
          />
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
import { Tag } from "types/tag";
import { ValidationProvider } from "vee-validate";

//TODO modal開啟時不要滾動

@Component({ components: { FontAwesomeIcon, AppModal, ValidationProvider } })
export default class extends Vue {
  showModal = false;
  editing = "";
  addedTag = "";
  rules = "";

  /** 按下完成關閉modal */
  @Emit("click")
  onClose() {
    this.showModal = false;
  }

  @Emit("click")
  edit(id: string) {
    this.editing = id;
  }

  //FIXME 同名標籤禁止新增
  @Emit("click")
  addTag() {
    if (
      !this.addedTag || // 如果空值
      this.loadTags.map(tag => tag.name).includes(this.addedTag) // 重複值
    ) {
      return;
    }
    tagsModule.addTag(this.addedTag);
  }

  @Emit("click")
  async editTag(tag: Tag) {
    await tagsModule.editTag(tag);
    this.editing = "";
  }

  @Emit("click")
  deleteTag(tag: Tag) {
    tagsModule.deleteTag(tag);
    // TagsStore.store.dispatch("TagsModule/deleteTag", tag);
  }

  get loadTags() {
    return tagsModule.loadTags;
  }
}
</script>
<style lang="scss" scoped>
.modal-body {
  flex-direction: column;
  align-items: flex-end;
  .add-input {
  }
  .tags-list {
    input {
      margin: 0 5px;
    }
  }
}
</style>
