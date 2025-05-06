<template>
  <label :for="id">
    {{ schema.label || "" }}
    <select
        :id="id"
        :value="!schema.multiple ? value : value[0]"
        :name="schema.name"
        :size="schema.size"
        :multiple="schema.multiple"
        :disabled="schema.disabled"
        :required="schema.required"
        @blur="handleBlur"
        @change.stop="handleChange"
    >
      <option v-if="!schema.multiple" :value="''">
        {{ schema.nothingSelectedLabel || "Nothing selected" }}
      </option>
      <template
          v-for="option in schema.options"
          :key="`${id}-${schema.model}-${
          option[schema.optionValueKey || 'value']
        }-temp`"
      >
        <option
            :value="option[schema.optionValueKey || 'value']"
            :selected="
            schema.multiple
              ? value.find((element: string) => String(element) == String(option[schema.optionValueKey || 'value']))
              : value === option[schema.optionValueKey || 'value']
          "
        >
          {{ option[schema.optionLabelKey || "label"] }}
        </option>
      </template>
    </select>
  </label>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

const props = defineProps({
  model: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  schema: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const { model, schema, id } = toRefs(props)
// Using simpler emit definition
const emit = defineEmits(['blured', 'change-model']);

const value = computed(() => {
  if (schema.value.multiple) {
    if (schema.value.multipleAsObjects) {
      return (model.value[schema.value.model] || []).map(
        (item: any) => item[schema.value.optionValueKey || "value"]
      );
    }
    return model.value[schema.value.model] || [];
  }
  return model.value[schema.value.model] || "";
});

const getMultipleItemProp = (item: any) => {
  if (schema.value.multipleAsObjects) {
    let defaultOption: any = {};
    defaultOption[schema.value.optionValueKey || "value"] = item[schema.value.optionValueKey || "value"];
    defaultOption[schema.value.optionLabelKey || "label"] = item[schema.value.optionLabelKey || "label"];
    return defaultOption;
  }
  return item["value"];
};

const getMultipleItemValues = (value: any) => {
  return Array(...value).reduce((acc: any[], option: any) => {
    acc.push(getMultipleItemProp(option));
    return acc;
  }, []);
};

const getValue = (value: any) => {
  return schema.value.multiple ? getMultipleItemValues(value) : value;
};

const emitEvent = (eventName: 'blured' | 'change-model', value: any, event: any = null) => {
  emit(eventName, {
    value: getValue(value),
    model,
    schema,
    id,
    originalEvent: event,
  });
};

const handleBlur = (event: any) => {
  emitEvent(
    "blured",
    schema.value.multiple
      ? Array.from(event.target.selectedOptions)
          .map((option: any) => schema.value.options
              .find((element: any) => String(element[schema.value.optionValueKey || "value"]) === String(option.value)))
      : event.target.value,
    event
  );
};

const handleChange = (event: any) => {
  emitEvent(
    "change-model",
    schema.value.multiple
      ? Array.from(event.target.selectedOptions)
          .map((option: any) => schema.value.options
              .find((element: any) => String(element[schema.value.optionValueKey || "value"]) === String(option.value)))
      : event.target.value,
    event
  );
};
</script>

<style scoped>
</style>
