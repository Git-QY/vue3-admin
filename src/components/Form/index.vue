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
  return props.columns.map(item => {
    item.rules = typeof item.rules === 'string' ? addRules(item.rules, item) : item.rules
    if (item.dict) {
      item.options = dictStore.dictDataGetter[item.dict]
    }
    return item
  })
})

// addRules
const addRules = (rules: any, item: any) => {
  if (!rules) return
  const [type, folg] = rules.split('-')
  switch (type) {
    case 'must': // 不需其他要校验的必填字段
      return { required: true, message: `${item.label}不能为空`, trigger: ['blur', 'change'] }
      break
    // case 'phone':
    //   return checkRule(item, folg, 校验规则)
    //   break
  }
}

// 检验规则
const checkRule = (item: any, folg: string, validator: any) => {
  return folg == '1'
    ? [
        { required: true, message: `${item.label}不能为空`, trigger: ['blur', 'change'] },
        { validator, trigger: ['blur', 'change'] },
      ]
    : { validator, trigger: ['blur', 'change'] }
}

const formRef = ref<FormInstance | undefined>()
// 校验数据
const validateForm = async () => {
  return await formRef.value?.validate(valid => valid)
}
// 重置校验
const resetForm = () => {
  if (!formRef.value) return
  formRef.value?.resetFields()
}
defineExpose({ formRef, resetForm, validateForm })

onMounted(async () => {
  // 统一处理dict
  const dicts = props.columns.filter(item => item.dict).map(item => item.dict)
  await dictStore.getDicts(dicts)
})
</script>
<style lang="scss" scoped></style>
