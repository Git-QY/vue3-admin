<template>
  <div class="login-form">
    <el-form :model="form" ref="loginFormRef" :rules="rules">
      <el-form-item label="" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"> </el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-form--submit" type="primary" size="large" @click="submitForm" :loading="loading">登录</el-button>
      </el-form-item>
      <div class="login-form--other">
        <el-button type="primary" size="small" link @click="loginConfig.setPane('register')">注册</el-button>
        <el-button type="primary" size="small" link @click="loginConfig.setPane('forget')">忘记密码</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import api from '@/api/user.ts'
import { ref, reactive, onMounted, inject } from 'vue'
const form = ref({ username: '', password: '' })
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const loginConfig = inject('loginConfig')
const loading = ref(false)
const loginFormRef = ref(null as any)

const submitForm = async () => {
  const res = await loginFormRef.value.validate()
  if (!res) return
  api.login(form.value).then(res => {
    console.log(res)
  })
}

onMounted(async () => {})
</script>
<style lang="scss" scoped></style>
