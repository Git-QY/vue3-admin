<template>
  <el-tabs v-model="globalStore.activePath" type="card" @tab-remove="onTabRemove" @tab-click="onTabClick">
    <el-tab-pane v-for="item in tabList" :label="item.title" :name="item.path" :closable="item.path !== '/home'"></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@/store'
import { ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const globalStore = useGlobalStore()
const tabList = ref(globalStore.tabList)
const addTab = () => {
  const { meta, path } = route
  const tab = {
    path,
    title: meta.title,
  }
  globalStore.addTab(globalStore.tabList, tab)
}
addTab()
const onTabClick = (event: any) => {
  globalStore.activePath = event.props.name
  router.push(event.props.name)
}

const onTabRemove = (targetName: any) => {
  const tabs = tabList.value

  // if (tabs.length === 1) return
  if (globalStore.activePath === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          globalStore.activePath = nextTab.path
        }
      }
    })
  }

  const newTab = tabs.filter(item => item.path !== targetName)
  tabList.value = newTab
  globalStore.tabList = newTab
  globalStore.activePath = globalStore.activePath
  router.push(globalStore.activePath)
}
watch(
  () => route.path,
  () => {
    globalStore.activePath = route.path
    addTab()
  },
)
</script>

<style lang="scss" scoped>
:deep.el-tabs {
  --el-tabs-header-height: 32px;
  line-height: 32px;
}
:deep(.el-tabs__item) {
  font-size: 12px;
}
:deep(.el-tabs__item:hover) {
  color: #000;
}
:deep(.el-tabs__item.is-active) {
  color: #000;
  background-color: #f5f5f5;
}
:deep.el-tabs--card .el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: #e0e4ef;
}
</style>
