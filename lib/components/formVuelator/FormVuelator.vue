<template>
  <div v-for="(field, index) in schema" :key="`root-field-${index}`">
    <form-field
        :model="model"
        :schema="field"
        :id="field.model"
        @blured="handleBlur"
        @change-model="handleChange"
        @form-input="handleInput"
        @add-group-element="handleAddGroup"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, toRefs} from 'vue'
import FormField from "../helperFields/FormField.vue";

export default defineComponent({
  name: 'FormVuelator',
  components: {
    FormField
  },
  props: {
    model: {type: Object, required: true},
    schema: {type: Array, required: true},
    id: {}
  },
  emits: ['change-model', 'model-created-property', 'model-created-index'],
  setup: (props, ctx) => {

    const {model, schema, id} = toRefs(props)


    const createModelByPropertiesPath = (currentModel: any, restPath: any, restIndex: any, fieldModel: any, data: any) => {
      let firstPathElement, firstIndexElement;
      [firstPathElement, ...restPath] = restPath;
      [firstIndexElement, ...restIndex] = restIndex;
      type subObject<K extends string> = {
        [key in K]: any
      }
      let subObject: subObject<string> = {}

      if (firstPathElement && restPath.length === 0) {
        subObject[fieldModel] = data.value
      }
      console.log('trpp', subObject, currentModel, restPath, restIndex, fieldModel, data)

      if (!currentModel.hasOwnProperty(firstPathElement)) {
        currentModel[firstPathElement] = []
        if (!currentModel[firstPathElement].hasOwnProperty(firstIndexElement)) {
          currentModel[firstPathElement][firstIndexElement] = subObject
        } else {
          currentModel[firstPathElement] = []
          currentModel[firstPathElement] = currentModel[firstPathElement].push(subObject)
          ctx.emit('model-created-property', {currentModel: currentModel, pathElement: firstPathElement, indexElement: firstIndexElement, schema: data.schema.value}, )
          console.log('trollo2')

        }

      } else {

        if (!currentModel[firstPathElement][firstIndexElement]) {
          if(Array.isArray(currentModel[firstPathElement])) {
            currentModel[firstPathElement].push(subObject)
          } else {
            currentModel[firstPathElement] = []
            currentModel[firstPathElement] = currentModel[firstPathElement].push(subObject)
          }
          ctx.emit('model-created-index', {currentModel: currentModel, pathElement: firstPathElement, indexElement: firstIndexElement, schema: data.schema.value}, )
          console.log('trollo1')
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

    const handleBlur = (data: any) => {
      console.log('blur', data)
    }
    const handleChange = (data: any) => {
      console.log('change', data)
      let modelData = model.value
      let fieldModel = data.schema.value.model

      if (data.hasOwnProperty('schemaModelPath') && data.hasOwnProperty('schemaModelIndex')) {
        createModelByPropertiesPath(model.value, data.schemaModelPath, data.schemaModelIndex, fieldModel, data)
        return
      }
      modelData[fieldModel] = data.value
      ctx.emit('change-model', modelData, data.schema.value)
    }

    const handleInput = (data: any) => {
      console.log(data)
      let modelData = model.value
      let fieldModel = data.schema.value.model

      if (data.hasOwnProperty('schemaModelPath') && data.hasOwnProperty('schemaModelIndex')) {
        createModelByPropertiesPath(model.value, data.schemaModelPath, data.schemaModelIndex, fieldModel, data)
        return
      }
      console.log(data.value)
      modelData[fieldModel] = data.value
      ctx.emit('change-model', modelData, data.schema.value)
    }


    const handleAddGroup = (data: any) => {
      console.log('add', data);
      // let fieldModel = data.groupSchema.model
      // let modelData = model.value

      let [schemaModelPath, schemaModelIndex] = [data.customEvent.schemaModelPath, data.customEvent.schemaModelIndex]

    }

    return {model, schema, handleBlur, handleChange, handleInput, handleAddGroup, id}
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
