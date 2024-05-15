<template>
  <page-table v-bind="tableConfig" ref="tableRef">
    <template #operate="{ item }">
      <el-table-column v-slot="{ row }" v-bind="item">
        <el-button type="danger" v-auth="['system:role:delete']" link @click="onDelete(row.id)">删除</el-button>
      </el-table-column>
    </template>
  </page-table>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
import { Log, listLog, deleteLog } from '@/api'

const tableConfig = reactive({
  table: { rowKey: 'id' },
  searchForm: {},
  // 可以通过pomise构建需要的格式
  api: (data: any) => {
    return listLog(data)
  },
  columns: [
    { prop: 'url', label: '来源URL', query: {} },
    { prop: 'method', label: '请求方法' },
    { prop: 'ip', label: '来源IP' },
    { prop: 'address', label: 'ip所属地址' },
    { prop: 'createBy', label: '登录人名称' },
    { prop: 'createTime', label: '创建时间', formatter: (row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') },
    { prop: 'updateTime', label: '更新时间', formatter: (row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') },
    { prop: 'operate', label: '操作', type: 'slot', fixed: 'right', width: 200 },
  ],
})
const tableRef = ref(null as any)
const onDelete = (id: string) => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await deleteLog(id)
      ElMessage.success('删除成功')
      refresh()
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}

// 刷新表格
const refresh = () => {
  tableRef.value.refresh()
}
</script>

<style lang="scss" scoped></style>
