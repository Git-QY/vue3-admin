<template>
  <!-- 新增 -->
  <el-button type="primary" @click="onAdd" v-auth="['system:menu:add']">新增</el-button>
  <el-table :data="tableData" row-key="id" border style="margin: 10px 0" v-loading="loading" max-height="800px" :expand-row-keys="expands">
    <el-table-column prop="menuName" label="菜单名称" show-overflow-tooltip />
    <el-table-column prop="menuType" label="菜单类型">
      <template #default="{ row }">
        <el-tag type="info">{{ AllEnum.MenuType.getLabel(row.menuType) }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="sort" label="排序" width="60" />
    <el-table-column prop="path" label="路由路径" />
    <el-table-column prop="component" label="组件路径" />
    <el-table-column prop="icon" label="菜单图标">
      <template #default="{ row }">
        <svg-icon v-if="row.icon" :iconName="row.icon" style="margin-right: 10px" />
        <span>{{ row.icon }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template #default="{ row }">
        <el-tag v-if="row.status === '1'" type="success">正常</el-tag>
        <el-tag v-else type="danger">禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="isHidden" label="是否隐藏">
      <template #default="{ row }">
        <el-tag v-if="row.isHidden" type="danger">隐藏</el-tag>
        <el-tag v-else type="success">显示</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="isFold" label="是否折叠">
      <template #default="{ row }">
        <el-tag v-if="row.isFold" type="danger">折叠</el-tag>
        <el-tag v-else type="success">展开</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="perms" label="权限标识" />
    <el-table-column prop="buttons" v-slot="{ row }" label="操作" fixed="right">
      <el-button type="primary" link @click="onAdd(row)" v-auth="['system:menu:add']">添加</el-button>
      <el-button type="primary" link @click="onEdit(row)" v-auth="['system:menu:edit']">编辑</el-button>
      <el-button type="danger" link @click="onDelete(row.id)" v-auth="['system:menu:delete']">删除</el-button>
    </el-table-column>
  </el-table>
  <menuDialog ref="menuDialogRef" :tree-data="tableData" :title="title" :confirm="getList"></menuDialog>
</template>

<script lang="ts" setup>
import { listMenu, Menu, deleteMenu } from '@/api'
import { listToTree, deepClone } from '@/utils'
import { AllEnum } from '@/utils/enums.ts'
import menuDialog from './menuDialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const tableData = ref<Menu[]>([])
const loading = ref<Boolean>(false)
const expands = ref<string[]>([])
const getList = async () => {
  try {
    const res = await listMenu()
    tableData.value = listToTree(
      res.data.map((item: Menu) => {
        return { ...item, label: item.menuName, value: item.value }
      }),
    )
    expands.value = res.data.filter((item: Menu) => !item.isFold).map((item: Menu) => item.id)
  } catch (error) {}
}
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
      } catch (error: resEorror) {
        ElMessage.error(error)
      }
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}

// 刷新表格
onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
