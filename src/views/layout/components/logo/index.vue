<template>
  <div class="layout-logo" :class="{ 'layout-logo--collapse': isCollapse }" @click="goHome">
    <img class="logo" v-if="!isCollapse" src="~@/assets/svgs/logo1.svg" />
    <img class="logo" v-else src="~@/assets/svgs/logo2.svg" />
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
