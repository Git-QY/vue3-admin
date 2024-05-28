<template>
  <el-dialog :model-value="visible" append-to-body draggable :overflow="true" :before-close="colse">
    <!-- 基础选择弹窗 -->
    <section class="picker">
      <slot name="content">
        <div class="picker-body">
          <div class="picker-left">
            <div class="picker-search">
              <el-input v-model="searchText" placeholder="请输入搜索内容" clearable @input="handleSearch"></el-input>
            </div>
            <div class="picker-list" v-if="props.type == 'list'">
              <div class="picker-list--item" v-for="(item, index) in rightData" :key="index">
                <el-checkbox :model-value="item.checked" :label="item[name]" size="large" />
              </div>
            </div>
            <div class="picker-tree" v-else></div>
            <div class="picker-list--page">
              <el-pagination v-model:current-page="curPage" :page-size="pageSize" :total="total" layout="prev, pager, next" @current-change="handleCurrentChange" />
            </div>
          </div>
          <div class="picker-right"></div>
        </div>
      </slot>
    </section>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="colse">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
/**
 * 实现的效果 只需要专递接口 配置参数
 * 1 实现列表和树的单选和多选
 * 2 实现列表和树的搜索 （树的搜索结果是列表）
 * 3 实现回显
 * (1) 先实现懒加载的树的 多选单选
 */
import { onMounted, ref } from 'vue'
const props = defineProps({
  type: { type: String, default: 'list' },
  onLoad: { type: Function }, // 获取数据
  data: { type: Array }, // 原数据 可以直接忽略onload
  multiple: { type: Boolean, default: false }, //   是否多选
  prop: {
    type: Object,
    default: {
      label: 'name', // 显示字段
      value: 'id', // 值字段
      children: 'children', // 子级字段
      lazy: false, // 是否懒加载
    },
  },
})

const name = props.prop.label
const key = props.prop.value
const visible = ref(false)
const open = () => {
  visible.value = true
}
const colse = () => {
  visible.value = false
}
const onConfirm = () => {
  visible.value = false
}
// 搜索
const searchText = ref('')
const total = ref<number>(0)
const pageSize = ref<number>(10)
const curPage = ref<number>(1)
const handleCurrentChange = (page: number) => {
  curPage.value = page
  init()
}
// 获取数据
const getList = async () => {
  try {
    if (!props.onLoad) return
    const res = await props.onLoad({ page: { page: curPage.value, pageSize: pageSize.value }, [name]: searchText.value })
    rightData.value = res.data || []
    total.value = res.page.total || 0
  } catch (error) {
    console.log('error', error)
  }
}
// 防抖节流、
const throttledHandleSearch = debounce(getList, 500)
import { debounce } from '@/utils'
const handleSearch = async (e: string) => {
  throttledHandleSearch()
}
const init = async () => {
  if (props.data && props.data.length > 0) return
  if (!props.onLoad) return
  if (props.type == 'list') {
    getList()
  } else {
    // 树
  }
}
const handleNodeClick = () => {}
const loadNode = async (node: Node, resolve: (data: any[]) => void, reject: () => void) => {
  try {
    const res = await props.onLoad({ parentId: node.data[key] })
    console.log('🚀 ~ loadNode ~ res:', res)
  } catch (error) {}
}
const rightData = ref<any[]>([])
onMounted(() => {
  init()
})
defineExpose({ open, colse })
</script>

<style lang="scss" scoped>
.picker {
  &-body {
    flex: 1;
    display: flex;
    overflow: hidden;
    margin: 24px;
    border: 1px solid #eaeaea;
    border-radius: 2px;
    min-height: 400px;

    &--item {
      padding: 0 8px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &-search {
    padding: 16px;
    background-color: #eaeaea;
  }
  &-left {
    flex: 1;
    border-right: 1px solid #eaeaea;
    overflow: hidden;
  }
  &-right {
    width: 320px;
    overflow: auto;
    box-sizing: border-box;
  }
  &-list {
    padding: 16px;
  }
}
</style>
