<template>
  <div class="layout-logo" @click="goHome">
    <img class="logo" src="~@/assets/logo.svg" />
    <div v-show="!isCollapse" class="title">Vue3</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@/store'
const router = useRouter()
const globalStore = useGlobalStore()
const isCollapse = computed(() => globalStore.isCollapse)
const goHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
