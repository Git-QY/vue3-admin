<template>
  <Echarts :option="option"></Echarts>
</template>

<script lang="ts" setup>
import { monthCountLog } from '@/api'
const option = ref<any>()
const xdata = ref<string[]>([])
const ydata = ref<number[]>([])
// 模拟请求数据
onMounted(async () => {
  const res = await monthCountLog()
  xdata.value = res.data.map((item: any) => Object.keys(item)[0])
  ydata.value = res.data.map((item: any) => Object.values(item)[0])
  option.value = {
    title: {
      text: '登录日志',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xdata.value,
    },
    yAxis: {
      type: 'value',
    },
    series: {
      name: '登录次数',
      type: 'line',
      smooth: true,
      stack: 'Total',
      data: ydata.value,
    },
  }
})
</script>

<style lang="scss" scoped></style>
