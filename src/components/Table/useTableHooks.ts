//  抽取table
import { ref, onMounted, computed } from 'vue'
import { exportXlsx } from '@/api/utils'
import { deepClone, listToTree } from '@/utils'

export function useTable(options: any) {
  const tableData = ref<Object[]>([]) // 表格数据
  const loading = ref(false) // 表格loading
  const selectData = ref([]) // 表格选中的数据
  // 获取table数据
  async function getTableData() {
    try {
      loading.value = true
      if (options.type === 'tree') {
        const res = await options.api({ ...options.searchForm })
        tableData.value = listToTree(res.data)
      } else {
        const params = { page: options.page, ...options.searchForm }
        const res = await options.api(params)
        tableData.value = deepClone(res.data)
        options.page.total = res.page.total
      }
    } finally {
      loading.value = false
    }
  }
  const isPage = computed(() => options.type == 'tree')
  // 搜索
  const handleSearch = () => {
    options.page.page = 1
    getTableData()
  }
  // 分页
  const changePage = (page: number) => {
    options.page.page = page
    getTableData()
  }
  const changePageSize = (pageSize: number) => {
    options.page.pageSize = pageSize
    getTableData()
  }
  // 多选
  const handleSelectionChange = (val: any) => {
    selectData.value = val
  }
  // 暴露方法
  const refresh = () => {
    getTableData()
  }
  // 导出exportExcel
  const handleExportExcel = async () => {
    console.log('导出exportExcel')
    await exportXlsx()
  }
  // 打印print
  const handlePrint = () => {}
  onMounted(() => {
    getTableData()
  })
  return {
    loading,
    tableData,
    selectData,
    getTableData,
    handleSearch,
    changePage,
    changePageSize,
    refresh,
    handleSelectionChange,
    handleExportExcel,
    handlePrint,
    isPage,
  }
}
