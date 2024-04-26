<template>
  <el-icon @click="handleCollapse">
    <component :is="globalStore.isCollapse ? 'Expand' : 'Fold'" />
  </el-icon>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store'
const globalStore = useGlobalStore()
const handleCollapse = () => globalStore.changeCollapse()
</script>

<style scoped></style>
