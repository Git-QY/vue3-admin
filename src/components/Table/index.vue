<template>
  <div class="page">
    <!-- 基础page配置 搜索表格分页 -->
    <!-- 搜索模块 -->

    <!-- 表格模块 -->
    <div class="page-table">
      <el-table :data="props.data ?? tableData" :border="true" v-bind="props.table">
        <template v-for="item in tableColumns">
          <slot v-if="item.type == 'slot'" :name="item.prop" :item="item"></slot>
          <el-table-column v-else v-bind="item"></el-table-column>
        </template>
        <template #empty>
          <slot name="empty"><div>暂无数据</div></slot>
        </template>
      </el-table>
    </div>
    <!-- 分页模块 -->
    <div class="page-pagination">
      <div class="page-pagination-ri"></div>
      <div class="page-pagination-lf">
        <pagination :page="props.page" @set-page="setPage" @set-pageSize="setPageSize"></pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue'
import pagination from './components/pagination.vue'
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
</script>

<style lang="scss" scoped>
.page {
  &-table {
    margin: 20px 0;
  }
  &-pagination {
    display: flex;
    justify-content: space-between;
  }
}
</style>
