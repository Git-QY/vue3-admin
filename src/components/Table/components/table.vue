<script setup lang="ts">
import { TableHeaderItem} from '../type'
defineProps({
  // 表格表头
  tableHeader:{
    type:Array<TableHeaderItem>,
    default:[]
  },
  // 表格内容
  tableData:{
    type:Array,
    default:[]
  }
})
</script>

<template>
  <div>
    <el-table border stripe :data="tableData" style="width: 100%">
      <el-table-column 
      v-for="(item,index) in tableHeader" 
      :key="index" 
      :prop="item.prop" 
      :label="item.label" 
      :width="item.width" 
      stripe
      highlight-current-row
      />
      <el-table-column prop="edit" label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="$emit('edit',scope.$index, scope.row)">
            Edit
          </el-button>
          <el-button size="small" type="danger" @click="$emit('delete',scope.$index, scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="less" scoped>

</style>
