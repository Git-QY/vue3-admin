<template>
  <div class="node-list">
    <!-- 展示列表 -->
    <div ref="containerRef" class="node-list-body" @scroll="handleScorll">
      <ul ref="contentRef">
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
  searchInput: string
}>()
const $emit = defineEmits(['check-node-click', 'update:loading'])
const checkNodeClick = (data: any) => {
  $emit('check-node-click', data)
}
const searchResult = ref<Item[]>([])
const page = ref<{ page: number; pageSize: number; [key: string]: any }>(props.options.page || { page: 1, pageSize: 10 })
const isLoading = ref<boolean>(false) // 是否请求 判断是否最后一页
const search = ref<string>('')

/**
 * 获取列表数据
 * @param pageNumber 页码
 */
const getNodeList = async (pageNumber?: number) => {
  console.log("🚀 ~ getNodeList ~ pageNumber:", pageNumber)
  if (pageNumber == 1) isLoading.value = false
  try {
    $emit('update:loading', true)
    if (isLoading.value) return // 避免重复请求
    page.value.page = pageNumber || page.value.page
    const res = await props.getList({ [props.options.label]: props.searchInput, page: { ...page.value } })
    if (pageNumber) {
      searchResult.value = []
      searchResult.value = props.nodeAdapter(res.data)
    } else {
      searchResult.value = searchResult.value.concat(props.nodeAdapter(res.data))
    }
    if (res.data.length < page.value.pageSize) {
      isLoading.value = true
    } else {
      page.value.page++
    }
    page.value.total = res.page.total
  } catch (error) {
    console.log('获取列表失败')
  } finally {
    $emit('update:loading', false)
  }
}
const containerRef = ref<HTMLFormElement | null>(null)
const contentRef = ref<HTMLFormElement | null>(null)
// 初始化时加载第一批数据
onMounted(async () => {
  const resizeObserver = new ResizeObserver(() => {
    if (!containerRef.value || !contentRef.value) return
    if (containerRef.value?.offsetHeight > contentRef.value?.offsetHeight && !isLoading.value) {
      getNodeList()
    }
  })
  resizeObserver.observe(contentRef.value as Element)
})
const handleScorll = (e: Event) => {
  // 向下滚动加载数据 距离底部=0时加载数据
  if (e.target instanceof Element && e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <= 0) {
    getNodeList(0, search.value)
  }
}

// 导出事件
defineExpose({
  getNodeList,
})
</script>

<style lang="scss" scoped>
.node-list {
  position: relative;

  &-body {
    height: 100%;
    overflow: auto;
  }
  &-paging {
    position: absolute;
    bottom: -20px;
    right: 0;
  }
}
</style>
