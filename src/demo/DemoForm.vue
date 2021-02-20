<template>
  <FormVuelator
      :model="model"
      :schema="schema"
      @change-model="handleChangeModel"
      @model-created-property="handleCreateProperty"
      @model-created-index="handleCreateIndex"
  ></FormVuelator>
  <button @click="handleModel">clickme</button>
</template>

<script lang="ts">
import {FormVuelator} from "../../lib/main";
import {defineComponent} from "vue";

export default defineComponent({
  name: "DemoForm",
  components: {FormVuelator},
  data() {
    return {
      model: {},
      schema: [
        {
          model: 'field',
          type: 'input',
          subtype: 'text',
          label: 'input-text'
        },
        {
          model: 'fieldnumber',
          type: 'input',
          subtype: 'number',
          label: 'input-number'
        },
        {
          model: 'fieldtextarea',
          type: 'textarea',
          subtype: 'number',
          label: 'texterea'
        },
        {
          model: 'select',
          name: 'seledasdasdctfield',
          type: 'select',
          label: 'Select',
          options: [
            {label: 'label1', value: 1},
            {label: 'label2', value: 2}
          ],
          multiple: false,
        },
        {
          model: 'selectmulti',
          name: 'selectmulti',
          type: 'select',
          label: 'multiselect',
          multipleAsObjects: true,
          optionValueKey: 'tr',
          options: [{label: 'label1', tr: 1}, {label: 'label2', tr: 2}],
          multiple: true,
        },
        {
          type: 'group',
          model: 'group1',
          items: [
            {
              label: 'input-text-in-group',
              model: 'field',
              type: 'input',
              subtype: 'text'
            },
            {
              type: 'group',
              model: 'group1',
              items: [
                {
                  label: 'input-text-in-group',
                  model: 'field',
                  type: 'input',
                  subtype: 'text'
                },
                {
                  model: 'select',
                  name: 'seledasdasdctfield',
                  type: 'select',
                  label: 'Select',
                  options: [
                    {label: 'label1', value: 1},
                    {label: 'label2', value: 2}
                  ],
                  multiple: false,
                },

              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleChangeModel(e: Event) {
      console.log('change', e)
    },
    handleCreateProperty (e: Event) {
      console.log('createprop', e)
    },
    handleCreateIndex (e: Event) {
      console.log('createoindex', e)
    },
    handleModel (e: Event) {
      e.preventDefault()
      console.log(this.model)
    }
  }
})
</script>

<style scoped>

</style>
