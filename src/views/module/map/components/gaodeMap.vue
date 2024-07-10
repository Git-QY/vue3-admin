<template>
  <div id="gaudMap" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import Constants from '@/constants'
const gaudMap = ref(null)
console.log("🚀 ~ gaudMap:", gaudMap)
onMounted(() => {
  initGaudMap()
})
const initGaudMap = () => {}
</script>

<style lang="scss" scoped></style>
