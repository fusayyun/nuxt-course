<template>
  <ValidationProvider v-slot="{ errors, classes }" :rules="rules">
    <div class="input-control" :class="classes">
      <label><slot /></label>
      <input
        v-if="controlType === 'input'"
        v-bind="$attrs"
        :value="value"
        @input="$emit('input', $event.target.value)"
      >
      <span>{{ errors[0] }}</span>
      <textarea
        v-if="controlType === 'textarea'"
        rows="10"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </ValidationProvider>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationProvider } from 'vee-validate'

@Component({
  components: { ValidationProvider }
})
export default class AppControlInput extends Vue {
  /** input type */
  @Prop({ type: String, default: 'input' })
  readonly controlType!: string;

  /** input value */
  @Prop({ type: String, default: '' })
  readonly value: string |undefined

  /** input rules */
  @Prop({ type: [String, Object], default: '' })
  readonly rules!: string |object
}
</script>

<style lang='scss' scoped>
.input-control {
  margin: 10px 0;
  label {
    display: block;
    font-weight: bold;
  }
  input {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 5px;
    &:focus {
      background-color: #eee;
      outline: none;
    }
  }
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 5px;
    &:focus {
      background-color: #eee;
      outline: none;
    }
  }
}
.invalid{
  input,span{
    color: #EB0600
  }
  input{
    border: 1px #EB0600 solid
  }
}
</style>
