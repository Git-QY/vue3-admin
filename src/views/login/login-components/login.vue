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
import api, { LoginType } from '@/api/user.ts'
import router from '@/router';
import { ElMessage } from 'element-plus';
import { ref, reactive, onMounted, inject } from 'vue'
import { useUserStore } from '@/store';
const userStore = useUserStore()
const form = ref<LoginType>({ username: '', password: '' })
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const loginConfig = inject('loginConfig') as any
const loading = ref(false)
const loginFormRef = ref(null as any)

const submitForm = async () => {
  const res = await loginFormRef.value.validate()
  if (!res) return
  try {
    const res = await api.login(form.value)
    console.log(res)
    if(res.code === 200){
      ElMessage.success('登录成功')
      userStore.token = res.data.token
      router.push('/')
    }
  } catch (error:any) {
    ElMessage.error(error.message)
  }
}

onMounted(async () => {})
</script>
<style lang="scss" scoped>
.login-form {
  width: 70%;
    &--submit {
      width: 100%;
    }
    &--other {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
