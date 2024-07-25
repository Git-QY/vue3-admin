<template>
  <page-table v-bind="tableConfig" ref="tableRef">
    <template #btnleft>
      <el-button type="primary" v-auth="['system.menu.add']" @click="onAdd">新增</el-button>
    </template>

    <template #icon="{ item }">
      <el-table-column v-slot="{ row }" v-bind="item">
        <svg-icon :iconName="row.icon" style="margin-right: 10px" />
      </el-table-column>
    </template>

    <template #operate="{ item }">
      <el-table-column prop="buttons" v-slot="{ row }" v-bind="item">
        <el-button type="primary" link @click="onAdd(row)" v-auth="['system:menu:add']">添加</el-button>
        <el-button type="primary" link @click="onEdit(row)" v-auth="['system:menu:edit']">编辑</el-button>
        <el-button type="danger" link @click="onDelete(row.id)" v-auth="['system:menu:delete']">删除</el-button>
      </el-table-column>
    </template>
  </page-table>
  <menuDialog ref="menuDialogRef" :title="title" :confirm="getList"></menuDialog>
</template>

<script lang="ts" setup>
import { listMenu, Menu, deleteMenu } from '@/api'
import menuDialog from './menuDialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deepClone } from '@/utils'
const tableConfig = ref({
  table: { rowKey: 'id' },
  type: 'tree',
  searchForm: {},
  // 可以通过pomise构建需要的格式
  api: (data: any) => {
    return listMenu(data)
  },
  columns: [
    // 菜单名称
    { prop: 'menuName', label: '菜单名称', query: {}, 'show-overflow-tooltip': true, width: 200 },
    { prop: 'menuType', label: '菜单类型', type: 'tag', dict: 'menu_type' },
    { prop: 'sort', label: '排序' },
    { prop: 'path', label: '路由路径', 'show-overflow-tooltip': true },
    { prop: 'component', label: '组件路径', 'show-overflow-tooltip': true },
    { prop: 'icon', label: '菜单图标', type: 'slot' },
    { prop: 'status', label: '状态', type: 'tag', dict: 'menu_status' },
    {
      prop: 'isHidden',
      label: '是否隐藏',
      type: 'tag',
      options: [
        { label: '隐藏', value: '1' },
        { label: '显示', value: '0' },
      ],
    },
    {
      prop: 'isFold',
      label: '是否折叠',
      type: 'tag',
      options: [
        { label: '折叠', value: '1' },
        { label: '展开', value: '0' },
      ],
    },
    { prop: 'perms', label: '权限标识', width: 200 },
    { prop: 'operate', label: '操作', type: 'slot', fixed: 'right', width: 200 },
  ],
})
const tableRef = ref<HTMLFormElement | null>(null)
const menuDialogRef = ref<HTMLFormElement | null>(null)
const title = ref<string>('')
const onAdd = (row: Menu) => {
  menuDialogRef.value?.open({ parentId: row.id })
  title.value = '新增菜单'
}
const onEdit = (row: Menu) => {
  menuDialogRef.value?.open(deepClone(row))
  title.value = '编辑菜单'
}
const onDelete = (id: string) => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        await deleteMenu(id)
        ElMessage.success('删除成功')
        getList()
      } catch (error) {
        const err = error as resEorror
        ElMessage.error(err)
      }
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}
const getList = () => {
  tableRef.value?.refresh()
}
</script>

<style lang="scss" scoped></style>
