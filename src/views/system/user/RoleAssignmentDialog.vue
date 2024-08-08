<template>
  <Dialog v-model="visible" @cancel="cancel" @confirm="confirm" width="50%" title="角色权限" :confirmLoading="confirmLoading">
    <template #content> <Panel v-bind="config" v-model:selected="selected"></Panel> </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { listRole, detailRole, Role } from '@/api'
import api from '@/api/user'
import Dialog from '@/components/Dialog/index.vue'
import Panel from '@/components/FormItem/panel/index.vue'
import { useElementUI } from '@/hooks/useMessage'
const { showMessage } = useElementUI()
const props = defineProps({
  confirm: { type: Function, default: () => {} },
})
const visible = ref<boolean>(false)
const selected = ref([])
const confirmLoading = ref(false)
const config = reactive({
  getList: listRole,
  getIdList: detailRole,
  multiple: true,
  mode: 'nodeList',
  options: { label: 'roleName', value: 'id', children: 'children', page: { page: 1, pageSize: 100 } },
  isRightPanel: true,
})
const cancel = () => {
  visible.value = false
}
const userIds = ref([])
const confirm = async () => {
  const roleIds: any[] = selected.value.map((item: Role) => item.id)
  try {
    confirmLoading.value = true
    await api.assignRoles({ userIds: userIds.value, roleIds })
    visible.value = false
    // 刷新列表
    props.confirm()
    showMessage('分配权限成功')
  } catch (error) {
    showMessage('分配权限失败', 'error')
  } finally {
    confirmLoading.value = false
  }
}
const open = async (row: any) => {
  selected.value = []
  if (row.length === 1) {
    await getDetails(row[0].roleIds)
  }
  visible.value = true
  userIds.value = row.map((item: any) => item.id)
}
const getDetails = async (ids: string[]) => {
  if (ids && !ids.length) return
  const res = await config.getIdList({ ids })
  selected.value = res.data
}
defineExpose({ open })
</script>

<style lang="scss" scoped></style>
