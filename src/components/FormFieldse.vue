<template>
  <div class="form-field">
    <form-input
        v-if="schema.type === 'input'"
        :id="`${id}-${schema.model}`"
        :model="model"
        :schema="schema"
        @blur="handleInputBlur"
    />
    <form-textarea
        v-if="schema.type === 'textarea'"
        :id="`${id}-${schema.model}`"
        :model="model"
        :schema="schema"
    />
    <form-group
        v-if="schema.type === 'group'"
        :model="model"
        :schema="schema"
        :id="`${id}-${schema.model}`"
    />

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormInput from "./fields/FormInput.vue";
import FormTextarea from "./fields/FormTextarea.vue";
import FormGroup from "./FormGroup.vue";

export default defineComponent({
  name: 'FormFieldse',
  components: {
    FormGroup,
    FormTextarea,
    FormInput},
  props: {
    model: {required: true},
    schema: {required: true},
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    handleInputBlur (e) {
      console.log(e)
    }
  }
})
</script>

<style scoped>

</style>
