<template>
  <div class="dialogPick-wrapper">
    <slot :names="names"><el-button @click="open">打开弹窗</el-button> </slot>
    <Dialog v-model="visible" @cancel="cancel" @confirm="confirm" width="50%">
      <template #content> <Panel v-bind="{ getList, getIdList, multiple, mode, options }" v-model:selected="selected"></Panel> </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import Panel from '@/components/FormItem/dropdownTree/panel.vue'
import Dialog from '@/components/Dialog/index.vue'
const props = defineProps({
  modelValue: { type: [String, Array] },
  multiple: { type: Boolean, default: false },
  mode: { type: String, default: 'list' },
  options: {
    type: Object,
    default: () => ({
      label: 'roleName',
      value: 'id',
      children: 'children',
    }),
  },
  getList: { type: Function, default: () => {} }, // 懒加载函数
  getIdList: { type: Function, default: () => {} }, // 获取选中详情
})
const emit = defineEmits(['update:modelValue'])
const visible = ref(false)
const name = props.options.label
const id = props.options.value
const cancel = () => {
  visible.value = false
}
const open = () => {
  visible.value = true
}
const names = ref('')
const confirm = () => {
  visible.value = false
  const value = props.multiple ? selected.value.map((item: any) => item[id]) : selected.value[0][id]
  emit('update:modelValue', value)
  names.value = selected.value.map((item: any) => item[name]).join(',')
}
const selected = ref([])
const getDetails = async () => {
  const ids: any = props.multiple ? props.modelValue : [props.modelValue]
  const res = await props.getIdList({ ids })
  selected.value = res.data
  names.value = selected.value.map((item: any) => item[name]).join(',')
}
onMounted(async () => {
  await getDetails()
})

defineExpose({ open })
</script>

<style lang="scss" scoped></style>
