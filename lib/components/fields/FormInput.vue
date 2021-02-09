<template>
  <div
      :class="schema.classes && schema.classes.fieldContainer || ''"
  >
    <label
        :for="id"
        :class="schema.classes && schema.classes.label || ''"
    >
      {{ schema.label || '' }}
    </label>
    <input
        :id="id"
        :type="schema.subtype || 'text'"
        :value="model[schema.model]"
        @blur="handleBlur"
        @change="handleChange"
        @input.stop="handleInput"
        :class="schema.classes && schema.classes.field || ''"
    />
  </div>
</template>

<script lang="ts">
import {toRefs, defineComponent} from 'vue'

export default defineComponent({
  name: 'FormInput',
  props: {
    model: {required: true},
    schema: {required: true},
    id: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    const {model, schema, id} = toRefs(props)

    const handleBlur = (event: Event) => {

      context.emit('blured', {value: event.target.value, model, schema, id, originalEvent: event})
    }
    const handleChange = (event: Event) => {
      context.emit('change-model', {value: event.target.value, model, schema, id, originalEvent: event})
    }
    const handleInput = (event: Event) => {
      context.emit('form-input', {value: event.target.value, model, schema, id, originalEvent: event})
    }
    return {handleBlur, handleChange, handleInput}
  }
})
</script>

<style scoped>

</style>
