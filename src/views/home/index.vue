<script setup lang="ts">
import CustomTable from '@/components/Table/index.vue'
import { ref } from 'vue';
// 表格表头
const tableHeader = ref([
  {
    label: '日期',
    prop: 'date',
    width: ''
  },
  {
    label: '姓名',
    prop: 'name',
    width: ''
  },
  {
    label: '地址',
    prop: 'address',
    width: ''
  },
  {
    label: '编辑',
    prop: 'edit',
    width: ''
  },
])
// 表格数据
const tableData = ref(
  [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
)
// 搜索功能
const onSearch = (e: any) => {
  console.log(e, '搜索关键字')
}

// 分页器配置
// 当前页码
const currentPage = ref(1)
// 每页显示条数
const pageSize = ref(10)

// 切换当前页码
const currentchange = (e: any) => {
  console.log(e, '切换了当前页码')
  currentPage.value = e
}
// 切换每页显示条数
const updatePageSize = (e: any) => {
  console.log(e, '切换了每页条数')
  pageSize.value = e
}
</script>

<template>
  <div>
    首页
    <svg-icon iconName="icon-yisuoping" />
    <CustomTable
      @search="onSearch" 
      :tableHeader="tableHeader" 
      :tableData="tableData" 
      @edit="(e) => console.log('编辑', e)"
      @delete="(e) => console.log('删除', e)"
      background
      :pageSize="pageSize"
      :currentPage="currentPage"
      @current-change="currentchange" 
      @update:page-size="updatePageSize">
    </CustomTable>
  </div>
</template>

<style lang="less" scoped></style>
