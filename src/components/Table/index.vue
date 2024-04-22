<template>
  <div class="table-wrapper">
    <!-- 基础page配置 搜索表格分页 -->
    <!-- 搜索模块 -->
    <Search @search="$emit('search', $event)"></Search>
    <!-- 表格模块 -->
    <Table 
    :tableHeader="tableHeader" 
    :tableData="tableData"
    @edit="$emit('edit', $event)"
    @delete="$emit('delete', $event)">
    ></Table>
    <!-- 分页模块 -->
    <Pagination
      :background="background" 
      :small="small"
      :layout="layout" 
      :total="total"
      :page-count="pageCount" 
      :page-sizes="pageSizes" 
      :page-size="pageSize"
      :current-page="currentPage" 
      @size-change="$emit('size-change', $event)"
      @current-change="$emit('current-change', $event)"
      @prev-click="$emit('prev-click', $event)"
      @next-click="$emit('next-click', $event)"
      @update:page-size="$emit('update:page-size', $event)"
    >
    </Pagination>
  </div>
</template>

<script lang="ts" setup>
import Pagination from './components/pagination.vue'
import Search from './components/search.vue'
import Table from './components/table.vue'
import { TableHeaderItem } from './type';
defineProps({
  // 表格表头
  tableHeader:{type:Array<TableHeaderItem>},
  // 表格数据
  tableData:{type:Array},
  // 是否为分页按钮添加背景色
  background: {type: Boolean},
  // 是否使用小型分页样式
  small: {type: Boolean},
  // 组件布局
  layout: {type: String},
  // 数据总条数
  total: {type: Number},
  // 页数超过多少就自动隐藏
  pageCount: {type: Number},
  // 分页选择每页多少数据
  pageSizes: {type: Array<number>},
  // 每页显示条数
  pageSize: {type: Number},
  // 当前页码
  currentPage: {type: Number},
})

</script>

<style lang="scss" scoped>
.table-wrapper{
  width: 100%;
}
</style>
