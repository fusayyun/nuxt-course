<template>
  <ValidationProvider>
    <label><slot /></label>
    <multiselect
      tag-placeholder="新增選項"
      :options="catogories"
      placeholder="請選擇一個類別"
      :show-labels="false"
      :value="value"
      v-bind="$attrs"
      @select="$emit('updateValue', $event)"
      @tag="$emit('addOption', $event)"
      @remove="$emit('removeValue', $event)"
    >
    </multiselect>
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop({})
  value?: Object | string[] | string | number;

  @Prop({ type: Array })
  catogories!: string[];
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
