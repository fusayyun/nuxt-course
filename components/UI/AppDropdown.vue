<template>
  <ValidationProvider>
    <label><slot /></label>
    <multiselect
      tag-placeholder="新增選項"
      :options="catogories"
      placeholder="請選擇一個類別"
      :show-labels="false"
      v-model="value"
      v-bind="$attrs"
      @tag="addOption"
      @input="$emit('update:value', value)"
    >
      <template slot="option" slot-scope="props">
        <div>
          <span>
            {{ props.option.isTag ? props.search : props.option.name }}
          </span>
          <button
            type="button"
            class="delete_btn"
            @click="$emit('delete', props.option)"
          >
            DELETE
          </button>
        </div>
      </template>
    </multiselect>
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  //TODO: 要怎麼傳值才好?
  value: Array<string> | Record<string, string>[] = [];

  @Prop({ type: Array })
  catogories!: string[];

  @Emit("tag")
  addOption(newOption: string) {
    const id = newOption + Math.floor(Math.random() * 10000000);
    const createdOption: any = { name: newOption, id };
    // FIXME 如果不指派any不能過
    this.value.push(createdOption);
    this.$emit("addOption", createdOption);
  }
}
</script>

<style lang="scss" scoped>
label {
  display: block;
  font-weight: bold;
}
.delete_btn {
  position: absolute;
  right: 10px;
}
</style>
