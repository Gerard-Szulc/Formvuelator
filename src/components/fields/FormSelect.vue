<template>
  <label :for="id">
    {{ schema.label || ''}}
    <select
        :id="id"
        :value="model[schema.model]"
        :name="schema.name"
        :size="schema.size"
        :multiple="schema.multiple"
        :disabled="schema.disabled"
        :required="schema.required"
        @blur="handleBlur"
        @change="handleChange"
        @input="handleInput"
    >
      <template
          v-for="option in schema.options"
          :key="`${id}-${schema.model}-${option[schema.optionValueKey || 'value']}`"
      >
        <option
            :value="option[schema.optionValueKey || 'value']"
            :selected="option.selected"
        >
          {{option[schema.optionLabelKey || 'label']}}
        </option>
      </template>
    </select>
  </label>
</template>

<script lang="ts">

import {toRefs, defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'FormSelect',
  props: {
    model: {required: true},
    schema: {required: true},
    id: {
      type: String,
      required: true
    }
  },
  setup (props, context) {
    const { model, schema, id } = toRefs(props)

    const getMultipleItemProp = (item) => schema.value.multipleByKey ? item[schema.value.optionValueKey || 'value'] : item

    const getMultipleItemValues = (event) => {
      return [...event.target.options].filter(option => option.selected).map(option => getMultipleItemProp(option))
    }

    const getValue = (event) => {
      return schema.value.multiple ? getMultipleItemValues(event) : event.target.value
    }
    const emitEvent = (eventName, event) => {
      context.emit(eventName, {value: getValue(event), model, schema, id, originalEvent: event})
    }

    const handleBlur = (event: Event) => {
      emitEvent('blur', event)
    }
    const handleChange = (event: Event) => {
      emitEvent('change-model', event)
    }
    const handleInput = (event: Event) => {
      emitEvent('input', event)
    }
    return { handleBlur, handleChange, handleInput }
  }
})
</script>

<style scoped>

</style>
