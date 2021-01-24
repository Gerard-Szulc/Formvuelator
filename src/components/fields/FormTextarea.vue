<template>
  <label :for="id">
    {{ schema.label || ''}}
    <textarea :id="id" v-model="model[schema.model]"/>
  </label>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'FormTextarea',
  props: {
    model: {required: true},
    schema: {required: true},
    id: {
      type: String,
      required: true
    }
  },
})
</script>

<style scoped>

</style>
