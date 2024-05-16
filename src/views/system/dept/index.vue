<script setup lang="ts">
import deptDialog from './dialog.vue'
import { onMounted, ref, reactive } from 'vue';
import { listDept, deleteDept } from '../../../api/dept';
import { DICTS } from '@/utils/enums'
import { ElMessage, ElMessageBox } from 'element-plus';
const tableConfig = reactive({
  table: { rowKey: 'id' },
  searchForm: {},
  api: () => {
    return listDept({ deptName: '' })
  },
  columns: [
    { prop: 'id', label: 'ID', 'show-overflow-tooltip': true },
    { prop: 'deptName', label: '部门名称', query: {} },
    { prop: 'phone', label: '联系电话' },
    { prop: 'email', label: '邮箱' },
    {
      prop: 'status',
      label: '状态',
      type: 'tag',
      options: DICTS.deptStatus,
    },
    { prop: 'createTime', label: '创建时间' },
    { prop: 'updateTime', label: '更新时间' },
    { prop: 'remark', label: '备注' },
    { prop: 'operate', label: '操作', type: 'slot', fixed: 'right', width: 200 },
  ],
  page: {
    total: 0,
    page: 1,
    pageSize: 10,
    pageSizes: [],
    layout: '',
  },
})
const tableRef = ref(null as any)
// 弹框dom
const deptDialogRef = ref(null as any)

onMounted(() => {
  // getDeptList()
})
// const getDeptList = async () => {
//   const data = await listDept({ deptName: '1' })
//   console.log(data, 'data')
// }
// 弹框标题
const title = ref('')

const onClickAdd = () => {
  title.value = '新增部门'
  deptDialogRef.value.open()
}
// 编辑部门
const onClickEdit = (row: any) => {
  title.value = '编辑部门'
  deptDialogRef.value.open(row)
}
// 删除部门
const onClickDel = (id: string) => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await deleteDept(id)
      ElMessage.success('删除成功')
      refresh()
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}

const refresh = () => {
  tableRef.value.refresh()
}
</script>

<template>
  <div>
    部门管理
    <page-table v-bind="tableConfig" ref="tableRef">
      <template #btnleft>
        <el-button type="primary" v-auth="['system.dept.add']" @click="onClickAdd">新增</el-button>
      </template>
      <template #operate="{ item }">
        <el-table-column v-slot="{ row }" v-bind="item">
          <el-button type="primary" v-auth="['system.dept.edit']" link @click="onClickEdit(row)">编辑</el-button>
          <el-button type="danger" v-auth="['system:dept:delete']" link @click="onClickDel(row.id)">删除</el-button>
        </el-table-column>
      </template>
    </page-table>
    <deptDialog :title="title" ref="deptDialogRef" :confirm="refresh"></deptDialog>
  </div>
</template>

<style lang="scss" scoped>
div {
  width: 100%;
}
</style>
