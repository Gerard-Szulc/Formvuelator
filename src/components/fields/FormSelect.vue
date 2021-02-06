<template>
  <label :for="id">
    {{ schema.label || '' }}
    <select
        :id="id"
        v-model="value"
        :value="value"
        :name="schema.name"
        :size="schema.size"
        :multiple="schema.multiple"
        :disabled="schema.disabled"
        :required="schema.required"
        @blur="handleBlur"
        @change.stop="handleChange"
    >
      <option v-if="!schema.multiple" :value="null">{{ schema.nothingSelectedLabel || 'Nothing selected' }}</option>
      <template
          v-for="(option, index) in schema.options"
          :key="`${id}-${schema.model}-${option[schema.optionValueKey || 'value']}-temp`"
      >
        <option
            :value="option[schema.optionValueKey || 'value']"
        >
          {{ option[schema.optionLabelKey || 'label'] }}
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
  computed: {
    value: {
      get() {
        if (this.schema.multiple) {
          if (this.schema.multipleAsObjects) {
            return (this.model[this.schema.model] || []).map(item => item[this.schema.optionValueKey || 'value'])
          }
          return this.model[this.schema.model] || []
        }
        return this.model[this.schema.model] || null
      },
      set(value, ...data) {
        return value
      }
    }
  },
  setup(props, context) {
    const {model, schema, id} = toRefs(props)
    const getMultipleItemProp = (item) => {
      if (schema.value.multipleAsObjects) {
        let defaultOption = {}
        defaultOption[schema.value.optionValueKey || 'value'] = item['value']
        defaultOption[schema.value.optionLabelKey || 'label'] = item['label']
        return defaultOption
      }
      return item['value']
    }

    const getMultipleItemValues = (value) => {
      return Array(...value).reduce((acc, option) => {
        acc.push(getMultipleItemProp(option));
        return acc;
      }, []);
    }

    const getValue = (value) => {
      return schema.value.multiple ? getMultipleItemValues(value) : value
    }

    const emitEvent = (eventName, value, event = null) => {
      context.emit(eventName, {value: getValue(value), model, schema, id, originalEvent: event})
    }

    const handleBlur = (event: FocusEvent) => {
      emitEvent('blured', schema.value.multiple ? event.target.selectedOptions : event.target.value, event)
    }

    const handleChange = (event: Event) => {
      emitEvent('change-model', schema.value.multiple ? event.target.selectedOptions : event.target.value, event)
    }
    return {handleBlur, handleChange, emitEvent}
  }
})
</script>

<style scoped>

</style>
