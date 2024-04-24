<template>
  <Page main="/system/user">
    <page-table v-bind="tableConfig" ref="tableRef">
      <template #btnleft>
        <el-button type="primary" @click="onAdd">新增</el-button>
      </template>
      <template #query-createdTime="{ item }">具名插槽</template>
      <template #operate="{ item }">
        <el-table-column v-slot="{ row }" v-bind="item">
          <el-button type="primary" link @click="onEdit(row)">编辑</el-button>
          <el-button type="danger" link @click="onDelete(row.id)">删除</el-button>
        </el-table-column>
      </template>
      <template #status="{ item }">
        <el-table-column v-slot="{ row }" v-bind="item">
          <el-switch v-model="row.status" active-text="启用" inactive-text="停用" active-value="1" inactive-value="0" :inline-prompt="true" @click="onChangeStatus(row)"> </el-switch>
        </el-table-column>
      </template>
    </page-table>
  </Page>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import pageTable from '@/components/Table/index.vue'
import request from '@/utils/request'
import api, { User } from '@/api/user'
import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const tableConfig = reactive({
  table: { rowKey: 'id' },
  searchForm: {},
  // 可以通过pomise构建需要的格式
  api: (data: any) => {
    return request.post('/users/list', { ...data, xx: 123 })
  },
  page: {
    pageSize: 2,
    pageSizes: [1, 2, 3, 4, 5],
  },
  columns: [
    { type: 'selection', fixed: 'left', 'reserve-selection': true, width: 40 },
    { prop: 'id', label: 'ID', 'show-overflow-tooltip': true },
    { prop: 'username', label: '用户名', query: {} },
    // { prop: 'password', label: '密码', width: 100, 'show-overflow-tooltip': true },
    { prop: 'avatar', label: '头像', type: 'upload', rules: 'must' },
    { prop: 'email', label: '邮箱', query: {} },
    {
      prop: 'status',
      label: '状态',
      type: 'slot',
      query: {
        type: 'select',
        options: [
          { label: '启用', value: '1' },
          { label: '停用', value: '0' },
        ],
      },
    },
    {
      prop: 'createdTime',
      label: '创建时间',
      type: 'date',
      width: 200,
      formatter: (row: any) => dayjs(row.createdTime).format('YYYY-MM-DD HH:mm:ss'),
      query: { type: 'slot' },
    },
    { prop: 'updatedTime', label: '更新时间', type: 'date', hide: true, width: 200 },
    { prop: 'operate', label: '操作', type: 'slot', fixed: 'right', width: 200 },
  ],
})
const tableRef = ref(null as any)

const onAdd = () => {
  router.push('/system/user/add')
}
const onEdit = (row: User) => {
  console.log(row)
}
const onDelete = (id: string) => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const res = await api.deleteUser(id)
      ElMessage.success(res.message)
      tableRef.value.refresh()
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}
const onChangeStatus = async (row: User) => {
  try {
    const res = await api.updateUserField({ id: row.id, fieldName: 'status', fieldValue: row.status })
    ElMessage.success(res.message)
  } catch (error: any) {
    ElMessage.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
