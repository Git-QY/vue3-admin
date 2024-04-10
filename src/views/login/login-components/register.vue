<template>
  <div class="register-form">
    <el-form :model="registerform" ref="registerFormRef" :rules="registerrules">
      <el-form-item label="" prop="username">
        <el-input v-model.trim="registerform.username" placeholder="请输入用户名"> </el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input type="password" v-model.trim="registerform.password" placeholder="请输入密码"> </el-input>
      </el-form-item>
      <div style="display: flex;">
        <el-form-item label="" prop="email">
          <el-input v-model.trim="registerform.email" placeholder="请输入邮箱"> </el-input>
        </el-form-item>
        <el-button size="default" @click="getCode">获取邮箱验证码</el-button>
      </div>
      <el-form-item label="" prop="code">
        <el-input v-model.trim="registerform.code" placeholder="请输入验证码"> </el-input>
      </el-form-item>
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
import { FormRules } from 'element-plus';
import { ref, reactive, onMounted, inject } from 'vue'
// 注册form表单
const registerform = ref<RegisterType>({ username: '', password: '',email:'',code:''})
// 注册表单验证
const registerrules = reactive<FormRules<RegisterType>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})
const registerConfig = inject('loginConfig') as any
// 注册按钮加载状态
const loading = ref(false)
// 注册表单dom
const registerFormRef = ref(null as any)

// 获取邮箱验证码
const getCode = async()=>{
  if(!registerform.value.email) return
  // TODO: 调用接口获取验证码
  const res = await api.emailCode({email:registerform.value.email})
  console.log(res,'获取邮箱验证码')
}

// 注册提交
const submitForm = async () => {
  const res = await registerFormRef.value.validate()
  if (!res) return
  try {
    const res = await api.register(registerform.value)
    console.log(res)
  } catch (error) {}
}

onMounted(async () => {})
</script>

<style lang="scss" scoped></style>
