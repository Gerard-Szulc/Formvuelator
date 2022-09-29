<template>
  <label :for="id">
    {{ schema.label || "" }}
    <select
      :id="id"
      :value="value"
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
              ? value.includes(String(option[schema.optionValueKey || 'value']))
              : value === option[schema.optionValueKey || 'value']
          "
        >
          {{ option[schema.optionLabelKey || "label"] }}
        </option>
      </template>
    </select>
  </label>
</template>

<script lang="ts">
import { toRefs, defineComponent } from "vue";

export default defineComponent({
  name: "FormSelect",
  props: {
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
  },
  computed: {
    value: {
      get(): any {
        if (this.schema.multiple) {
          if (this.schema.multipleAsObjects) {
            return (this.model[this.schema.model] || []).map(
              (item: any) => item[this.schema.optionValueKey || "value"]
            );
          }
          return this.model[this.schema.model] || [];
        }
        return this.model[this.schema.model] || "";
      },
      set(value: any, ...data: any) {
        return value;
      },
    },
  },
  setup(props, context) {
    const { model, schema, id } = toRefs(props);
    const getMultipleItemProp = (item: any) => {
      if (schema.value.multipleAsObjects) {
        let defaultOption: any = {};
        defaultOption[schema.value.optionValueKey || "value"] = item["value"];
        defaultOption[schema.value.optionLabelKey || "label"] = item["label"];
        return defaultOption;
      }
      return item["value"];
    };

    const getMultipleItemValues = (value: any) => {
      return Array(...value).reduce((acc, option) => {
        acc.push(getMultipleItemProp(option));
        return acc;
      }, []);
    };

    const getValue = (value: any) => {
      return schema.value.multiple ? getMultipleItemValues(value) : value;
    };

    const emitEvent = (eventName: any, value: any, event: any = null) => {
      context.emit(eventName, {
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
          ? event.target.selectedOptions
          : event.target.value,
        event
      );
    };

    const handleChange = (event: any) => {
      console.log("eeee", event.target.selectedOptions);
      emitEvent(
        "change-model",
        schema.value.multiple
          ? event.target.selectedOptions
          : event.target.value,
        event
      );
    };
    return { handleBlur, handleChange, emitEvent };
  },
});
</script>

<style scoped>
</style>
