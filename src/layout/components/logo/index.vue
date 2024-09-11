<template>
  <div class="layout-logo" :class="{ 'layout-logo--collapse': isCollapse }" @click="goHome">
    <img class="logo" v-if="!isCollapse" :src="logo1" />
    <img class="logo" v-else :src="logo2" />
  </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/store'
import logo1_fff from '@/assets/svgs/logo1.svg'
import logo2_fff from '@/assets/svgs/logo2.svg'
import logo1_000 from '@/assets/svgs/logo1-000.svg'
import logo2_000 from '@/assets/svgs/logo2-000.svg'
const router = useRouter()
const globalStore = useGlobalStore()
const isCollapse = computed(() => globalStore.isCollapse)
const isDarkSidebar = computed(() => globalStore.isDarkSidebar)
const logo1 = computed(() => (isDarkSidebar.value ? logo1_fff : logo1_000))
const logo2 = computed(() => (isDarkSidebar.value ? logo2_fff : logo2_000))
const goHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
