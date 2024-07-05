<template>
  <Echarts :option="defaultOptions"></Echarts>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const defaultOptions = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [
        120,
        {
          value: 200,
          itemStyle: {
            color: '#a90000',
          },
        },
        150,
        80,
        70,
        110,
        130,
      ],
      type: 'bar',
    },
  ],
}
</script>

<style lang="scss" scoped></style>
