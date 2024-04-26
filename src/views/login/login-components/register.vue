<template>
  <div class="register-form">
    <el-form 
    label-position="top"
    :model="registerform" 
    ref="registerFormRef" 
    :rules="registerrules"
    >
      <el-form-item label="" prop="username">
        <el-input 
        v-model.trim="registerform.username" 
        placeholder="请输入用户名" 
        :suffix-icon="User"
        > </el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input 
        type="password" 
        v-model.trim="registerform.password" 
        placeholder="请输入密码" 
        autocomplete="new-password" 
        show-password
        :suffix-icon="Lock"
        > </el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="" prop="email">
        <el-input v-model="registerform.email" placeholder="请输入邮箱" :suffix-icon="Message"> </el-input>
      </el-form-item>
      <!-- 获取邮箱code 点击发送 -->
      <verifycode-field v-model="registerform.code" :disabled="verifycodeDisabled" :send="getEmailCode"></verifycode-field>
      <el-form-item>
        <el-button class="register-form--submit" type="primary" size="large" @click="submitForm" :loading="loading">注册</el-button>
      </el-form-item>
      <div class="register-form--other">
        <el-button type="primary" size="small" link @click="registerConfig.setPane('login')">已有账号？去登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import api, { RegisterType } from '@/api/user.ts'
import { FormRules, ElMessage } from 'element-plus'
import { ref, reactive, inject, computed } from 'vue'
import verifycodeField from './components/verifycode-field.vue'
import { User,Lock,Message} from '@element-plus/icons-vue'
import CryptoJS from 'crypto-js'
// 注册form表单
const registerform = ref<RegisterType>({ username: '', password: '', email: '', code: '' })
// 注册表单验证
const registerrules = reactive<FormRules<RegisterType>>({
  username: [{ required: true, max: 10, min: 4, message: '请输入4-10位用户名', trigger: 'blur ' }],
  password: [{ required: true, max: 10, min: 6, message: '请输入6-10位密码', trigger: 'blur' }],
  email: [{ required: true, type: 'email', message: '请输入邮箱', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})
const registerConfig = inject('loginConfig') as any

const verifycodeDisabled = computed(() => {
  const emailRegular = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)
  return !!registerform.value.email && emailRegular.test(registerform.value.email)
})
// 获取邮箱验证码
const getEmailCode = async () => {
  return api.emailCode(registerform.value.email)
}

// 注册按钮加载状态
const loading = ref<boolean>(false)
// 注册表单dom
const registerFormRef = ref<HTMLFormElement | null>(null)
// 注册提交
const submitForm = async () => {
  const res = await registerFormRef.value?.validate()
  if (!res) return
  loading.value = true
  try {
    const password = CryptoJS.SHA256(registerform.value.password).toString()
    const res = await api.register({username: registerform.value.username, password: password, email: registerform.value.email, code: registerform.value.code})
    if (res.code === 200) {
      registerConfig.setPane('login')
      ElMessage.success('注册成功，快去登录吧')
    }
  } catch (error: any) {
    ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.register-form {
  width: 70%;
    &--submit {
      width: 100%;
    }
    &--other {
      display: flex;
      justify-content: flex-start;
    }
  }
</style>
