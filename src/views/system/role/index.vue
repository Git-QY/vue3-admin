<template>
  <page-table v-bind="tableConfig" ref="tableRef">
    <template #btnleft>
      <el-button type="primary" v-auth="['system.role.add']" @click="onAdd">新增</el-button>
      <el-button type="primary" v-auth="['system.role.delete']" @click="onDeleteBatch">批量删除</el-button>
    </template>
    <template #operate="{ item }">
      <el-table-column v-slot="{ row }" v-bind="item">
        <el-button type="primary" v-auth="['system.role.edit']" link @click="onEdit(row)">编辑</el-button>
        <el-button type="primary" v-auth="['system:role:assign']" link @click="onPermissions(row)">分配权限</el-button>
        <el-button type="danger" v-auth="['system:role:delete']" link @click="onDelete(row.id)">删除</el-button>
      </el-table-column>
    </template>
  </page-table>
  <!-- 添加弹窗 -->
  <roleDialog ref="roleDialogRef" :title="title" :confirm="refresh"></roleDialog>
  <permissinTrees ref="permissinTreesRef" :confirm="refresh"></permissinTrees>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
import roleDialog from './roleDialog.vue'
import permissinTrees from './permissinTrees.vue'
import { Role, deleteRole, listRole } from '@/api'

const tableConfig = reactive({
  table: { rowKey: 'id' },
  searchForm: {},
  // 可以通过pomise构建需要的格式
  api: (data: any) => {
    return listRole(data)
  },
  columns: [
    { type: 'selection', fixed: 'left', width: 40, 'reserve-selection': true },
    { prop: 'id', label: 'ID', 'show-overflow-tooltip': true },
    { prop: 'roleName', label: '角色名', query: {} },
    { prop: 'remark', label: '备注' },
    {
      prop: 'status',
      label: '状态',
      type: 'tag',
      dict: 'role_status',
    },
    { prop: 'createTime', label: '创建时间', formatter: (row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') },
    { prop: 'updateTime', label: '更新时间', formatter: (row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') },
    { prop: 'operate', label: '操作', type: 'slot', fixed: 'right', width: 200 },
  ],
})
const tableRef = ref(null as any)
const roleDialogRef = ref(null as any)
const title = ref('新增')

const onAdd = () => {
  roleDialogRef.value.open()
  title.value = '新增'
}
const onEdit = (row: Role) => {
  title.value = '编辑'
  roleDialogRef.value.open(row)
}
const onDelete = (id: string) => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await deleteRole({ id })
      ElMessage.success('删除成功')
      refresh()
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}
const onDeleteBatch = () => {
  if (tableRef.value?.selectData.length === 0) {
    ElMessage.warning('请选择要删除的角色')
    return
  }
  ElMessageBox.confirm('此操作将永久删除该角色, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const ids = tableRef.value?.selectData.map((item: Role) => item.id)
      await deleteRole({ ids })
      refresh()
      ElMessage.success('删除成功')
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}
const permissinTreesRef = ref<HTMLFormElement | null>(null)
const onPermissions = (row: Role) => {
  permissinTreesRef.value?.open(row)
}
// 刷新表格
const refresh = () => {
  tableRef.value.refresh()
}
</script>

<style lang="scss" scoped></style>
