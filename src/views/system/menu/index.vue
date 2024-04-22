<template>
  <div>
    <!-- 新增 -->
    <el-button type="primary" @click="onAdd">新增</el-button>
    <el-table :data="tableData" row-key="id" border style="margin: 10px 0" v-loading="loading" max-height="800px">
      <el-table-column prop="menuName" label="菜单名称" show-overflow-tooltip />
      <el-table-column prop="menuType" label="菜单类型">
        <template #default="{ row }">
          <div>{{ row.menuType }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="path" label="路由路径" />
      <el-table-column prop="component" label="组件路径" />
      <el-table-column prop="icon" label="菜单图标">
        <template #default="{ row }">
          <svg-icon :iconName="`icon-${row.icon}`" style="margin-right: 10px" />
          <span>{{ row.icon }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <div>{{ row.status }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="visible" label="是否隐藏" />
      <el-table-column prop="perms" label="权限标识" />
      <el-table-column prop="buttons" label="操作" fixed="right"> </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
const onAdd = () => {
  console.log('onAdd')
}
const tableData = ref([])
</script>
<style lang="scss" scoped></style>
