import { store } from "@/store";
import {
  Mutation,
  Action,
  VuexModule,
  Module,
  config,
  getModule
} from "vuex-module-decorators";
import { $axios } from "~/utils/api";
import { Tag } from "~/types/tag";
config.rawError = true;

//TODO: 編輯tag的Action
@Module({
  dynamic: true,
  namespaced: true,
  stateFactory: true,
  name: "TagsModule",
  store
})
class TagsModule extends VuexModule {
  /** state */
  tags: Tag[] = [];

  @Mutation
  private SET_TAGS(tags: Tag[]) {
    this.tags = tags;
  }

  @Mutation
  private ADD_TAG(tag: Tag) {
    this.tags.push(tag);
  }

  @Mutation
  private EDIT_TAG(editTag: Tag) {
    const tagIndex = this.tags.findIndex(tag => tag.id === editTag.id);
    this.tags[tagIndex] = editTag;
  }

  @Mutation
  private DELETE_TAG(deletedTag: Tag) {
    this.tags = this.tags.filter(tag => tag !== deletedTag);
  }

  @Action
  public setTags(tags: Tag[]) {
    this.SET_TAGS(tags);
  }

  @Action
  async addTag(tag: string) {
    try {
      const data = await $axios.$post(
        "/tags.json?auth=" + this.context.rootState.PostsModule.token,
        { name: tag }
      );
      this.ADD_TAG({ name: tag, id: data.name });
      return { name: tag, id: data.name } as Tag;
    } catch (error) {
      console.log(error);
    }
  }
  @Action
  async editTag(editTag: Tag) {
    try {
      await $axios.$put(
        "/tags/" +
          editTag.id +
          ".json?auth=" +
          this.context.rootState.PostsModule.token,
        editTag
      );
      this.EDIT_TAG(editTag);
    } catch (error) {
      console.log(error);
    }
  }

  @Action
  async deleteTag(tag: Tag) {
    try {
      await $axios.$delete(
        "/tags/" +
          tag.id +
          ".json?auth=" +
          this.context.rootState.PostsModule.token
      );
      this.DELETE_TAG(tag);
      console.log("delete success!!");
    } catch (error) {
      console.log(error);
    }
  }

  get loadTags() {
    return this.tags;
  }
}
export default getModule(TagsModule);
