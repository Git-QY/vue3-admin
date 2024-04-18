<template>
  <el-icon>
    <component :is="globalStore.isCollapse ? 'Expand' : 'Fold'" @click="handleCollapse" />
  </el-icon>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store'
const globalStore = useGlobalStore()
const handleCollapse = () => globalStore.changeCollapse()
</script>

<style scoped></style>
