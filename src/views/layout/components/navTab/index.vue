<template>
  <div class="layout-navTab">
    <el-tabs :model-value="activeName" @tab-change="handleChange">
      <el-tab-pane v-for="item in navTabStore.tabsList" :key="item.fullPath" :label="item.title" :name="item.fullPath">
        <template #label>
          <div class="layout-navTab--item" :class="{ active: isActive(item) }">
            <span>{{ item.title }}</span>
            <el-icon @click.prevent.stop="removeTab(item)" v-if="isClose(item)" class="layout-navTab--item_close"><Close /></el-icon>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="layout-navTab--refresh" @click="handleRefresh">
      <Icon name="refresh"></Icon>
    </div>
    <el-dropdown trigger="click" class="layout-navTab--more" @command="handleCommand">
      <Icon class="el-dropdown-link" name="arrow-down"></Icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in navTabStore.tabMenuOptions" :key="item.key" :command="item.key" :disabled="item.disabled">
            <Icon :name="item.icon" />
            <span>{{ item.label }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavTabStore, useGlobalStore } from '@/store'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const navTabStore = useNavTabStore()
const globalStore = useGlobalStore()
const activeName = computed(() => route.fullPath)

// 路由添加tab
const addTab = () => {
  const { fullPath, meta } = route
  const tab: App.TabItem = { fullPath, title: meta.name, ...meta }
  console.log('🚀 ~ addTab ~ route:', route)
  if (meta.isHidden) return console.log('隐藏的路由不能添加到tabs') // 刷新的问题
  navTabStore.addTab(tab)
}
// 切换tab
const handleChange = (fullPath: string) => {
  router.push(fullPath)
}
// 路由删除tab
const removeTab = (item: App.TabItem) => {
  navTabStore.removeTab(item.fullPath)
}
const isClose = (item: App.TabItem) => {
  return item.fullPath !== '/home'
}
// 判断是否是当前激活的tab或者子集
const isActive = (item: App.TabItem) => {
  return route.fullPath.includes(item.fullPath)
}
watch(
  () => route.fullPath,
  () => addTab(),
)
onMounted(addTab)
const handleRefresh = () => globalStore.refresh()
const handleCommand = (command: string) => {
  switch (command) {
    case 'refresh':
      globalStore.refresh()
      break
    case 'closeCurrent':
      navTabStore.removeTab(route.fullPath)
      break
    case 'closeLeft':
      navTabStore.closeLeftTabs(route.fullPath)
      break
    case 'closeRight':
      navTabStore.closeRightTabs(route.fullPath)
      break
    case 'closeOther':
      navTabStore.closeOtherTabs(route.fullPath)
      break
    case 'closeAll':
      navTabStore.clearTabs()
      break
    default:
      break
  }
}
</script>

<style lang="scss" scoped></style>
