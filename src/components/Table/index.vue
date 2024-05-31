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
    <div class="page-btn">
      <div class="page-btn--lf">
        <slot name="btnleft" />
      </div>
      <div class="page-btn--ri">
        <slot name="btnRight" />
        <!-- 打印 -->
        <svg-icon className="icon" iconName="icon-dayin" color="var(--text-color)" :size="18" @click="handlePrint" />
        <!-- 导出 -->
        <svg-icon className="icon" iconName="icon-daochu" color="var(--text-color)" :size="18" @click="handleExportExcel" />
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
        <pagination :page="props.page" @set-page="changePage" @set-pageSize="changePageSize"></pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import search from './components/search.vue'
import pagination from './components/pagination.vue'
import fileIcon from '@/components/FormItem/fileIcon.vue'
import { defaultConfig, deepMerge } from './config'
import { deepClone, getLabel } from '@/utils'
import { useTable } from './useTableHooks'
import { useDictStore } from '@/store'

const prop = defineProps({
  type: { type: String },
  data: { type: Array },
  table: { type: Object },
  searchForm: { type: Object },
  api: { type: Function },
  columns: { type: Array },
  page: { type: Object },
  maxShow: { type: Number, default: 3 },
}) as tableProps
const props = reactive(deepMerge(deepClone(defaultConfig), prop))
const { getTableData, tableData, loading, selectData, changePage, changePageSize, handleSelectionChange, refresh, handleSearch, handleExportExcel, handlePrint } = useTable(props)

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
onMounted(async () => {
  // *****************统一处理dict
  const dicts = props.columns.filter((item: columnsProps) => item.dict).map((item: columnsProps) => item.dict)
  await dictStore.getDicts(dicts)
  // *****************统一处理dict
})

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
    align-items: center;
  }
  &-btn {
    &--ri {
      display: flex;
      gap: 20px;
      .icon {
        box-sizing: border-box;
        cursor: pointer;
        &:hover {
        }
      }
    }
  }
}
</style>
