<template>
  <div v-for="(field, index) in schema" :key="`root-field-${index}`">
    <form-field
        :model="modelValue"
        :schema="field"
        :id="`${id || ''}-${field.model}`"
        @blured="handleBlur"
        @change-model="handleChange"
        @form-input="handleInput"
        @add-group-element="handleAddGroup"
    />
  </div>
</template>
<script setup lang="ts">
import FormField from "../helperFields/FormField.vue";
import { toRefs } from "vue";

const props = defineProps<{
  modelValue: Record<string, any>,
  schema: Record<string, Record<string, any>>,
  id?: string
}>()
const emit = defineEmits(['change-model', 'update:model-value', 'model-created-property', 'model-created-index'])
const { modelValue, schema, id } = toRefs(props)


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
      emit('model-created-property', {currentModel: currentModel, pathElement: firstPathElement, indexElement: firstIndexElement, schema: data.schema.value}, )
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
      emit('model-created-index', {currentModel: currentModel, pathElement: firstPathElement, indexElement: firstIndexElement, schema: data.schema.value}, )
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
  let modelData = modelValue.value
  let fieldModel = data.schema.value.model

  if (data.hasOwnProperty('schemaModelPath') && data.hasOwnProperty('schemaModelIndex')) {
    createModelByPropertiesPath(modelValue.value, data.schemaModelPath, data.schemaModelIndex, fieldModel, data)
    return
  }
  modelData[fieldModel] = data.value
  emit('change-model', modelData, data.schema.value)
  emit('update:model-value', modelData)
}

const handleInput = (data: any) => {
  console.log(data)
  let modelData = modelValue.value
  let fieldModel = data.schema.value.model

  if (data.hasOwnProperty('schemaModelPath') && data.hasOwnProperty('schemaModelIndex')) {
    createModelByPropertiesPath(modelValue.value, data.schemaModelPath, data.schemaModelIndex, fieldModel, data)
    return
  }
  console.log(data.value)
  modelData[fieldModel] = data.value
  emit('change-model', modelData, data.schema.value)
  emit('update:model-value', modelData)

}

const handleNestedPathAddGroup = (model: Record<string, any>, path: string[]) => {
  let firstPathElement = path[0]
  let restPath = path.slice(1)
  if (!model.hasOwnProperty(firstPathElement)) {
    model[firstPathElement] = [{}]
  }
  if (restPath.length === 0) {
    model[firstPathElement].push({})
    return
  }
  handleNestedPathAddGroup(model[firstPathElement], restPath)
}
const handleAddGroup = (data: any) => {
  console.log(data)
  handleNestedPathAddGroup(modelValue.value, data.path)
  emit('update:model-value', modelValue.value)



}
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
