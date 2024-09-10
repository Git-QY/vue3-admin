<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-img" :style="{ backgroundImage: `url(${bgImg})` }"></div>
      <div class="login-content"><Login :onLogin="onLogin" ref="loginRef"></Login></div>
    </div>
    <footer class="login-footer">
      <div class="yiyan">{{ yiyan }}</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { getYiyan } from '@/api/utils'
import { getQuery } from '@/utils'
import { useUserStore, useAuthStore } from '@/store'
import router from '@/router'
import Login from './login-components/index.vue'
const userStore = useUserStore()
const authStore = useAuthStore()
const bgImg = ref('https://picui.cn//uploads/background/auth/382ae767058ba05c1eb2e6ba56cb1264.jpg')
const yiyan = ref('')
// 登录成功的回调
const onLogin = async (data: any) => {
  // 登录成功后跳转
  console.log('登录成功后跳转')
  // router.push('/')
  userStore.token = data.token
  userStore.userInfo = data.userInfo
  await authStore.getPermissionsMenus(userStore.userInfo.id, router) // 获取当前用户有权限的菜单按钮集合并且生成路由表
  router.push('/')
}
onMounted(async () => {
  const res = await getYiyan()
  yiyan.value = res.data
  thirdLogin()
})
// 第三方登录
const loginRef = ref<HTMLFormElement | null>(null)
const thirdLogin = async () => {
  const query = getQuery() as { [key: string]: string }
  if (query.code) {
    await loginRef.value?.thirdLogin(query)
  }
}
</script>
<style lang="scss">
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  font-size: 18px;
  .login-img {
    width: 70%;
    height: 100%;
    background-size: cover;
    background-position: 50%;
  }
  .login-content {
    flex: 1;
    display: flex;
    justify-content: center;
  }
}
.login-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  .yiyan {
    color: #fff;
    font-size: 12px;
  }
}
</style>
