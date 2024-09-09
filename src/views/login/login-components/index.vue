<template>
  <div class="qy-login">
    <div class="qy-login-container" v-loading="loading">
      <div class="qy-login-head">
        <div class="qy-login-title">欢迎使用 vue3-admin</div>
        <!-- <div class="qy-login-logo">{{ pane === forget ? '忘记密码' : pane === register ? '注册' : '登录' }}</div> -->
      </div>
      <TopCorner v-model:value="pane"></TopCorner>
      <component :is="componentPane"></component>
      <OtherMethods></OtherMethods>
    </div>
  </div>
</template>

<script setup lang="ts">
import login from './login.vue'
import forget from './forget.vue'
import register from './register.vue'
import qrCode from './qrCode/index.vue'
import api from '@/api/user'
import OtherMethods from './components/other-methods.vue'
import TopCorner from './components/top-corner.vue'
import { LoginProvide } from './interface'

import { ElMessage } from 'element-plus'
// import { useUserStore } from '@/store'
// const userStore = useUserStore()
// const route = useRoute()
// const router = useRouter()

const props = defineProps<{
  // 登录成功回调
  onLogin: (dataL: any) => void
}>()

const pane = ref<string>('login')
const componentPane = computed(() => getComponent(pane.value))
const getComponent = (name: string) => {
  const componentMap: { [key: string]: any } = {
    login,
    forget,
    register,
    qrCode,
  }
  return markRaw(componentMap[name] || login)
}

// 登录成功方法
const loginSuccess = async (res: any) => {
  // 登录成功回调
  if (res.code === 200) {
    if (props.onLogin) {
      props.onLogin(res.data)
    } else {
      console.warn('登录成功,没有配置 onLogin 回调方法')
    }
  } else {
    ElMessage.error(res.message)
  }
}
// 登录失败方法
const loginFailure = () => {
  ElMessage.error('登录失败')
}
// 第三方登录登录中加载状态
const loading = ref(false)
// 第三方免登录方法
const thirdLogin = async (data: { [key: string]: any }) => {
  const { code, type } = data
  if (!code || !type) return ElMessage.error('第三方免登录参数错误')
  loading.value = true
  let response = null
  try {
    switch (type) {
      case 'gitee':
        response = await api.thirdLogin({ type: 'gitee', code })
        break  
      default:
        throw new Error('暂不支持该第三方登录')
        break
    }
    await loginSuccess(response)
  } catch (error) {
    console.log("🚀 ~ thirdLogin ~ error:", error)
    ElMessage.error(error as resError)
    loading.value = false
  }
}
// markRaw 标记为原始类型，不做任何处理
// let pane = ref(markRaw(login))
const loginConfig: LoginProvide = {
  setPane: (name: string) => (pane.value = name),
  loginSuccess,
  loginFailure,
}
provide('loginConfig', loginConfig)
defineExpose({ thirdLogin })
</script>
<style lang="scss">
@import url(./index.scss);
</style>
