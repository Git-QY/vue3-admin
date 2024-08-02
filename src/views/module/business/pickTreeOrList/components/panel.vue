<template>
  <div class="panel">
    <!-- <el-input class="panel-search" v-model="searchInput" placeholder="请输入关键词" :prefix-icon="Search" /> -->
    <SearchBar :placeholder="placeholder" @search="onSearch" />
    <div v-loading="loading" class="panel-content">
      <!-- tree -->
      <el-tree
        v-if="isTree === 'tree'"
        ref="treeRef"
        style="max-width: 600px"
        lazy
        :props="options"
        :load="loadNode"
        :expand-on-click-node="false"
        :node-key="options.value"
      >
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
      <!-- list-table -->
      <div v-else-if="isTree === 'list-table'">
        <el-table :data="searchResult" :row-key="options.value" border stripe max-height="400px">
          <template v-for="(item, index) in options.columns" :key="index">
            <slot v-if="item.type == 'slot'" :name="item.prop" :item="item"></slot>
            <el-table-column :prop="item.prop" :label="item.label"> </el-table-column>
          </template>
        </el-table>
        <pagination class="pagination" :page="page" @set-page="changePage" @set-pageSize="changePageSize"></pagination>
      </div>
      <!-- list -->
      <ul v-else>
        <slot name="nodeItem">
          <li v-for="item in searchResult">
            <NodeContent
              :selected="selected"
              :data="item"
              :multiple="multiple"
              :options="options"
              :node-key="options.value"
              @check-node-click="checkNodeClick"
            ></NodeContent>
          </li>
        </slot>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElTree } from 'element-plus'
import NodeContent from './node-content.vue'
import SearchBar from './search-bar.vue'
import pagination from '@/components/Table/components/pagination.vue'

const props = defineProps({
  getList: { type: Function, default: () => {} }, // 获取列表数据的方法
  options: { type: Object, default: () => ({}) }, // 组件选项
  multiple: { type: Boolean, default: false }, // 是否多选
  selected: { type: Array, default: () => [] }, // 已选数据
  placeholder: { type: String, default: '请输入关键词' }, // 搜索框占位符
  mode: { type: String, default: 'tree' }, // 默认展示模式
  nodeAdapter: { type: Function, default: (list: any) => list }, // 节点适配器函数
  defaultTop: { type: Array, default: () => [] }, // 默认顶级节点
})

const loadNode = async (node: any, resolve: (data: any[]) => void) => {
  try {
    if (node.level === 0) {
      loading.value = true
      if (props.defaultTop.length > 0) return resolve(props.nodeAdapter(props.defaultTop))
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
const page = ref<{ page: number; pageSize: number; [key: string]: any }>(props.options.page || { page: 1, pageSize: 10 })
const search = ref('')
const onSearch = async (searchInput: string, isSearch: boolean = true) => {
  if (isSearch) page.value.page = 1
  search.value = searchInput
  try {
    loading.value = true
    if (props.mode === 'tree' && searchInput === '') {
      isTree.value = 'tree'
      return
    }
    isTree.value = props.mode === 'tree' ? 'list' : props.mode

    const res = await props.getList({ [props.options.label]: search.value, page: { ...page.value } })
    searchResult.value = props.nodeAdapter(res.data)
    page.value.total = res.page.total
  } catch (error) {
    console.error('获取列表数据时出错:', error)
  } finally {
    loading.value = false
  }
}
const changePage = (pageindex: number) => {
  page.value.page = pageindex
  onSearch(search.value, false)
}
const changePageSize = (pageSize: number) => {
  page.value.pageSize = pageSize
  onSearch(search.value, false)
}
onMounted(() => {
  if (props.mode !== 'tree') {
    onSearch('')
  }
})
</script>

<style lang="scss" scoped>
.panel {
  min-width: 300px;
  padding: 20px;
  &-content {
    max-height: 500px;
    min-height: 200px;
    overflow: auto;
  }
  &-search {
    margin-bottom: 20px;
  }
  .pagination {
    margin-top: 20px;
    float: right;
  }
}
</style>
