<template>
  <div class="layout-aside" :class="{ 'layout-aside--collapse': isCollapse }">
    <el-menu
      router
      :mode="mode"
      :collapse="isCollapse"
      active-text-color="var(--primary)"
      :default-active="activePath"
      :collapse-transition="false"
      :default-openeds="defaultOpeneds"
      popper-class="pop-menu"
    >
      <template v-for="item in menuList">
        <aside-item :item="item"></aside-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import asideItem from './aside-item.vue'
import { useGlobalStore, useAuthStore } from '@/store'
import { useRoute } from 'vue-router'
import { Menu } from '@/api'
const props = defineProps({
  menuList: { type: Array, default: () => [] },
  mode: { type: String, default: 'vertical' },
})
const globalStore = useGlobalStore()
const authStore = useAuthStore()
const route = useRoute()
const isCollapse = computed(() => globalStore.isCollapse)
const menuList = computed(() => {
  if (props.menuList.length === 0) {
    return authStore.getLeftMenuTree()
  } else {
    return props.menuList
  }
})
// 匹配路由
const activePath = computed(() => {
  try {
    const menu = authStore.permissionsMenus.filter((item: Menu) => item.menuType == '1' && !item.isHidden)
    const full = route.fullPath.split('?')[0]
    const isSame = menu.find((item: Menu) => full === item.path) || { path: '' }
    if (isSame.path) return isSame.path
    return menu.filter((item: Menu) => full.startsWith(item.path)).sort((a: Menu, b: Menu) => b.path.length - a.path.length)[0].path
  } catch (error) {}
})
const defaultOpeneds = computed(() => {
  return authStore.permissionsMenus.filter(item => !item.isFold && item.path).map(item => item.path)
})
</script>
<style lang="scss" scoped></style>
