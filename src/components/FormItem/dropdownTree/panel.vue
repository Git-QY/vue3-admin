<template>
  <div class="panel">
    <div v-loading="loading" class="panel-content">
      <div class="panel-content-left">
        <SearchBar class="panel-content-head" :placeholder="placeholder" @search="onSearch" />
        <div class="panel-content-left--body panel-content-body" v-loading="loading">
          <!-- 动态组件 -->
          <component
            ref="componentRef"
            :is="pane"
            v-bind="{ ...props, searchResult }"
            v-model:loading="loading"
            @check-node-click="checkNodeClick"
            style="height: 400px"
          ></component>
        </div>
      </div>
      <div class="panel-content-right" v-if="isRightPanel">
        <div class="panel-content-right--title panel-content-head">已选 {{ selected.length }} 个</div>
        <RightPanel style="height: 400px" :selected="selected" :name="name" @delete="onDelete"></RightPanel>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RightPanel from './right-panel.vue'
import SearchBar from './search-bar.vue'
import { deepClone } from '@/utils'
import { Item } from './index'
const props = defineProps({
  getList: { type: Function, default: () => {} }, // 获取列表数据的方法
  options: {
    type: Object,
    default: () => ({
      label: 'name',
      value: 'id',
      children: 'children',
      page: { page: 1, pageSize: 10 }, // 分页配置
    }),
  }, // 组件配置
  multiple: { type: Boolean, default: false }, // 是否多选
  selected: { type: Array as () => Item[], default: () => [] }, // 已选数据
  placeholder: { type: String, default: '请输入关键词' }, // 搜索框占位符
  mode: { type: String, default: 'nodeTree' }, // 默认展示模式 nodeTree|nodeList
  nodeAdapter: { type: Function, default: (list: any) => list }, // 节点适配器函数
  defaultTop: { type: Array, default: () => [] }, // 默认顶级节点
  isRightPanel: { type: Boolean, default: false }, // 是否出现右侧面板
})
const name = props.options.label || 'name'
const $emits = defineEmits(['onchange', 'update:selected'])
const selectData = ref<Item[]>(props.selected)
const checkNodeClick = (data: Item) => {
  selectData.value = deepClone(data)
  $emits('update:selected', data)
}
const searchResult = ref<Item[]>([]) // 搜索结果
const MODE = ref<string>(props.mode) // 默认展示树或者list
const loading = ref(false)
const componentRef = ref(null as any)
const onSearch = async (searchInput: string) => {
  isMODE(searchInput)
  componentRef.value?.getNodeList(1, searchInput)
}
const isMODE = (searchInput: string) => {
  if (MODE.value === 'nodeTree' && searchInput === '') {
    MODE.value = 'nodeList'
  } else {
    MODE.value = MODE.value == 'nodeTree' ? 'nodeList' : MODE.value
  }
}

const onDelete = (data: Item) => {
  selectData.value = selectData.value.filter((item: Item) => item.id !== data.id)
  $emits('update:selected', selectData.value)
}
onMounted(() => {})
import nodeTree from './nodeTree.vue'
import nodeList from './nodeList.vue'
const pane = computed(() => {
  const componentMap: { [key: string]: any } = { nodeTree, nodeList }
  return markRaw(componentMap[MODE.value])
})
</script>

<style lang="scss">
.panel {
  min-width: 300px;
  padding: 20px;
  &-content {
    overflow: auto;
    display: flex;
    &-left {
      flex: 1;
    }
    &-right {
      width: 40%;
      &--title {
        height: 32px;
        line-height: 32px;
        margin-bottom: 10px;
      }
      &--body {
        overflow: auto;
        .item {
          padding: 0 10px;
          height: 26px;
          line-height: 26px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    &-head {
      padding: 10px;
      background-color: #ebeef5;
    }
  }
  &-search {
    margin-bottom: 20px;
  }
  // .pagination {
  //   margin-top: 20px;
  //   float: right;
  // }
}
</style>
