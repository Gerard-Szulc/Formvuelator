<template>
      <div class="form-group">
        {{ schema.label || '' }}
        <template v-for="(item, index) in localModel()">
          <div v-for="(field) in schema.items" :key="`group-${index}`" :id="`${index}-${field.model}`">
            <slot
                name="field"
                :id="`${id}-${field.model}-${index}`"
                :model="localFieldModel(index)"
                :schema="field"
                :index="index"
                @blur="handleBlur"
                @change-model="handleChange"
                @input="handleInput"
            ></slot>

          </div>
          <slot
              name="button"
              :index="index"
          ></slot>
        </template>
      </div>
</template>
<script lang="ts">
import {defineComponent, PropType} from 'vue'

export default defineComponent({
  name: 'FormGroup',
  components: {
  },
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

  },
  methods: {
    localFieldModel (index: string | number) {
      return this.model.hasOwnProperty(this.schema.model) && this.model[this.schema.model][index] || {}
    },
    localModel (): any {
      // console.log('groupmodel', this.model, this.schema.model)
      return this.model.hasOwnProperty(this.schema.model) && this.model[this.schema.model].length !== 0 ? this.model[this.schema.model] : [{}]
    },
    handleBlur (e: any) {
      this.$emit('blur', {...e, groupModel: this.schema.model})
    },
    handleChange (e: any) {
      this.$emit('change-model', {...e, groupModel: this.schema.model})
    },
    handleInput (e: any) {
      this.$emit('input', {...e, groupModel: this.schema.model})
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
