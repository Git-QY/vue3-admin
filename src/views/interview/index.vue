<template>
  <Page main="/interview">
    <page-table v-bind="tableConfig" ref="tableRef">
      <template #btnleft>
        <el-button type="primary" @click="operate['add']">新增</el-button>
      </template>
      <template #operate="{ item }">
        <el-table-column v-slot="{ row }" v-bind="item">
          <el-button type="primary" link @click="operate['edit'](row.id)">编辑</el-button>
          <el-button type="danger" link @click="operate['delete'](row.id)">删除</el-button>
        </el-table-column>
      </template>
    </page-table>
  </Page>
</template>
<script lang="ts" setup>
import { listInterview, deleteInterview } from '@/api'
import { useElementUI } from '@/hooks/useMessage'
import { dayjs } from 'element-plus'
const { showMessage, showMessageBox } = useElementUI()
const router = useRouter()
const tableConfig = reactive({
  table: { rowKey: 'id' },
  searchForm: {},
  api: (data: any) => {
    return listInterview(data)
  },
  columns: [
    { prop: 'type', label: '类型', type: 'select', dict: 'interview_type', query: {} },
    { prop: 'stem', label: '描述', 'show-overflow-tooltip': true, query: {} },
    { prop: 'tags', label: '知识点标签' },
    { prop: 'level', label: '难度' },
    { prop: 'score', label: '分值' },
    // { prop: 'options', label: '题目选项' },
    { prop: 'createBy', label: '提交人' },
    { prop: 'createTime', label: '创建时间', width: 200, formatter: (row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') },
    { prop: 'updateTime', label: '更新时间', width: 200, formatter: (row: any) => dayjs(row.updateTime).format('YYYY-MM-DD HH:mm:ss') },
    { prop: 'operate', label: '操作', type: 'slot', fixed: 'right', width: 200 },
  ],
})
const tableRef = ref<HTMLFormElement | null>(null)
const getList = () => {
  tableRef.value?.refresh()
}
const operate = {
  add: () => router.push('/interview/add'),
  delete: async (id: string) => {
    try {
      const result = await showMessageBox('确定删除吗？', '提示')
      if (!result) return
      await deleteInterview({ id })
      getList()
      showMessage('删除成功')
    } catch (error) {
      const err = error as resEorror
      showMessage(err.message, 'error')
    }
  },
  edit: (id: any) => router.push(`/interview/add?id=${id}`),
}
</script>

<style lang="scss" scoped></style>
