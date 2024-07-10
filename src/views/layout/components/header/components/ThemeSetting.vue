<template>
  <el-tooltip content="主题配置">
    <el-icon :size="20" @click="handleThemeDialog">
      <Setting />
    </el-icon>
  </el-tooltip>
  <el-drawer v-model="drawer" title="主题配置" :size="400">
    <template #default>
      <el-divider> 主题模式 </el-divider>
      <!-- 主题色 -->
      <ThemeColor />
      <SelectColor title="头部背景色(测试)" type="header-bg" />
      <SelectColor title="侧边栏背景色(测试)" type="aside-bg" />

      <el-divider> 布局模式 </el-divider>
      <LayoutSelect />
    </template>
    <template #footer> footer </template>
  </el-drawer>
</template>

<script setup lang="ts">
import LayoutSelect from './LayoutSelect.vue'
import ThemeColor from './ThemeColor.vue'
import SelectColor from './SelectColor.vue'

const drawer = ref(false)
const handleThemeDialog = () => {
  drawer.value = !drawer.value
}
</script>

<style lang="scss" scoped></style>
