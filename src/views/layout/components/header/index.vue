<template>
  <el-space size="large" class="header-container">
    <div class="navigation">
      <ToggleSidebar class="fold-btn" />
      <Breadcrumb class="action" />
    </div>
    <el-tooltip class="user-tooltip" effect="light" placement="top">
      <template #content>
        <el-button text class="exit" @click="handleLogout">退出登录</el-button>
      </template>
      <span class="user-name">{{ userInfo.username }}</span>
    </el-tooltip>
  </el-space>
</template>

<script setup lang="ts">
import ToggleSidebar from './ToggleSidebar.vue'
import Breadcrumb from './Breadcrumb.vue'
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
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e4ef;
  .navigation {
    display: flex;
    align-items: center;
    .fold-btn {
      padding: 0 10px;
    }
    .action {
      margin-left: 10px;
    }
  }
  .exit {
    cursor: pointer;
  }
}

i {
  font-size: 19px;
  cursor: pointer;
}
:deep(.user-name) {
  cursor: pointer;
  margin-right: 20px;
  &:hover {
    background-color: #f5f5f5;
  }
}
</style>
