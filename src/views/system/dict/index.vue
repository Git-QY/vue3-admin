<template>
  <Page main="/system/dict">
    <page-table v-bind="tableConfig" ref="tableRef">
      <template #btnleft>
        <el-button type="primary" @click="onAdd">新增</el-button>
      </template>
      <template #dictType="{ item }">
        <el-table-column v-slot="{ row }" v-bind="item">
          <el-button type="primary" @click="toDictItem(row)" link>{{ row.dictType }}</el-button>
        </el-table-column>
      </template>
      <template #operate="{ item }">
        <el-table-column v-slot="{ row }" v-bind="item">
          <el-button type="primary" link @click="onEdit(row)">编辑</el-button>
          <el-button type="danger" link @click="onDelete(row.id)">删除</el-button>
        </el-table-column>
      </template>
    </page-table>
    <dictDialog ref="dictDialogRef" :title="title" :confirm="refresh" />
  </Page>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { listDict, Dict, deleteDict } from '@/api'
import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
import { useRouter } from 'vue-router'
import dictDialog from './dictDialog.vue'

const tableConfig = reactive({
  table: { rowKey: 'id' },
  searchForm: {},
  api: (data: any) => listDict(data),
  columns: [
    { prop: 'dictName', label: '名称', query: {} },
    { prop: 'dictType', label: '类型', type: 'slot' },
    { prop: 'remark', label: '备注' },
    { prop: 'status', label: '状态', type: 'tag', dict: 'dict_status' },
    { prop: 'createTime', label: '创建时间', formatter: (row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') },
    { prop: 'updateTime', label: '更新时间', formatter: (row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') },
    { prop: 'operate', label: '操作', type: 'slot', fixed: 'right', width: 200 },
  ],
})
const router = useRouter()
const title = ref('新增')
const tableRef = ref<HTMLFormElement | null>(null)
const dictDialogRef = ref<HTMLFormElement | null>(null)
const toDictItem = (row: Dict) => {
  router.push({ path: '/system/dict/item', query: { dictId: row.id, dictType: row.dictType } })
}
const onAdd = () => {
  title.value = '新增字典'
  dictDialogRef.value?.open()
}
const onEdit = (row: Dict) => {
  title.value = '编辑字典'
  dictDialogRef.value?.open(row)
}
const onDelete = (id: string) => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await deleteDict(id)
      ElMessage.success('删除成功')
      refresh()
    })
    .catch(() => ElMessage.info('取消删除'))
}
// 刷新表格
const refresh = () => tableRef.value?.refresh()

import { useDictStore } from '@/store'
const dictStore = useDictStore()
onMounted(async () => {
  await dictStore.getDict('dict_status')
})
</script>

<style lang="scss" scoped></style>
