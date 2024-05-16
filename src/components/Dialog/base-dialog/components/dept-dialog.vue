<template>
  <base-dialog ref="baseDialogRef" :load="load" :treeProps="treeProps" @change="onChange"></base-dialog>
  <!-- 触发条件的问题 我需要的是id 不是name  但是那么需要展示 -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import baseDialog from '../index.vue'
import { listDept, detailDept } from '@/api/dept'
const baseDialogRef = ref(null as any)
const treeProps = { value: 'id', label: 'deptName', children: 'children' }
const load = (data: any) => listDept({ parentId: data.id || '0' })
const emits = defineEmits(['change', 'input'])
const onChange = (list: any) => {
  emits('change', list)
  emits('input', list)
}
const open = async (ids: string[] = []) => {
  console.log("🚀 ~ open ~ ids:", ids)
  // let list = []
  // if (ids.length) {
  //   let res = await detailDept({ ids })
  //   console.log("🚀 ~ open ~ res:", res)
  //   list = res.data
  // } else {
  //   list = []
  // }
  // baseDialogRef.value.onOpen(list)
}
defineExpose({ open })
</script>

<style lang="scss" scoped></style>
