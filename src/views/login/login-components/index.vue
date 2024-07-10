<template>
  <div class="login" v-loading="loading">
    <p class="login-title">vue3-admin 后台管理</p>
    <div class="login-logo">{{ pane === forget ? '忘记密码' : pane === register ? '注册' : '登录' }}</div>
    <component :is="pane"></component>
    <footer class="footer">
      <el-divider class="divider">
        <span>其他登录方式</span>
      </el-divider>
      <div class="third-login-items">
        <div class="item" @click="giteeLogin">
          <img style="width: 100%; height: 100%" src="@/assets/images/giteeLogo.png" alt="" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import login from './login.vue'
import forget from './forget.vue'
import register from './register.vue'
import api from '@/api/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

// 第三方登录登录中加载状态
const loading = ref(false)

onMounted(async () => {
  const code = route.query.code as string
  if (code) {
    try {
      loading.value = true
      const data = await api.thirdLogin({ type: 'gitee', code })
      if (data.code === 200) {
        loading.value = false
        ElMessage.success('登录成功')
        userStore.token = data.data.token
        userStore.userInfo = data.data.userInfo
        router.push('/')
      }
    } catch (err: any) {
      ElMessage.error(err.message)
      loading.value = false
    }
  }
})

// markRaw 标记为原始类型，不做任何处理
let pane = ref(markRaw(login))
provide('loginConfig', {
  setPane: (name: any) => {
    pane.value = getComponent(name)
  },
})

const getComponent = (name: string) => {
  const componentMap: { [key: string]: any } = {
    login,
    forget,
    register,
  }
  return markRaw(componentMap[name] || login)
}

// 通过gitee登录
const giteeLogin = async () => {
  const client_id = 'c2c0c137422ab80e3a13ee7e242ae230b4825f5cf8cde692ce72ae99cea32f78'
  // const client_secret = '9d5f56dc5b8fc1ac9dc88a96ba322b0368ec4e94c49d594a5649fe492f4c6d1e'
  const redirect_uri = 'http://localhost:5173/loginWithGitee.html'
  const response_type = 'code'
  window.location.href = `https://gitee.com/oauth/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}`
}
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 400px;
  padding: 40px 10px;
  border-radius: 16px;
  height: 400px;
  &-title {
    font-weight: 600;
  }

  .login-logo {
    text-align: center;
    height: 50px;
    img {
      height: 40px;
      margin: 10px 0;
    }
  }
  .footer {
    width: 80%;
  }
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
