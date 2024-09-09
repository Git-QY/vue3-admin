<template>
  <div class="login-form">
    <el-form label-position="top" :model="form" ref="loginFormRef" :rules="rules">
      <el-form-item label="" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" :suffix-icon="User"> </el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" :suffix-icon="Lock"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-form--submit" type="primary" size="large" @click="submitForm" :loading="loading">登录</el-button>
      </el-form-item>
      <div class="login-form--footer">
        <el-button type="primary" size="small" link @click="loginConfig.setPane('register')">立即注册</el-button>
        <el-button type="primary" size="small" link @click="loginConfig.setPane('forget')">忘记密码</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import api, { LoginType } from '@/api/user.ts'
import { User, Lock } from '@element-plus/icons-vue'
import CryptoJS from 'crypto-js'
import { LoginProvide } from './interface'

const form = ref<LoginType>({ username: '', password: '' })
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const loginConfig = inject<LoginProvide>('loginConfig')
// 登录按钮加载效果
const loading = ref(false)
const loginFormRef = ref(null as any)

const submitForm = async () => {
  const res = await loginFormRef.value.validate()
  if (!res) return
  loading.value = true
  try {
    const password = CryptoJS.SHA256(form.value.password).toString()
    const res = await api.login({ username: form.value.username, password: password })
    loginConfig?.loginSuccess(res)
  } catch (error: any) {
    loginConfig?.loginFailure(error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {})
</script>
<style lang="scss" scoped></style>
