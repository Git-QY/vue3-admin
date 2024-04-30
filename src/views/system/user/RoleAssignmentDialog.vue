<template>
  <Dialog v-model="visible" title="分配角色" @confirm="onConfirm" @cancel="onCancel" width="40%" ref="dialogRef" :loading="loading">
    <template #content>
      <page-table v-bind="tableConfig" ref="tableRef"></page-table>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { listRole, Role } from '@/api'
import api, { User } from '@/api/user'
import { ElMessage } from 'element-plus'
const props = defineProps({ refresh: { type: Function, default: () => {} } })
const visible = ref(false)
const dialogRef = ref<HTMLFormElement | null>(null)
const userIds = ref<string[]>([])
const open = (list: User[]) => {
  userIds.value = list.map(item => item.id) as string[]
  visible.value = true
}
const loading = ref(false)
const onConfirm = async () => {
  const roleIds = tableRef.value?.selectData.map((item: Role) => item.id)
  if (tableRef.value?.selectData.length == 0) return ElMessage.warning('请选择角色')
  try {
    loading.value = true
    await api.assignRoles({ userIds: userIds.value, roleIds })
    visible.value = false
    // 刷新列表
    props.refresh()
    ElMessage.success('分配权限成功')
  } catch (error) {
    ElMessage.error('分配权限失败')
  } finally {
    loading.value = false
  }
}
const onCancel = () => {
  visible.value = false
}
const tableRef = ref<HTMLFormElement | null>(null)
const tableConfig = {
  table: { rowKey: 'id' },
  searchForm: {},
  maxShow: 1,
  api: (data: any) => {
    return listRole(data)
  },
  columns: [
    { type: 'selection', fixed: 'left', 'reserve-selection': true, width: 40 },
    { prop: 'roleName', label: '角色名', query: {} },
    { prop: 'status', label: '状态' },
  ],
}
defineExpose({ open })
</script>

<style lang="scss" scoped></style>
