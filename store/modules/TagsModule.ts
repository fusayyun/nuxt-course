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

config.rawError = true;

//TODO: 編輯tag的Action
@Module({ dynamic: true, name: "TagsModule", store, namespaced: true })
class TagsModule extends VuexModule {
  /** state */
  tags: Record<string, string>[] = [];

  /** Mutation: 載入tags */
  @Mutation
  private SET_TAGS(tags: Record<string, string>[]) {
    this.tags = tags;
  }

  /** Mutation: 新增tag */
  @Mutation
  private ADD_TAG(tag: Record<string, string>) {
    this.tags.push(tag);
  }

  /** Mutation: 刪除tag */
  @Mutation
  private DELETE_TAG(deletedTag: Record<string, string>) {
    this.tags = this.tags.filter(tag => tag !== deletedTag);
  }

  @Action
  public setTags(tags: Record<string, string>[]) {
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  @Action
  async deleteTag(tag: Record<string, string>) {
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
