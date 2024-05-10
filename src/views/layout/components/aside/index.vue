<template>
  <div class="layout-aside" :class="{ 'layout-aside--collapse': isCollapse }">
    <el-menu
      router
      :collapse="isCollapse"
      active-text-color="var(--primary)"
      background-color="#304156"
      :default-active="activePath"
      :collapse-transition="false"
      text-color="#fff"
      popper-class="pop-menu"
    >
      <template v-for="item in menuItems">
        <aside-item :item="item"></aside-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import asideItem from './aside-item.vue'
import { useGlobalStore, useAuthStore } from '@/store'
import { useRouter } from 'vue-router'

const globalStore = useGlobalStore()
const authStore = useAuthStore()
const router = useRouter()
const activePath = computed(() => router.currentRoute.value.path)
const isCollapse = computed(() => globalStore.isCollapse)

const menuItems = computed(() => authStore.getLeftMenuTree())
</script>
<style lang="scss" scoped></style>
