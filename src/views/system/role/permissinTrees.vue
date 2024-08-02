<template>
  <Dialog v-model="visible" @cancel="cancel" @confirm="confirm" width="50%" title="角色权限" :confirmLoading="confirmLoading">
    <template #content> <Panel v-bind="config" v-model:selected="selected"></Panel> </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { listMenu, detailMenu, updateRoleField } from '@/api'
import Dialog from '@/components/Dialog/index.vue'
import Panel from '@/views/module/business/pickTreeOrList/components/panel.vue'
import { useElementUI } from '@/hooks/useMessage'
const { showMessage } = useElementUI()
const props = defineProps({
  confirm: { type: Function, default: () => {} },
})
const visible = ref<boolean>(false)
const selected = ref([])
const curItem = ref<any>({})
const confirmLoading = ref(false)
const config = reactive({
  getList: listMenu,
  getIdList: detailMenu,
  multiple: true,
  mode: 'tree',
  options: { label: 'menuName', value: 'id', children: 'children' },
})
const cancel = () => {
  visible.value = false
}
const confirm = async () => {
  try {
    confirmLoading.value = true
    const ids = selected.value.map((item: any) => item.id)
    await updateRoleField({ id: curItem.value.id, fieldName: 'permissions', fieldValue: ids })
    props.confirm()
    showMessage('修改成功')
  } catch (error) {
    showMessage('修改失败' + error, 'error')
  } finally {
    confirmLoading.value = false
    cancel()
  }
}
const open = async (row: any) => {
  curItem.value = row
  await getDetails(row.permissions)
  visible.value = true
}
const getDetails = async (ids: string[]) => {
  if (ids && !ids.length) return
  const res = await config.getIdList({ ids })
  selected.value = res.data
}
defineExpose({ open })
</script>

<style lang="scss" scoped></style>
