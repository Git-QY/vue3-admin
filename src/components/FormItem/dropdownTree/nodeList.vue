<template>
  <div class="node-list">
    <!-- 展示列表 -->
    <ul class="node-list-body">
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
    </ul>
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
  nodeAdapter: Function
  loading: boolean
}>()
const $emit = defineEmits(['check-node-click', 'update:loading'])
const checkNodeClick = (data: any) => {
  $emit('check-node-click', data)
}
const searchResult = ref<Item[]>([])
const page = ref<{ page: number; pageSize: number; [key: string]: any }>(props.options.page || { page: 1, pageSize: 10 })
const getNodeList = async (pageNumber: number = 0, searchInput: string = '') => {
  try {
    $emit('update:loading', true)
    page.value.page = pageNumber == 0 ? page.value.page : pageNumber
    const res = await props.getList({ [props.options.label]: searchInput, page: { ...page.value } })
    if (pageNumber == 0) {
      searchResult.value = searchResult.value.concat(props.nodeAdapter(res.data))
    } else {
      searchResult.value = []
      searchResult.value = props.nodeAdapter(res.data)
    }
  } catch (error) {
    console.log('获取列表失败')
  } finally {
    $emit('update:loading', false)
  }
}
// 初始化时加载第一批数据
onMounted(async () => {
  await getNodeList()
})
// 导出事件
defineExpose({
  getNodeList,
})
</script>

<style lang="scss" scoped>
.node-list {
  overflow: auto;
}
</style>
