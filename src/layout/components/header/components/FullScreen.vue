<template>
  <!-- 全屏 -->
  <el-tooltip :content="globalStore.isFullscreen ? '退出全屏' : '全屏'">
    <el-icon :size="20" @click="toggle">
      <svg-icon v-if="!globalStore.isFullscreen" iconName="icon-expand" :size="20" color="var(--text-color)" />
      <svg-icon v-else iconName="icon-compress" :size="20" color="var(--text-color)" />
    </el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { useGlobalStore } from '@/store'
const { isFullscreen, toggle } = useFullscreen()
const globalStore = useGlobalStore()
watch(isFullscreen, val => globalStore.setGlobalState('isFullscreen', val))
</script>
<style lang="scss" scoped></style>
