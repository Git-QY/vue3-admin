<template>
  <el-form ref="formRef" :model="props.modelValue" labelWidth="100px">
    <el-row :gutter="10">
      <el-col v-for="item in editColumns" :key="item.prop" v-bind="item">
        <el-form-item v-bind="item">
          <slot :name="item.prop" :item="item">
            <FormItem :item="item" :form="props.modelValue"></FormItem>
          </slot>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import FormItem from '../FormItem/index.vue'
import type { FormInstance } from 'element-plus'
import { evaluateConditions } from '../index'
import { getValidationRules } from '@/utils/validator'

interface Props {
  modelValue: any
  columns: any[]
  inline?: Boolean
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
import { useDictStore } from '@/store'
const dictStore = useDictStore()
const editColumns = computed(() => {
  return formColumns.value.map(item => {
    item.rules = typeof item.rules === 'string' ? addRules(item.rules, item) : item.rules
    if (item.dict) {
      item.options = dictStore.dictDataGetter[item.dict]
    }
    return item
  })
})
const formColumns = ref(props.columns || [])
// addRules
const addRules = (rules: any, item: any) => {
  if (!rules) return
  if (typeof rules === 'object') return rules // 如果是数组直接返回
  const [type, folg] = rules.split('-')
  const validationRules = getValidationRules(item, folg)
  return validationRules[type]
}
const formRef = ref<FormInstance | undefined>()
// 校验数据
const validateForm = async () => {
  if (!formRef.value) return console.log('formRef is null')
  return await formRef.value?.validate(valid => valid)
}
// 重置校验
const resetForm = () => {
  if (!formRef.value) return console.log('formRef is null')
  formRef.value?.resetFields()
}
defineExpose({ formRef, resetForm, validateForm })

// 处理表单根据数据联动
watch(
  () => props.modelValue,
  val => {
    formColumns.value = props.columns
      .map(item => {
        if (item.mate) {
          return evaluateConditions(item.mate, val) ? item : null
        }
        return item
      })
      .filter(item => item !== null)
  },
  { deep: true, immediate: true },
)
// 统一处理dict
onMounted(async () => {
  const dicts = props.columns.filter(item => item.dict).map(item => item.dict)
  await dictStore.getDicts(dicts)
})
</script>
<style lang="scss" scoped></style>
