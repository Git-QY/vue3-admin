<template>
  <div v-if="globalStore.reloadFlag" class="layout-main"><router-view></router-view></div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store'
const globalStore = useGlobalStore()
</script>
<style lang="scss" scoped></style>
