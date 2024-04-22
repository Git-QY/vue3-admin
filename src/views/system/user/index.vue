<template>
  <div>
    <page-table v-bind="tableConfig">
      <template #operate="{ item }">
        <el-table-column v-slot="{ row }" v-bind="item">
          <el-button type="primary" link @click="onEdit(row)">编辑</el-button>
          <el-button type="danger" link @click="onDelete({ id: row.id })">删除</el-button>
        </el-table-column>
      </template>
      <template #status="{ item }">
        <el-table-column v-slot="{ row }" v-bind="item">
          <el-switch v-model="row.status" active-text="启用" inactive-text="停用" active-value="1" inactive-value="0" :inline-prompt="true" @click="onChangeStatus(row)"> </el-switch>
        </el-table-column>
      </template>
    </page-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import pageTable from '@/components/Table/index.vue'
import request from '@/utils/request'
import api, { User } from '@/api/user'

const tableConfig = reactive({
  table: { rowKey: 'id' },
  searchForm: {},
  // 可以通过pomise构建需要的格式
  api: (data: any) => {
    return request.post('/users/list', { ...data, xx: 123 })
  },
  page: {
    pageSize: 1,
    pageSizes: [1, 2, 3, 4, 5],
  },
  columns: [
    { type: 'selection', fixed: 'left', 'reserve-selection': true, width: 40 },
    { prop: 'id', label: 'ID', 'show-overflow-tooltip': true },
    { prop: 'username', label: '用户名' },
    { prop: 'password', label: '密码', width: 100, 'show-overflow-tooltip': true },
    { prop: 'avatar', label: '头像', type: 'upload', rules: 'must' },
    { prop: 'email', label: '邮箱', rules: 'email' },
    { prop: 'status', label: '状态', type: 'slot' },
    { prop: 'createdTime', label: '创建时间', type: 'date', width: 200 },
    { prop: 'updatedTime', label: '更新时间', type: 'date', hide: true, width: 200 },
    { prop: 'operate', label: '操作', type: 'slot', fixed: 'right', width: 200 },
  ],
})

const onEdit = (row: User) => {
  console.log(row)
}
const onDelete = (id: string) => {
  console.log(id)
}
const onChangeStatus = async (row: User) => {
  const res = await api.updateUser(row)
  console.log(res)
}
</script>

<style lang="scss" scoped></style>
