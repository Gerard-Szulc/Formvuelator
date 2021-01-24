<template>
  <button @click.prevent="handleClick"></button>
  <div v-for="(field, index) in schema" :key="`root-field-${index}`">
    <form-field
        :model="model"
        :schema="field"
        :id="field.model"
        @blur="handleBlur"
        @change-model="handleChange"
        @input="handleInput"
        @add-group-element="handleAddGroup"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import FormField from "./components/FormField.vue";

export default defineComponent({
  name: 'App',
  components: {
    FormField
  },
  setup: (props) => {

    const count = ref(0)
    const model = ref(
        {
          group1: [
            {
              field: 'asdasdffff',
              group4534: [
                {
                  fieldcvb: 'cccc'
                }
              ]
            },
            // {
            //   field: '',
            //   group4534: [
            //     {
            //       fieldcvb: ''
            //     }
            //   ]
            // }
          ]
        }
    )
    const schema = ref([
      {
        model: 'fieldaaaaaaaaaa',
        type: 'input',
        subtype: 'text'
      },
      {
        type: 'group',
        model: 'group1',
        items: [
          {
            model: 'field',
            type: 'input',
            subtype: 'text'
          },
          {
            type: 'group',
            model: 'group4534',
            items: [
              {
                model: 'fieldcvb',
                type: 'input',
                subtype: 'text'
              },
              {
                type: 'group',
                model: 'group45s34',
                items: [
                  {
                    model: 'pole',
                    type: 'input',
                    subtype: 'text'
                  },
                  {
                    model: 'fieldcvbssss',
                    type: 'input',
                    subtype: 'date'
                  }
                ]
              }
            ]
          }
        ]
      },
    ])

    const createModelByPropertiesPath = (currentModel, restPath, restIndex, fieldModel, data) => {
      let firstPathElement, firstIndexElement;
      [firstPathElement, ...restPath] = restPath;
      [firstIndexElement, ...restIndex] = restIndex;
      let subObject = {}

      if (firstPathElement && restPath.length === 0) {
        subObject[fieldModel] = data.value
      }

      if (!currentModel.hasOwnProperty(firstPathElement)) {
        currentModel[firstPathElement] = []

        if (!currentModel[firstPathElement].hasOwnProperty(firstIndexElement)) {
          currentModel[firstPathElement][firstIndexElement] = subObject
        } else {
          currentModel[firstPathElement] = [].push(subObject)
        }

      } else {

        if (!currentModel[firstPathElement][firstIndexElement]) {
          Array.isArray(currentModel[firstPathElement]) ? currentModel[firstPathElement].push(subObject) : currentModel[firstPathElement] = [].push(subObject)
        } else {
          currentModel[firstPathElement][firstIndexElement] = {...currentModel[firstPathElement][firstIndexElement], ...subObject}
        }
      }

      if (restPath.length === 0) {
        currentModel[firstPathElement][firstIndexElement] = {...currentModel[firstPathElement][firstIndexElement], ...subObject}
        return
      }
      createModelByPropertiesPath(currentModel[firstPathElement][firstIndexElement], restPath, restIndex, fieldModel, data)
    }

    const handleClick = () => {
      console.log(model.value)
    }
    const handleBlur = (data) => {
      console.log('blur', data)
    }
    const handleChange = (data) => {
      console.log('change', data)
    }

    const handleInput = (data) => {
      let modelData = model.value
      let fieldModel = data.schema.value.model

      if (data.hasOwnProperty('schemaModelPath') && data.hasOwnProperty('schemaModelIndex')) {
        createModelByPropertiesPath(model.value, data.schemaModelPath, data.schemaModelIndex, fieldModel, data)
      return
      }
      modelData[fieldModel] = data.value
      model.value = modelData
    }


    const handleAddGroup = (data) => {
      console.log('add', data);
      let [schemaModelPath, schemaModelIndex] = [data.schemaModelPath, data.schemaModelIndex]
    }

    return {count, model, schema, handleClick, handleBlur, handleChange, handleInput, handleAddGroup}
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
