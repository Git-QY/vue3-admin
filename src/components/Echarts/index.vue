<template>
  <div :id="chartId" ref="chartRef" :style="style" />
</template>

<script setup lang="ts">
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
  // props.option == {} 不渲染展示加载中
  function isEmptyObject(obj: object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }
  showLoading()
  if (!isEmptyObject(props.option)) {
    chart.value.setOption(props.option)
    hideLoading()
  }
}
const resize = () => {
  chart.value.resize({ animation: { duration: 300 } })
}
onMounted(async () => {
  await nextTick()
  initChart()
  window.addEventListener('resize', debounce(resize, 300))
})

watch(
  () => props.option,
  newVal => {
    if (newVal) {
      chart.value.setOption(newVal)
      hideLoading()
    }
  },
  { deep: true },
)

// 即将销毁的生命周期
onBeforeUnmount(() => {
  chart.value.dispose()
  window.removeEventListener('resize', debounce(resize, 300))
})

// 对父组件暴露获取 ECharts 实例的方法，可直接通过实例调用原生函数
defineExpose({
  getInstance: () => chart.value,
})

// 加载中
const showLoading = () => {
  chart.value.showLoading({
    text: '加载中...',
    color: '#409EFF',
    textColor: '#333',
    maskColor: 'rgba(255, 255, 255, 0.8)',
    zlevel: 0,
  })
}
// 移除加载中
const hideLoading = () => {
  chart.value.hideLoading()
}
</script>

<style lang="scss" scoped></style>
