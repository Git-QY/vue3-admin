<template>
  <div>
    <page-table v-bind="tableConfig" ref="tableRef">
      <template #operate="{ item }">
        <el-table-column v-slot="{ row }" v-bind="item">
          <el-button type="danger" v-auth="['system:role:delete']" link @click="operate['delete'](row.id)">删除</el-button>
        </el-table-column>
      </template>
    </page-table>
  </div>
</template>
<script lang="ts" setup>
import { listInterview } from '@/api'
const tableConfig = reactive({
  table: { rowKey: 'id' },
  searchForm: {},
  api: (data: any) => {
    return listInterview(data)
  },
  columns: [
    { prop: 'type', label: '题目类型', query: {} },
    { prop: 'stem', label: '题目描述', query: {} },
    { prop: 'tags', label: '知识点标签' },
    { prop: 'level', label: '题目难度' },
    { prop: 'score', label: '题目分值' },
    { prop: 'options', label: '题目选项' },
    { prop: 'createBy', label: '登录人名称' },
    { prop: 'createTime', label: '创建时间', formatter: (row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') },
    { prop: 'updateTime', label: '更新时间', formatter: (row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') },
    { prop: 'operate', label: '操作', type: 'slot', fixed: 'right', width: 200 },
  ],
})
</script>

<style lang="scss" scoped></style>
