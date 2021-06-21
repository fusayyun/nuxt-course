<template>
  <ValidationProvider>
    <label><slot /></label>
    <multiselect
      v-model="value"
      tag-placeholder="新增選項"
      :options="catogories"
      placeholder="請選擇一個類別"
      :show-labels="false"
      :taggable="true"
      @tag="addOption"
    >
      <template slot="option" slot-scope="props">
        <div>
          <span>
            {{ props.option.isTag?props.search:props.option }}
          </span>
          <button type="button" class="delete_btn" @click="$emit('delete',props.option)">
            DELETE
          </button>
        </div>
      </template>
    </multiselect>
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  selected=''
  value = ''

  @Prop({ type: Array })
   catogories!:string[];

  addOption (newOption:string) {
    this.catogories.push(newOption)
  }
}
</script>

<style lang="scss" scoped>
  label {
    display: block;
    font-weight: bold;
  }
  .delete_btn{
    position: absolute;
    right: 10px;
  }
</style>
