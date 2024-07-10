<template>
  <div v-if="globalStore.reloadFlag" class="layout-main">
    <router-view v-slot="{ Component, route }" v-if="route.meta.isKeepAlive">
      <keep-alive :max="16"><component :is="Component" :key="route.fullPath" /> </keep-alive>
    </router-view>
    <router-view v-else></router-view>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store'
const route = useRoute()
const globalStore = useGlobalStore()
</script>
<style lang="scss" scoped></style>
