<template>
  <div class="node-tree">
    <!-- 展示树 -->
    <el-tree ref="treeRef" lazy :props="options" :load="loadNode" :expand-on-click-node="false" :node-key="options.value">
      <template #default="{ data }">
        <NodeContent
          :selected="selected"
          :data="data"
          :multiple="multiple"
          :options="options"
          :node-key="options.value"
          @check-node-click="checkNodeClick"
        ></NodeContent>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { Item } from './index'
import NodeContent from './node-content.vue'
const props = defineProps<{
  getList: Function
  options: any
  multiple: boolean
  selected: any[]
  defaultTop: any[]
  loading: boolean
  nodeAdapter: Function
}>()
const $emit = defineEmits(['check-node-click', 'update:loading'])

const loadNode = async (node: any, resolve: (data: any[]) => void) => {
  try {
    if (node.level === 0) {
      $emit('update:loading', true)
      if (props.defaultTop.length > 0) return resolve(props.nodeAdapter(props.defaultTop))
    }
    const res = await props.getList({ parentId: node.data.id || '0', page: { isAll: true } })
    resolve(props.nodeAdapter(res.data))
  } catch (error) {
    console.log('获取列表失败')
  } finally {
    $emit('update:loading', false)
  }
}
const checkNodeClick = (data: Item) => {
  $emit('check-node-click', data)
}
</script>

<style lang="scss" scoped>
.node-tree {
  overflow: auto;
}
</style>
