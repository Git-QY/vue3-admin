<template>
  <div>
    <el-pagination
      :background="true"
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { pageProps } from '../type'
const props = defineProps({
  page: { type: Object },
})
const { page, pageSize, total, pageSizes, layout } = toRefs(props.page as pageProps)
const emits = defineEmits(['set-page', 'set-pageSize'])

const handleSizeChange = (val: number) => {
  pageSize.value = val
  emits('set-pageSize', val)
}

const handleCurrentChange = (val: number) => {
  page.value = val
  emits('set-page', val)
}
</script>

<style lang="scss" scoped></style>
