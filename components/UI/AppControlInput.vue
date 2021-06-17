<template>
  <div class="input-control">
    <label><slot /></label>
    <ValidationProvider v-slot="{ errors }">
      <input
        v-if="controlType === 'input'"
        v-bind="$attrs"
        :value="value"
        @input="$emit('input', $event.target.value)"
      >
      <span>{{ errors[0] }}</span>
    </ValidationProvider>

    <textarea
      v-if="controlType === 'textarea'"
      rows="10"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
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
}
</script>

<style scoped>
.input-control {
  margin: 10px 0;
}

.input-control label {
  display: block;
  font-weight: bold;
}

.input-control input,
.input-control textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 5px;
}

.input-control input:focus,
.input-control textarea:focus {
  background-color: #eee;
  outline: none;
}
</style>
