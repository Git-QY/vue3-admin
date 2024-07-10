<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs">
    <el-tab-pane v-for="item in components" :label="item.label" :name="item.label" lazy style="height: 100%">
      <!-- 配置条件 -->
      <Form class="form" :columns="columns" v-model="item.props" ref="formRef"> </Form>
      <component :is="item.component" v-bind="item.props" />
      <p>{{ item.value }}</p>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import chinaMap from './components/chinaMap.vue'
import gaodeMap from './components/gaodeMap.vue'
import { ref, markRaw, type Component } from 'vue'
interface ComponentItem {
  label: string
  component: Component
  value?: any
  props: Object
}
const columns = ref<any[]>([])
const activeName = ref('高德地图')
const components = ref<ComponentItem[]>([
  {
    label: '中国地图下钻',
    component: markRaw(chinaMap),
    props: {},
  },
  {
    label: '高德地图',
    component: markRaw(gaodeMap),
    props: {},
  },
])
</script>

<style lang="scss" scoped>
.el-tabs {
  height: 100%;
  ::v-deep(.el-tabs__content) {
    height: calc(100% - 41px);
  }
}
</style>
