<template>
  <div class="form-group">
    {{ schema.label || '' }}
    <template v-for="(item, index) in localModel">
      <div v-for="(field, itemKey) in schema.items" :key="`group-${index}`" :id="`${index}-${itemKey}`">
        <slot
            name="field"
            :id="`${id}-${itemKey}-${index}`"
            :model="localFieldModel(index)"
            :schema="field"
            :index="index"
            @blur="handleBlur"
            @change-model="handleChange"
            @input="handleInput"
        ></slot>
      </div>
    </template>
    <slot
        name="button"
    ></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FormGroup',
  components: {},
  props: {
    schema: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({} as Record<string, any>)
    },
    model: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({} as Record<string, any>)
    },
    id: {}
  },
  computed: {
    localModel(): any {
      return this.model.hasOwnProperty(this.schema.model) && this.model[this.schema.model].length !== 0 ? this.model[this.schema.model] : [{}]
    }
  },
  methods: {
    localFieldModel(index: string | number) {
      return this.model.hasOwnProperty(this.schema.model) && this.model[this.schema.model][index] || {}
    },
    handleBlur(e: any) {
      this.$emit('blur', { ...e, groupModel: this.schema.model })
    },
    handleChange(e: any) {
      this.$emit('change-model', { ...e, groupModel: this.schema.model })
    },
    handleInput(e: any) {
      this.$emit('input', { ...e, groupModel: this.schema.model })
    }
  }
})
</script>

<style scoped>
.form-group {
  border: 1px blue solid;
  border-radius: 2px;
  margin: 2px;
}
</style>
