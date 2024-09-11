<template>
  <el-tooltip content="主题配置">
    <el-icon :size="20" @click="handleThemeDialog">
      <Setting />
    </el-icon>
  </el-tooltip>
  <el-drawer v-model="drawer" title="主题配置" :size="400">
    <template #default>
      <el-divider> 主题模式 </el-divider>
      <el-space size="large" direction="vertical" fill style="width: 100%">
        <!-- 主题色 -->
        <ThemeColor />
        <SwitchSetting v-model="isDarkSidebar" size="large" />
        <SwitchSetting v-model="isGray" size="large" title="灰度模式" />
      </el-space>
      <el-divider> 布局模式 </el-divider>
      <LayoutSelect />
    </template>
    <template #footer> footer </template>
  </el-drawer>
</template>

<script setup lang="ts">
import LayoutSelect from './LayoutSelect.vue'
import ThemeColor from './ThemeColor.vue'
import SwitchSetting from './SwitchSetting.vue'
import useTheme from '@/hooks/themeColor'

import { useGlobalStore } from '@/store'
const globalStore = useGlobalStore()
const { setGray } = useTheme()
const drawer = ref(false)
const handleThemeDialog = () => {
  drawer.value = !drawer.value
}
const isDarkSidebar = ref<any>(globalStore.isDarkSidebar)
watch(
  () => isDarkSidebar.value,
  val => globalStore.setGlobalState('isDarkSidebar', val),
)
const isGray = ref<any>(globalStore.isGray)
watch(
  () => isGray.value,
  val => {
    setGray(val as boolean)
    globalStore.setGlobalState('isGray', val)
  },
)
</script>

<style lang="scss" scoped></style>
