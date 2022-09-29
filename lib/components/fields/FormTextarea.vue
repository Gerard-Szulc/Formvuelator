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
    <textarea
        :id="id"
        :value="model[schema.model]"
        @blur="handleBlur"
        @change="handleChange"
        @input.stop="handleInput"
        :class="schema.classes && schema.classes.field || ''"
    />
  </div>

</template>

<script lang="ts">
import {ref, defineComponent, toRefs, PropType} from 'vue'

export default defineComponent({
  name: 'FormTextarea',
  props: {
    model: {required: true, type: Object as PropType<Record<string, any>>},
    schema: {required: true, type: Object as PropType<Record<string, any>>},
    id: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    const {model, schema, id} = toRefs(props)

    const handleBlur = (event: any) => {

      context.emit('blured', {value: event.target.value, model, schema, id, originalEvent: event})
    }
    const handleChange = (event: any) => {
      context.emit('change-model', {value: event.target.value, model, schema, id, originalEvent: event})
    }
    const handleInput = (event: any) => {
      context.emit('form-input', {value: event.target.value, model, schema, id, originalEvent: event})
    }
    return {handleBlur, handleChange, handleInput}
  }

})
</script>

<style scoped>

</style>
