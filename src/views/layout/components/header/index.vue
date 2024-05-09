<template>
  <div class="layout-header">
    <div class="layout-header--left">
      <el-space size="large">
        <ToggleSidebar class="fold-btn" />
        <Breadcrumb class="action" />
      </el-space>
    </div>
    <div class="layout-header--right">
      <el-space size="large">
        <Language />
        <FullScreen />
        <ThemeSetting />
        <el-tooltip effect="light" placement="top">
          <template #content>
            <el-button text class="exit" @click="handleLogout">退出登录</el-button>
          </template>
          <span>{{ userInfo.username }}</span>
        </el-tooltip>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import ToggleSidebar from './components/ToggleSidebar.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Language from './components/Language.vue'
import FullScreen from './components/FullScreen.vue'
import ThemeSetting from './components/ThemeSetting.vue'

import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

const router = useRouter()
const userStore = useUserStore()
const userInfo = userStore.userInfo

const handleLogout = () => {
  router.push('/login')
  userStore.reset()
}
</script>

<style scoped lang="scss"></style>
