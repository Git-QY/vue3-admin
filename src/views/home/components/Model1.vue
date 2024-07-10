<template>
  <Echarts :option="option"></Echarts>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const option = ref({})
// 模拟请求数据
onMounted(() => {
  setTimeout(() => {
    option.value = defaultOptions
  }, 3000)
})
const defaultOptions = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Email', 'Union Ads'],
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
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      smooth: true,
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Union Ads',
      type: 'line',
      smooth: true,
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
  ],
}
</script>

<style lang="scss" scoped></style>
