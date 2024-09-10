<template>
  <el-dialog :model-value="visible" title="角色选择" width="800px" append-to-body draggable :overflow="true" :before-close="colse">
    <div class="popup-layout">
      <div class="left-panel">
        <!-- 搜索框 -->
        <div class="left-search">
          <el-input v-model="searchText" prefix-icon="Search" placeholder="请输入关键字查询" clearable @input="onSearch" />
        </div>
        <!-- 左侧原数据列表 -->
        <ul v-infinite-scroll="getList" :infinite-scroll-delay="500" :infinite-scroll-disabled="scrollDisabled" class="left-list">
          <li v-for="item in listData" class="left-list--item">
            <el-checkbox :model-value="item.checked" :label="item.roleName" size="large" @change="onCheckChange(item)" />
          </li>
          <p v-if="loading"><el-divider>正在加载中... </el-divider></p>
          <p v-if="isLoading"><el-divider>没有更多数据~ </el-divider></p>
        </ul>
      </div>
      <div class="right-panel">
        <div class="right-info">已选 {{ selectData.length }} 条数据</div>
        <!-- 右侧展示选中结果 -->
        <ul class="right-list">
          <div v-for="item in selectData" class="right-list--item">
            <span> {{ item.roleName }}</span>
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
import { listRole } from '@/api'
import { debounce } from '@/utils'

const visible = ref(false)
const loading = ref(false)
const listData = ref<any[]>([])
const selectData = ref<any[]>([]) // 选中数据

// 搜索
const searchText = ref('')
const search = () => {
  listData.value = []
  page.value = 0
  isLoading.value = false
  getList()
}
const searchDebounce = debounce(search, 500)
const onSearch = () => {
  searchDebounce()
}
// 选中
const onCheckChange = (data: any) => {
  data.checked = !data.checked

  if (data.checked) {
    selectData.value.push(data)
  } else {
    selectData.value = selectData.value.filter((item: any) => item.id !== data.id)
  }
}
const onDelete = (data: any) => {
  selectData.value = selectData.value.filter((item: any) => item.id !== data.id)
  listData.value.forEach((item: any) => {
    if (item.id === data.id) {
      item.checked = false
    }
  })
}
const page = ref(0)
const pageSize = ref(10)
// 是否请求
const isLoading = ref(false)
const scrollDisabled = ref(false) // 滚是否禁用getList
// 检索数据
const selectIds = computed(() => {
  return selectData.value.map((item: any) => item.id)
})
const getList = async () => {
  loading.value = true
  try {
    if (isLoading.value) return
    scrollDisabled.value = true
    page.value++
    const res = await listRole({ page: { page: page.value, pageSize: pageSize.value }, roleName: searchText.value })
    listData.value.push(...res.data)
    listData.value = listData.value.map((item: any) => {
      return { ...item, checked: selectIds.value.includes(item.id) }
    })
    if (res.data.length < pageSize.value) {
      isLoading.value = true
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
    scrollDisabled.value = false
  }
}
// 打开弹窗
const open = (list: any[] = []) => {
  selectData.value = list
  visible.value = true
  listData.value = []
  page.value = 0
  getList()
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
