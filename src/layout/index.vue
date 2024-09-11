<template>
  <component :is="LayoutComponent[layout]" :sidebarClass="sidebarClass"></component>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/store'
import LayoutClassic from './LayoutClassic/index.vue'
import LayoutVertical from './LayoutVertical/index.vue'
import LayoutHorizontal from './LayoutHorizontal/index.vue'
import LayoutColumns from './LayoutColumns/index.vue'
import { type Component } from 'vue'

const globalState = useGlobalStore()
const layout = computed(() => globalState.layout)
type LayoutType = 'vertical' | 'columns' | 'classic' | 'horizontal' | string
const LayoutComponent: Record<LayoutType, Component> = {
  vertical: LayoutVertical,
  columns: LayoutColumns,
  classic: LayoutClassic,
  horizontal: LayoutHorizontal,
}
// 是否深色侧边栏
const sidebarClass = computed(() => {
  return { dark: globalState.isDarkSidebar }
})
</script>

<style lang="scss">
@import url(./index.scss);
</style>
