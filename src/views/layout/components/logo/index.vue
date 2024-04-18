<template>
  <div class="brand" @click="goHome">
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

<style lang="scss" scoped>
.brand {
  color: #fff;
  height: 48px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .logo {
    max-width: 32px;
    max-height: 32px;
  }
  .title {
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    margin-left: 8px;
    transition: all 0.5s;
  }
}
</style>
