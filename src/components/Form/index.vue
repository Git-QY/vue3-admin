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
// addRules
const addRules = (rules: any, item: any) => {
  if (!rules) return
  if (typeof rules === 'object') return rules // 如果是数组直接返回
  const [type, folg] = rules.split('-')
  const validationRules: any = {
    must: {
      required: true,
      message: `${item.label}不能为空`,
      trigger: ['blur', 'change'],
    },
    // 正整数
    int: checkRule(item, folg, (rule: any, value: any, callback: any) => {
      if (!/^[1-9]\d*$/.test(value)) {
        callback(new Error(`${item.label}必须为正整数`))
      } else {
        callback()
      }
    }),
    // 移动手机
    phone: checkRule(item, folg, (rule: any, value: any, callback: any) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error(`${item.label}格式不正确`))
      } else {
        callback()
      }
    }),
    // 邮箱
    email: checkRule(item, folg, (rule: any, value: any, callback: any) => {
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        callback(new Error(`${item.label}格式不正确`))
      } else {
        callback()
      }
    }),
    // 小数
    decimal2: checkRule(item, folg, (rule: any, value: any, callback: any) => {
      if (!/^(0|[1-9][0-9]*)(\.[0-9]{1,2})?$/.test(value)) {
        callback(new Error(`${item.label}保留2位小数`))
      } else {
        callback()
      }
    }),
  }
  return validationRules[type]
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
