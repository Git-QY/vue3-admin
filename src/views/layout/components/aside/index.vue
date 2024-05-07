<template>
  <Logo />
  <el-menu
    active-text-color="#ffd04b"
    @select="setActivePath"
    :collapse="isCollapse"
    background-color="#304156"
    class="el-menu-vertical-demo"
    :default-active="activePath"
    text-color="#fff"
    :router="true"
  >
    <template v-for="item in menuItems">
      <aside-item :item="item"></aside-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import asideItem from './aside-item.vue'
import Logo from '../logo/index.vue'
import { useGlobalStore, useAuthStore } from '@/store'
import { useRouter } from 'vue-router'

const globalStore = useGlobalStore()
const authStore = useAuthStore()
const router = useRouter()
const setActivePath = (path: string) => (globalStore.activePath = path)
const activePath = computed(() => router.currentRoute.value.path)
const isCollapse = computed(() => globalStore.isCollapse)

const menuItems = computed(() => authStore.getLeftMenuTree())
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.el-menu {
  border-right: none;
}
.el-menu-item.is-active {
  background-color: #001528 !important;
  color: #409eff;
  span {
    color: #fff !important;
  }
}
</style>
