<template>
  <Logo />
  <el-menu active-text-color="#ffd04b" :collapse="isCollapse" background-color="#304156" class="el-menu-vertical-demo" :default-active="activePath" text-color="#fff" :router="true">
    <template v-for="(item, index) in menuItems">
      <template v-if="item.children">
        <SubMenu :item="item" :key="index" />
      </template>
      <template v-else>
        <MenuItem :item="item" :key="index" />
      </template>
      <!-- <aside-item :item="item"></aside-item> -->
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import SubMenu from './SubMenu.vue'
import MenuItem from './MenuItem.vue'
// import asideItem from './aside-item.vue'

import Logo from '../logo/index.vue'
import { computed, ref } from 'vue'
import { useGlobalStore } from '@/store'
import { useRouter } from 'vue-router'

const globalStore = useGlobalStore()
const router = useRouter()

const activePath = computed(() => {
  return router.currentRoute.value.path
})

const isCollapse = computed(() => {
  return globalStore.isCollapse
})

const menuItems = ref([
  {
    name: '首页',
    path: '/home',
    hidden: false,
    icon: 'HomeFilled',
  },
  {
    name: '系统管理',
    path: 'system',
    hidden: false,
    icon: 'Tools',
    children: [
      {
        name: '用户管理',
        path: '/user',
        hidden: false,
      },
      {
        name: '角色管理',
        path: '/roles',
        hidden: false,
      },
    ],
  },
])
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
