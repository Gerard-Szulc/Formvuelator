<template>
  <div class="form-field">
    <form-input
        v-if="schema.type === 'input'"
        :id="`${id}-${schema.model}`"
        :model="model"
        :schema="schema"
        @blured="handleInputBlur"
        @change-model="handleChange"
        @form-input="handleInput"
    />
    <form-textarea
        v-if="schema.type === 'textarea'"
        :id="`${id}-${schema.model}`"
        :model="model"
        :schema="schema"
        @blured="handleInputBlur"
        @change-model="handleChange"
        @form-input="handleInput"
    />
    <form-select
        v-if="schema.type === 'select'"
        :id="`${id}-${schema.model}`"
        :model="model"
        :schema="schema"
        @blured="handleInputBlur"
        @change-model="handleChange"
    />
    <form-group
        v-if="schema.type === 'group'"
        :model="model"
        :schema="schema"
        :id="`${id}-${schema.model}`"
        @blured="handleInputBlur"
        @change-model="handleChange"
        @form-input="handleInput"
    >
      <template v-slot:field="slotProps">
        <form-field
            :id="slotProps.id"
            :model="slotProps.model"
            :schema="slotProps.schema"
            @blured="(e) => handleInputGroupBlur(e, schema, slotProps)"
            @change-model="(e) => handleGroupChange(e, schema, slotProps)"
            @form-input="(e) => handleGroupInput(e, schema, slotProps)"
            @add-group-element="(e) => addGroupElement(e, schema, slotProps)"
        />
      </template>
      <template v-slot:button="slotProps">
        <button @click="(e) => addGroupElement(e, schema, slotProps)">add</button>
      </template>

    </form-group>

  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import FormInput from "../fields/FormInput.vue";
import FormTextarea from "../fields/FormTextarea.vue";
import FormGroup from "./FormGroup.vue";
import FormSelect from "../fields/FormSelect.vue";

export default defineComponent({
  name: 'FormField',
  components: {
    FormSelect,
    FormGroup,
    FormTextarea,
    FormInput
  },
  props: {
    model: {required: true, type: Object as PropType<Record<string, any>>},
    schema: {required: true, type: Object as PropType<Record<string, any>>},
    id: {
      type: String,
      required: true
    }
  },
  mounted() {

  },
  methods: {
    handleInputBlur(event: any) {
      this.$emit('blured', event)
    },
    handleChange(event: any) {
      this.$emit('change-model', event)
    },
    handleInput(event: any) {
      this.$emit('form-input', event)
    },
    handleInputGroupBlur(event: any, groupSchema: any, slotProps: any) {
      event.schemaModelPath = [groupSchema.model, ...(event.schemaModelPath || [])]
      event.schemaModelIndex = [slotProps.index, ...(event.schemaModelIndex || [])]
      this.$emit('blured', event, groupSchema, slotProps)

      // console.log('group-blur', event, groupSchema, slotProps)
      // this.$emit('blur', event)
    },
    handleGroupChange(event: any, groupSchema: any, slotProps: any) {
      event.schemaModelPath = [groupSchema.model, ...(event.schemaModelPath || [])]
      event.schemaModelIndex = [slotProps.index, ...(event.schemaModelIndex || [])]
      this.$emit('change-model', event, groupSchema, slotProps)

      // console.log('group-change', event, groupSchema, slotProps)

      // this.$emit('change-model', event)
    },
    handleGroupInput(event: any, groupSchema: any, slotProps: any) {
      event.schemaModelPath = [groupSchema.model, ...(event.schemaModelPath || [])]
      event.schemaModelIndex = [slotProps.index, ...(event.schemaModelIndex || [])]
      this.$emit('form-input', event, groupSchema, slotProps)

      // console.log('group-input', event, groupSchema, slotProps)

      // this.$emit('input', event)
    },
    addGroupElement(event: any, groupSchema: any, slotProps: any) {
      type customEvent = {
        schemaModelPath?: any;
        schemaModelIndex?: any;
      }
      let customEvent: customEvent = {}
      customEvent.schemaModelPath = [groupSchema.model, ...(customEvent.schemaModelPath || [])]
      customEvent.schemaModelIndex = [slotProps.index, ...(customEvent.schemaModelIndex || [])]

      this.$emit('add-group-element', {customEvent, groupSchema, slotProps})
    },
  }
})
</script>

<style scoped>

</style>
