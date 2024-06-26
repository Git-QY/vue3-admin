<template>
  <div class="demo-upload">
    <el-tabs v-model="activeName" type="card" class="demo-tabs">
      <el-tab-pane v-for="item in components" :label="item.label" :name="item.label" lazy>
        <div v-if="activeName == '基础地区组件'">
          <!-- 配置条件 -->
          <Form class="form" :columns="columns" v-model="item.props" ref="formRef"> </Form>
        </div>
        <component :is="item.component" v-bind="item.props" v-model="item.value" />
        <p>{{ item.value }}</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import Region from '@/components/FormItem/region.vue'
import { ref, markRaw, reactive, type Component } from 'vue'
interface ComponentItem {
  label: string
  component: Component
  value: any
  props: Object
}
const components = ref<ComponentItem[]>([
  {
    label: '基础地区组件',
    component: markRaw(Region),
    props: {
      level: 'area',
      disabled: false,
      valueType: '1',
    },
    value: ['110000000000', '110100000000', '110101000000'],
  },
  {
    label: '基础地区组件1',
    component: markRaw(Region),
    props: {
      level: 'area',
      disabled: false,
      valueType: '2',
    },
    value: [
      { label: '北京市', value: '110000000000' },
      { label: '北京市', value: '110100000000' },
      { label: '东城区', value: '110101000000' },
    ],
  },
  {
    label: '基础地区组件2',
    component: markRaw(Region),
    props: {
      level: 'area',
      disabled: false,
      valueType: '3',
    },
    value: {
      provinceCode: '110000000000',
      provinceName: '北京市',
      cityCode: '110100000000',
      cityName: '北京市',
      areaCode: '110101000000',
      areaName: '东城区',
    },
  },
])
const activeName = ref('基础地区组件')

const columns = reactive([
  {
    label: '显示级别',
    prop: 'level',
    type: 'radio-group',
    options: [
      { label: '一级', value: 'province' },
      { label: '二级', value: 'city' },
      { label: '三级', value: 'area' },
      { label: '四级', value: 'county' },
      { label: '五级', value: 'street' },
    ],
  },
  { label: '是否禁用', prop: 'disabled', type: 'switch' },
])
</script>

<style lang="scss" scoped>
.demo-upload {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
