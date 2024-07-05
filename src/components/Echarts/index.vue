<template>
  <div :id="chartId" ref="chartRef" :style="style" v-loading="loading" />
</template>
<script setup lang="ts">
import { shallowRef, onMounted, computed, nextTick, onBeforeUnmount } from 'vue'
import echarts, { ECOption } from './config'
import { debounce } from '@/utils'

interface Props {
  option: ECOption
  width?: string
  height?: string
  loading?: boolean // 获取数据loading
}
const props = withDefaults(defineProps<Props>(), {
  option: () => ({}),
  width: '100%',
  height: '100%',
  loading: true,
})
const style = computed(() => ({ width: props.width, height: props.height }))
const chart = shallowRef<any>() // shallowRef 创建浅层响应式引用的函数
const chartId = computed(() => `chart-${new Date().getTime()}-${Math.random()}`)
const initChart = () => {
  chart.value = echarts.init(document.getElementById(chartId.value))
  chart.value.setOption(props.option)
}
const resize = () => {
  chart.value.resize({ animation: { duration: 300 } })
}
onMounted(async () => {
  await nextTick()
  // await new Promise(resolve => setTimeout(resolve, 1000)) // 延迟1s
  initChart()
  window.addEventListener('resize', debounce(resize, 300))
})
// 即将销毁的生命周期
onBeforeUnmount(() => {
  chart.value.dispose()
  window.removeEventListener('resize', debounce(resize, 300))
})

// 对父组件暴露获取 ECharts 实例的方法，可直接通过实例调用原生函数
defineExpose({
  getInstance: () => chart.value,
})
</script>
<style lang="scss" scoped></style>
