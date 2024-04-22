<script setup lang="ts">
defineProps({
  // 是否为分页按钮添加背景色
  background: {
    type: Boolean,
    default: false
  },
  // 是否使用小型分页样式
  small: {
    type: Boolean,
    default: false
  },
  // 组件布局
  layout: {
    type: String,
    default: 'total,sizes, prev, pager, next, jumper'
  },
  // 数据总条数
  total: {
    type: Number,
    default: 10
  },
  // 页数超过多少就自动隐藏
  pageCount: {
    type: Number,
    default: 15
  },
  // 分页选择每页多少数据
  pageSizes: {
    type: Array<number>,
    default: [5, 10, 20, 50]
  },
  // 每页显示条数
  pageSize: {
    type: Number,
    default: 10
  },
  // 当前页码
  currentPage: {
    type: Number,
    default: 1
  },
})
</script>

<template>
  <div class="pagination-container">
    <el-pagination 
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
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 0;
}
</style>
