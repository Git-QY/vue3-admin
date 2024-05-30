<template>
  <el-dialog :model-value="visible" title="部门选择" width="800px" append-to-body draggable :overflow="true" :before-close="colse">
    <div class="popup-layout">
      <div class="left-panel">
        <!-- 搜索框 -->
        <div class="left-search">
          <el-input v-model="searchText" prefix-icon="Search" placeholder="请输入关键字查询" clearable @input="onSearch" />
        </div>
        <!-- 左侧原数据列表 -->
        <el-tree style="max-width: 600px; height: 200px" :props="props" :load="loadNode" lazy :expand-on-click-node="false" @node-click="handleNodeClick" />
      </div>
      <div class="right-panel">
        <div class="right-info">已选 {{ selectData.length }} 条数据</div>
        <!-- 右侧展示选中结果 -->
        <ul class="right-list">
          <div v-for="item in selectData" class="right-list--item">
            <span> {{ item.deptName }}</span>
            <Icon name="close" @click="onDelete(item)"></Icon>
          </div>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="colse">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import { listDept } from '@/api/dept'
import { debounce } from '@/utils'
const props = {
  label: 'deptName',
  children: 'children',
  isLeaf: 'leaf',
}

const visible = ref(false)
const loading = ref(false)
const listData = ref<any[]>([])
const selectData = ref<any[]>([]) // 选中数据
const loadNode = async (node: any, resolve: any) => {
  console.log('🚀 ~ loadNode ~ node:', node)
  try {
    const res = await listDept({ parentId: node.data.id || '0' })
    resolve(res.data)
  } catch (error) {}
}
const handleNodeClick = (data: any) => {
  selectData.value = [data]
}
// 搜索
const searchText = ref('')
const search = () => {}
const searchDebounce = debounce(search, 500)
const onSearch = () => {
  searchDebounce()
}
const open = (data: any) => {
  visible.value = true
  selectData.value = data
}
const onDelete = data => {
  selectData.value = selectData.value.filter((item: any) => item.id !== data.id)
}
const colse = () => {
  visible.value = false
}
const emits = defineEmits(['confirm'])
const onConfirm = () => {
  visible.value = false
  emits('confirm', selectData.value)
}
// 导出
defineExpose({ open })
</script>

<style scoped lang="scss">
.popup-layout {
  display: flex;
  border: 1px solid #ccc;

  .left-panel {
    flex: 1;
    border-right: 1px solid #ccc;

    .left-search {
      padding: 10px;
      background-color: #ebeef5;
    }

    .left-list {
      padding: 10px;
      height: 300px;
      overflow: auto;
      margin: 0;
      list-style: none;

      &--item {
        height: 40px;
      }
    }
  }

  .right-panel {
    width: 50%;

    .right-info {
      height: 52px;
      padding: 0 10px;
      background-color: #ebeef5;
      line-height: 52px;
    }

    .right-list {
      padding: 10px;
      overflow: auto;

      &--item {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
