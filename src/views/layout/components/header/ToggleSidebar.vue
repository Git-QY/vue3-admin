<template>
  <el-icon>
    <component :is="store.isCollapse ? 'Expand' : 'Fold'" @click="handleCollapse" />
  </el-icon>
</template>

<script setup lang="ts">
import { useStoreApp } from '@/store'

const store = useStoreApp()

const handleCollapse = () => {
  store.isCollapse = !store.isCollapse
  
}
</script>

<style scoped></style>
