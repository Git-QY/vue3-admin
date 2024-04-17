<template>
  <div class="login-form">
    <el-form 
      label-position="top"
      :model="form" 
      ref="loginFormRef" 
      :rules="rules"
      >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" :suffix-icon="User"> </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" :suffix-icon="Lock"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-form--submit" type="primary" size="large" @click="submitForm" :loading="loading">登录</el-button>
      </el-form-item>
      <div class="login-form--other">
        <el-button type="primary" size="small" link @click="loginConfig.setPane('register')">立即注册</el-button>
        <el-button type="primary" size="small" link @click="loginConfig.setPane('forget')">忘记密码</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import api, { ReqLoginType } from '@/api/modules/user'
import router from '@/router';
import { ElMessage } from 'element-plus';
import { User,Lock } from '@element-plus/icons-vue'
import { ref, reactive, onMounted, inject } from 'vue'
import { useUserStore } from '@/store';
import CryptoJS from 'crypto-js'
const userStore = useUserStore()
const form = ref<ReqLoginType>({ username: '', password: '' })
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const loginConfig = inject('loginConfig') as any
// 登录按钮加载效果
const loading = ref(false)
const loginFormRef = ref(null as any)

const submitForm = async () => {
  const res = await loginFormRef.value.validate()
  if (!res) return
  loading.value = true
  try {
    const password = CryptoJS.SHA256(form.value.password).toString()
    const res = await api.login({username: form.value.username, password: password})
    if(res.code === 200){
      ElMessage.success('登录成功')
      userStore.token = res.data.token
      router.push('/')
      loading.value = false
    }
  } catch (error:any) {
    loading.value = false
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
