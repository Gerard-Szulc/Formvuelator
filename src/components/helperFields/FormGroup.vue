<template>
      <div class="form-group">
        {{ schema.label || '' }}
        <template v-for="(item, index) in localModel()">
          <div v-for="(field) in schema.items" :key="`group-${index}`" :id="`${index}-${field.model}`">
            {{ field.model + field.type }}
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
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'FormGroup',
  components: {
  },
  props: {
    schema: {},
    model: {},
    id: {}
  },
  computed: {

  },
  methods: {
    localFieldModel (index: string | number): Object<any> {
      return this.model.hasOwnProperty(this.schema.model) && this.model[this.schema.model][index] || {}
    },
    localModel (): Object<any> {
      // console.log('groupmodel', this.model, this.schema.model)
      return this.model.hasOwnProperty(this.schema.model) && this.model[this.schema.model].length !== 0 ? this.model[this.schema.model] : [{}]
    },
    handleBlur (e) {
      this.$emit('blur', {...e, groupModel: this.schema.model})
    },
    handleChange (e) {
      this.$emit('change-model', {...e, groupModel: this.schema.model})
    },
    handleInput (e) {
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
