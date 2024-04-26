<template>
  <div class="header">
    <div class="header-left">
      <el-space size="large">
        <ToggleSidebar class="fold-btn" />
        <Breadcrumb class="action" />
      </el-space>
    </div>
    <div class="header-right">
      <el-space size="large">
        <Language />
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

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e4ef;
  &-left,
  &-right {
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
}
</style>
