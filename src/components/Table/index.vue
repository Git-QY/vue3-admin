<template>
  <div class="page">
    <!-- 基础page配置 搜索表格分页 -->
    <!-- 搜索模块 -->
    <div class="page-search">
      <search :columns="props.columns" v-model="props.searchForm" :maxShow="3" @on-search="handleSearch">
        <!-- 获取全部插槽映射 -->
        <template v-for="(_, slot) in $slots" v-slot:[slot]="{ item }">
          <slot :name="slot" :item="item"></slot>
        </template>
      </search>
    </div>

    <!-- 按钮模块 -->
    <div clss="page-btn">
      <div class="page-btn--lf"><slot name="btnleft" /></div>
      <div class="page-btn--ri"><slot name="btnRight" /></div>
    </div>
    <!-- 表格模块 -->
    <div class="page-table">
      <el-table :data="props.data ?? tableData" :border="true" v-bind="props.table" v-loading="loading">
        <template v-for="item in tableColumns">
          <slot v-if="item.type == 'slot'" :name="item.prop" :item="item"></slot>
          <!-- upload -->
          <el-table-column v-else-if="item.type == 'upload'" v-bind="item" v-slot="{ row }">
            <fileIcon :data="row[item.prop]"></fileIcon>
          </el-table-column>

          <el-table-column v-else v-bind="item"></el-table-column>
        </template>
        <template #empty>
          <slot name="empty"><div>暂无数据</div></slot>
        </template>
      </el-table>
    </div>
    <!-- 分页模块 -->
    <div class="page-pagination">
      <div class="page-pagination--lf"></div>
      <div class="page-pagination--ri">
        <pagination :page="props.page" @set-page="setPage" @set-pageSize="setPageSize"></pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue'
import search from './components/search.vue'
import pagination from './components/pagination.vue'
import fileIcon from '@/components/FormItem/fileIcon.vue'
import { tableProps, columnsProps } from './type'
import { defaultConfig, deepMerge } from './config'

const prop = defineProps({
  data: { type: Array },
  table: { type: Object },
  searchForm: { type: Object },
  api: { type: Function },
  columns: { type: Array },
  page: { type: Object },
}) as tableProps
const props = reactive(deepMerge(defaultConfig, prop))
// 搜索
const handleSearch = () => {
  props.page.page = 1
  getList()
}

// 表格
const tableColumns = computed(() => props.columns.filter((item: columnsProps) => !item.hide))
const tableData = ref([])
const loading = ref(false)
const getList = async () => {
  if (!props.api) return
  loading.value = true
  const params = { page: props.page, ...props.searchForm }
  try {
    const res = await props.api(params)
    console.log(res)

    tableData.value = res.data
    props.page.total = res.page.total
  } catch (error) {
  } finally {
    loading.value = false
  }
}
// 分页
const setPage = (page: number) => {
  props.page.page = page
  getList()
}
const setPageSize = (pageSize: number) => {
  props.page.pageSize = pageSize
  getList()
}
onMounted(getList)
// 暴露方法
const refresh = () => {
  getList()
}

defineExpose({ refresh })
</script>

<style lang="scss" scoped>
.page {
  margin: 20px 20px 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  &-search {
  }
  &-table {
    margin: 20px 0;
  }
  &-btn,
  &-pagination {
    display: flex;
    justify-content: space-between;
  }
}
</style>
