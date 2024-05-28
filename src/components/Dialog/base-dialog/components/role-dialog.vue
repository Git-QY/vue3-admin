<template>
  <baseDialog ref="baseDialogRef" title="角色弹窗选择" v-bind="config" @confirm="onConfirm"></baseDialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { listRole } from '@/api'
import baseDialog from '@/components/Dialog/base-dialog/index.vue'
const props = defineProps({
  multiple: { type: Boolean, default: false }, //   是否多选
})
const onLoad = (data: any) => listRole(data)
const config = ref({
  prop: {
    label: 'roleName', // 显示字段
    value: 'id', // 值字段
    children: 'children', // 子级字段
  },
  onLoad,
  multiple: props.multiple,
})
const emits = defineEmits(['update:modelValue', 'confirm'])
const baseDialogRef = ref<InstanceType<typeof baseDialog>>()
const open = async (list: any = []) => {
  baseDialogRef.value?.open(list)
}
const onConfirm = (list: any[]) => {
  emits('confirm', list)
}
defineExpose({ open })
</script>

<style lang="scss" scoped></style>
