<template>
  <div class="layout-logo" :class="{ 'layout-logo--collapse': isCollapse }" @click="goHome">
    <img class="logo" src="~@/assets/svgs/logo.svg" />
    <span class="title" v-if="!isCollapse">ADMIN</span>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/store'
const router = useRouter()
const globalStore = useGlobalStore()
const isCollapse = computed(() => globalStore.isCollapse)
const goHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
