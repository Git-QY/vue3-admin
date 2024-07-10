<template>
  <div class="map-btn" style="position: fixed; z-index: 99">
    <el-button type="primary" @click="backMap">返回上一级</el-button>
  </div>
  <div id="map" :style="{ width: '100%', height: '100vh' }"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useElementUI } from '@/hooks/useMessage'
import echarts, { ECOption } from '@/components/Echarts/config'
const { showMessage } = useElementUI()
// 获取地图json https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json
const mapJson = ref<any>(null)
const getMapJson = async (mapId: string) => {
  try {
    showLoading()
    const response = await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${mapId}_full.json`)
    if (!response.ok) {
      return showMessage('地图数据加载失败', 'error')
    }
    mapJson.value = await response.json()
  } catch (error) {
    showMessage('地图数据加载失败', 'error')
  } finally {
    hideLoading()
  }
}
onMounted(() => initMap())
const mapChart = ref<any>(null)
const initMap = () => {
  mapChart.value = echarts.init(document.getElementById('map'))
  renderMap(mapChart.value, '100000', '中国', true)
  mapChart.value.on('click', (param: any) => {
    const { adcode, name, isChildren } = param.data
    if (!param.data.isChildren) {
      // let center = param.data.properties.center
      // this.initGaudMap(center)
      // this.show = false
      // this.mapStack.push({ mapId: parentId, mapName: parentName }) // 到高德地图的变化
    } else {
      renderMap(mapChart.value, adcode, name, isChildren)
    }
  })
}
/**
 * myChart echarts实例
 * mapId   地图id
 * name    名称
 * flog    是否是向下还是返回
 */
const mapStack = ref<{ mapId: string; mapName: string }[]>([])
const renderMap = async (mapChart: any, mapId: string, name: string, flog: boolean) => {
  if (flog) {
    // 向下一级后，父级的ID、Name随之改变
    mapStack.value.push({ mapId: mapId, mapName: name })
  }
  await getMapJson(mapId)
  echarts.registerMap(name, mapJson.value)
  const mapData = mapJson.value.features.map((item: { properties: any }) => {
    console.log("🚀 ~ mapData ~ item:", item)
    const { name, adcode, level } = item.properties
    const data = (Math.random() * 80 + 20).toFixed(0) // 20-80随机数
    const tempValue = item.properties.center ? [...item.properties.center, data] : item.properties.center
    return {
      name,
      value: tempValue, // 中心点经纬度
      adcode, // 区域编码
      level, // 层级
      isChildren: level === 'district' ? false : true, // 模拟数据
    }
  })
  // 每次渲染 地图回归正常比例
  let optionData = {
    title: { text: name, subtext: '====', left: 'center' },
    series: [
      {
        name: '地图',
        type: 'map',
        map: name,
        roam: true,
        data: mapData,
      },
    ],
  }
  mapChart.setOption(optionData, true)
  window.addEventListener('resize', () => setTimeout(() => mapChart.resize(), 100))
}
// 返回上一级
const backMap = () => {
  if (mapStack.value.length > 1) {
    mapStack.value.pop()
    const { mapId, mapName } = mapStack.value[mapStack.value.length - 1]
    renderMap(mapChart.value, mapId, mapName, false)
  } else {
    showMessage('已经是最高级地图了', 'warning')
  }
}

// 即将销毁的生命周期
onBeforeUnmount(() => {
  // mapChart.value.dispose()
  // window.removeEventListener('resize', () => setTimeout(() => mapChart.resize(), 100))
})

// 加载中
const showLoading = () => {
  mapChart.value.showLoading({
    text: '加载中...',
    color: '#409EFF',
    textColor: '#333',
    maskColor: 'rgba(255, 255, 255, 0.8)',
    zlevel: 0,
  })
}
// 移除加载中
const hideLoading = () => {
  mapChart.value.hideLoading()
}
</script>

<style lang="scss" scoped></style>
