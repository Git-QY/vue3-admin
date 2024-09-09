<template>
  <div :id="chartId" ref="chartRef" :style="style" />
</template>

<script setup lang="ts">
import echarts, { ECOption } from './config'
import { debounce, isEmptyObject } from '@/utils'

interface Props {
  option: ECOption
  width?: string
  height?: string
  loading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  option: () => ({}),
  width: '100%',
  height: '100%',
  loading: true,
})
const style = computed(() => ({ width: props.width, height: props.height }))
const chart = shallowRef<any>()
const chartId = computed(() => `chart-${new Date().getTime()}-${Math.random()}`)

const initChart = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  chart.value = echarts.init(document.getElementById(chartId.value))

  showLoading()
  if (!isEmptyObject(props.option)) {
    chart.value.setOption(props.option)
    hideLoading()
  }
}
const resize = () => {
  chart.value.resize({ animation: { duration: 300 } })
}
const chartRef = ref<HTMLDivElement>()
onMounted(async () => {
  await nextTick()
  await initChart()
  window.addEventListener('resize', debounce(resize, 300))
  // resizeObserver.value = new ResizeObserver(resize)
  // chartRef.value?.parentElement && resizeObserver.value.observe(chartRef.value.parentElement)
})
watch(
  () => props.option,
  newVal => {
    if (newVal) {
      if (isEmptyObject(newVal)) return
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
  // if (resizeObserver.value && chartRef.value?.parentElement) {
  //   resizeObserver.value.unobserve(chartRef.value.parentElement)
  // }
})
defineExpose({
  getInstance: () => chart.value,
  setOption: (option: ECOption) => chart.value.setOption(option),
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
