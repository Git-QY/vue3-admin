<template>
  <div id="gaudMap" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import Constants from '@/constants'
const gaudMap = ref(null)
const initMap = async () => {
  const map = await AMapLoader.load({
    key: Constants.GAODE_MAP_key,
    version: '2.0',
    plugins: ['AMap.Geolocation', 'AMap.Geocoder', 'AMap.DistrictSearch', 'AMap.DistrictLayer', 'AMap.DistrictExplorer'],
  })
  gaudMap.value = new map.Map('gaudMap', { viewMode: '2D', zoom: 13 }) // 创建地图
}
onMounted(() => {
  initMap()
})
</script>

<style lang="scss" scoped></style>
