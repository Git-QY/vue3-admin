<template>
  <page-table v-bind="tableConfig" ref="tableRef">
    <template #btnleft>
      <el-button type="primary" @click="onAdd">新增</el-button>
    </template>
    <template #operate="{ item }">
      <el-table-column v-slot="{ row }" v-bind="item">
        <el-button type="primary" link @click="onEdit(row)">编辑</el-button>
        <el-button type="danger" link @click="onDelete(row.id)">删除</el-button>
      </el-table-column>
    </template>
  </page-table>
  <dictItemDialog ref="dictItemDialogRef" :confirm="refresh" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { listDictItem, DictItem, deleteDictItem } from '@/api'
import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
import dictItemDialog from './dictItemDialog.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tableConfig = ref({
  table: {},
  searchForm: {},
  api: (data: any) => listDictItem({ ...data, ...route.query }),
  columns: [
    { prop: 'dictType', label: '字典类型' },
    { prop: 'parentId', label: '父级id', width: 150, 'show-overflow-tooltip': true },
    { prop: 'label', label: '名称', width: 180, rules: 'must', query: {} },
    { prop: 'value', label: '值', width: 150, rules: 'must' },
    { prop: 'sort', label: '排序', type: 'input-number' },
    { prop: 'remark', label: '备注', type: 'textarea' },
    { prop: 'status', label: '状态', type: 'tag', dict: 'dict_item_status' },
    { prop: 'createTime', label: '创建时间', type: 'date', width: 200, formatter: (row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') },
    { prop: 'operate', label: '操作', width: 200, type: 'slot', slot: 'type', fixed: 'right' },
  ],
  page: {
    pageSizes: [10, 20, 30, 40, 50],
    pageSize: 10,
    total: 0,
    page: 1,
  },
})
const tableRef = ref<HTMLFormElement | null>(null)
const dictItemDialogRef = ref<HTMLFormElement | null>(null)
const onAdd = () => {
  dictItemDialogRef.value?.open(null, { title: '新增字典项' })
}
const onEdit = (row: DictItem) => {
  dictItemDialogRef.value?.open(row, { title: '新增字典项' })
}
const onDelete = () => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await deleteDictItem(id)
      ElMessage.success('删除成功')
      refresh()
    })
    .catch(() => ElMessage.info('取消删除'))
}
const refresh = () => tableRef.value?.refresh()

import { useDictStore } from '@/store'
const dictStore = useDictStore()
onMounted(async () => {
  await dictStore.getDict('dict_item_status')
})
</script>

<style lang="scss" scoped></style>
