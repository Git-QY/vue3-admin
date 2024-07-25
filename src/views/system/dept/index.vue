<template>
  <page-table v-bind="tableConfig" ref="tableRef">
    <template #btnleft>
      <el-button type="primary" v-auth="['system.role.add']" @click="onAdd">新增</el-button>
    </template>
    <template #operate="{ item }">
      <el-table-column v-slot="{ row }" v-bind="item">
        <el-button type="primary" v-auth="['system.role.edit']" link @click="onEdit(row)">编辑</el-button>
        <el-button type="danger" v-auth="['system:role:delete']" link @click="onDelete(row.id)">删除</el-button>
      </el-table-column>
    </template>
  </page-table>
  <editDialog :title="title" ref="editDialogRef"></editDialog>
</template>

<script lang="ts" setup>
import { listDept, deleteDept, Dept } from '@/api'
import editDialog from './dialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const tableConfig = ref({
  table: { rowKey: 'id' },
  type: 'tree',
  searchForm: {},
  // 可以通过pomise构建需要的格式
  api: (data: any) => {
    return listDept(data)
  },
  columns: [
    { prop: 'deptName', label: '部门名称', query: {} },
    { prop: 'leader', label: '部门负责人' },
    { prop: 'phone', label: '联系电话' },
    { prop: 'email', label: '联系邮箱' },
    { prop: 'status', label: '状态' },
    { prop: 'createBy', label: '创建人' },
    { prop: 'remark', label: '备注' },
    { prop: 'operate', label: '操作', type: 'slot' },
  ],
})
const editDialogRef = ref<HTMLFormElement | null>(null)
const title = ref<string>('')
const onAdd = () => {
  editDialogRef.value?.open()
  title.value = '新增'
}
const onEdit = (row: Dept) => {
  editDialogRef.value?.open(row)
  title.value = '编辑'
}
const onDelete = (id: string) => {
  ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await deleteDept(id)
      ElMessage({
        type: 'success',
        message: '删除成功!',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}
</script>

<style lang="scss" scoped></style>
