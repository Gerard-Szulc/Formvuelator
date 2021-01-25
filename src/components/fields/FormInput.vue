<template>
  <label :for="id">
    {{ schema.label || ''}}
    <input :id="id" :type="schema.subtype || 'text'" :value="model[schema.model]" @blur="handleBlur" @change="handleChange" @input.stop="handleInput"/>
  </label>
</template>

<script lang="ts">
import {toRefs, defineComponent, ref} from 'vue'

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
  setup (props, context) {
    const { model, schema, id} = toRefs(props)

    // let values = {
    //   text: (event) => event.target.value,
    //   checkbox: (event) => event.target.checked,
    // }

    const handleBlur = (event: Event) => {

      context.emit('blur', {value: event.target.value, model, schema, id, originalEvent: event})
    }
    const handleChange = (event: Event) => {
      context.emit('change-model', {value: event.target.value, model, schema, id, originalEvent: event})
    }
    const handleInput = (event: Event) => {
      context.emit('input', {value: event.target.value, model, schema, id, originalEvent: event})
    }
    return { handleBlur, handleChange, handleInput }
  }
})
</script>

<style scoped>

</style>
