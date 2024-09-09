<template>
  <div class="other-methods">
    <el-divider class="divider">
      <span>其他登录方式</span>
    </el-divider>
    <div class="third-login-items">
      <div class="item" @click="giteeLogin"><img style="width: 100%; height: 100%" :src="giteeLogo" alt="" /></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Constants from '@/constants'
import giteeLogo from '@/assets/images/giteeLogo.png'

// 定义常量
const GITEE_CLIENT_ID = Constants.GITEE_CLIENT_ID
const REDIRECT_URI = 'http://615orob70703.vicp.fun/loginWithGitee.html'
const RESPONSE_TYPE = 'code'
const GITEE_AUTH_URL = `https://gitee.com/oauth/authorize?client_id=${GITEE_CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}`

// Gitee 登录处理函数
const giteeLogin = () => {
  window.location.href = GITEE_AUTH_URL
}
</script>

<style lang="scss" scoped>
.other-methods {
  .third-login-items {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      width: 30px;
      height: 30px;
      :hover {
        cursor: pointer;
      }
    }
  }
}
</style>
