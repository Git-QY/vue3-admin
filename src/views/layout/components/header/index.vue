<template>
  <div class="layout-header">
    <div class="layout-header--left" v-if="globalStore.layout !== 'horizontal'">
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
        <SwitchTheme />
        <el-tooltip effect="light" placement="top">
          <template #content>
            <el-button text class="exit" @click="handleLogout">退出登录</el-button>
          </template>
          <div class="layout-header--avatar">
            <el-avatar :size="30" :src="avatar" />
            <span>{{ userInfo.username }}</span>
          </div>
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
import SwitchTheme from './components/SwitchTheme.vue'

import { useRouter } from 'vue-router'
import { useUserStore, useGlobalStore } from '@/store'
import { computed } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const globalStore = useGlobalStore()
const userInfo = userStore.userInfo

const handleLogout = () => {
  router.push('/login')
  userStore.reset()
}

const avatar = computed(() => {
  return userInfo.avatar || 'https://p3-passport.byteacctimg.com/img/user-avatar/1f21e9f5c7724b9112d7a7f4a2405858~120x120.awebp'
})
</script>

<style scoped lang="scss"></style>
