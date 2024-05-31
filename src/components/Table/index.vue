<template>
  <div class="page">
    <!-- 基础page配置 搜索表格分页 -->
    <!-- 搜索模块 -->
    <div class="page-search">
      <search :columns="props.columns" v-model="props.searchForm" :maxShow="maxShow" @on-search="handleSearch">
        <!-- 获取全部插槽映射 -->
        <template v-for="(_, slot) in $slots" v-slot:[slot]="{ item }">
          <slot :name="slot" :item="item"></slot>
        </template>
      </search>
    </div>

    <!-- 按钮模块 -->
    <div clss="page-btn">
      <div class="page-btn--lf">
        <slot name="btnleft" />
      </div>
      <div class="page-btn--ri">
        <slot name="btnRight" />
      </div>
    </div>
    <!-- 表格模块 -->
    <div class="page-table">
      <el-table :data="props.data ?? tableData" :border="true" v-bind="props.table" v-loading="loading" @selection-change="handleSelectionChange">
        <template v-for="item in tableColumns">
          <slot v-if="item.type == 'slot'" :name="item.prop" :item="item"></slot>
          <!-- upload -->
          <el-table-column v-else-if="item.type == 'upload'" v-bind="item" v-slot="{ row }">
            <fileIcon :data="row[item.prop]"></fileIcon>
          </el-table-column>
          <el-table-column v-else-if="item.type == 'tag'" v-bind="item" v-slot="{ row }">
            <el-tag :type="getLabel(item.options, row[item.prop], true).type">{{ getLabel(item.options, row[item.prop]) }}</el-tag>
          </el-table-column>
          <!-- tag -->
          <el-table-column v-else v-bind="item"></el-table-column>
        </template>
        <template #empty>
          <slot name="empty">
            <div>暂无数据</div>
          </slot>
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
import { defaultConfig, deepMerge } from './config'
import { deepClone, getLabel, listToTree } from '@/utils'

const prop = defineProps({
  data: { type: Array },
  table: { type: Object },
  searchForm: { type: Object },
  api: { type: Function },
  columns: { type: Array },
  page: { type: Object },
  maxShow: { type: Number, default: 3 },
}) as tableProps
const props = reactive(deepMerge(deepClone(defaultConfig), prop))
// 搜索
const handleSearch = () => {
  props.page.page = 1
  getList()
}

// 表格
import { useDictStore } from '@/store'
const dictStore = useDictStore()
const tableColumns = computed(() => {
  return props.columns
    .filter((item: columnsProps) => !item.hide)
    .map((item: columnsProps) => {
      if (item.dict) {
        item.options = dictStore.dictDataGetter[item.dict]
      }
      return item
    })
})
const tableData = ref<Object[]>([]) // 表格数据
const loading = ref(false)
const selectData = ref([]) // 表格选中的数据
const getList = async () => {
  if (!props.api) return
  loading.value = true
  const params = { page: props.page, ...props.searchForm }
  try {
    const res = await props.api(params)
    tableData.value = listToTree(deepClone(res.data))
    props.page.total = res.page.total
  } catch (error) {
  } finally {
    loading.value = false
  }
}

const handleSelectionChange = (val: any) => {
  selectData.value = val
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
onMounted(async () => {
  getList()
  // *****************统一处理dict
  const dicts = props.columns.filter((item: columnsProps) => item.dict).map((item: columnsProps) => item.dict)
  await dictStore.getDicts(dicts)
  // *****************统一处理dict
})
// 暴露方法
const refresh = () => {
  getList()
}

defineExpose({ refresh, selectData })
</script>

<style lang="scss" scoped>
.page {
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
