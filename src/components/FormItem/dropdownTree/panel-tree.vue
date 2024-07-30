<template>
  <div class="panel">
    <!-- <el-input class="panel-search" v-model="searchInput" placeholder="请输入关键词" :prefix-icon="Search" /> -->
    <SearchBar :placeholder="placeholder" @search="onSearch" />
    <div v-loading="loading">
      <!-- tree -->
      <el-tree
        v-if="isTree === 'tree'"
        ref="treeRef"
        style="max-width: 600px"
        lazy
        :props="props.options"
        :load="loadNode"
        :expand-on-click-node="false"
        :node-key="props.options.value"
      >
        <template #default="{ data }">
          <NodeContent
            :selected="selected"
            :data="data"
            :multiple="multiple"
            :options="options"
            :node-key="props.options.value"
            @check-node-click="checkNodeClick"
          ></NodeContent>
        </template>
      </el-tree>
      <!-- list -->
      <ul v-else>
        <li v-for="item in searchResult">
          <NodeContent
            :selected="selected"
            :data="item"
            :multiple="multiple"
            :options="options"
            :node-key="props.options.value"
            @check-node-click="checkNodeClick"
          ></NodeContent>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElTree } from 'element-plus'
import NodeContent from './node-content.vue'
import SearchBar from './search-bar.vue'

const props = defineProps({
  getList: { type: Function, default: () => {} }, // 获取列表数据的方法
  options: { type: Object, default: () => ({}) }, // 组件选项
  multiple: { type: Boolean, default: false }, // 是否多选
  selected: { type: Array, default: () => [] }, // 已选数据
  placeholder: { type: String, default: '请输入关键词' }, // 搜索框占位符
  mode: { type: String, default: 'tree' }, // 默认展示模式
  nodeAdapter: { type: Function, default: (list: any) => list }, // 节点适配器函数
})
const loadNode = async (node: any, resolve: (data: any[]) => void) => {
  try {
    if (node.level === 0) {
      loading.value = true
    }
    const res = await props.getList({ parentId: node.data.id || '0', page: { isAll: true } })
    resolve(props.nodeAdapter(res.data))
  } catch (error) {
    console.log('获取列表失败')
  } finally {
    loading.value = false
  }
}
const $emits = defineEmits(['onchange', 'update:selected'])
const treeRef = ref<InstanceType<typeof ElTree>>()
const checkNodeClick = (data: any) => {
  $emits('update:selected', data)
}
// 搜索结果
const searchResult = ref<any>([])
// 默认展示树或者list
const isTree = ref<string>(props.mode)
// 搜索loading
const loading = ref(false)

const onSearch = async (searchInput: string) => {
  try {
    loading.value = true
    if (props.mode === 'tree' && searchInput === '') {
      isTree.value = 'tree'
      return
    }
    isTree.value = 'list'
    const res = await props.getList({ [props.options.label]: searchInput, page: { current: 1, size: 1000 } })
    searchResult.value = props.nodeAdapter(res.data)
  } catch (error) {
    console.error('获取列表数据时出错:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.panel {
  min-width: 300px;
  max-height: 800px;
  min-height: 200px;
  overflow: auto;
  padding: 20px;
  &-search {
    margin-bottom: 20px;
  }
}
</style>
