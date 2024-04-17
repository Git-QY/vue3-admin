<template>
  <div class="register-form">
    <el-form :model="registerform" ref="registerFormRef" :rules="registerrules">
      <el-form-item label="" prop="username">
        <el-input v-model.trim="registerform.username" placeholder="请输入用户名"> </el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input type="password" v-model.trim="registerform.password" placeholder="请输入密码"> </el-input>
      </el-form-item>
      <div style="display: flex;justify-content: space-between;align-items: center;">
        <el-form-item label="" prop="email">
          <el-input v-model.trim="registerform.email" placeholder="请输入邮箱"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="default" @click="getCode" :disabled="isDisabled"> {{ buttonText }}</el-button>
        </el-form-item>
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
import api, { ReqRegisterType } from '@/api/modules/user'
import { FormRules,ElMessage } from 'element-plus';
import { ref, reactive, onMounted, inject } from 'vue'

// 注册form表单
const registerform = ref<ReqRegisterType>({ username: '', password: '',email:'',code:''})
// 注册表单验证
const registerrules = reactive<FormRules<ReqRegisterType>>({
  username: [{ required: true, max:10,min:4, message: '请输入4-10位用户名', trigger: 'blur' }],
  password: [{ required: true, max:10,min:6, message: '请输入6-10位密码', trigger: 'blur' }],
  email: [{ required: true, type: 'email', message: '请输入邮箱', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})
const registerConfig = inject('loginConfig') as any


// 获取邮箱验证码文字
const buttonText = ref<string>('获取邮箱验证码')
// 获取验证码按钮是否禁用
const isDisabled = ref<boolean>(false)
// 获取邮箱验证码
const getCode = async()=>{
  if(!registerform.value.email){
    ElMessage.error('请输入邮箱')
    return
  }
  isDisabled.value = true
  let seconds = 60
  const timer = setInterval(()=>{
    seconds --
    if(seconds <= 0){
      clearInterval(timer)
      isDisabled.value = false
      buttonText.value = '获取邮箱验证码'
    } else{
      buttonText.value = `${seconds}s后重新获取`
    }
  },1000)
  try{
    const res = await api.emailCode(registerform.value.email)
    if(res.code === 200){
      ElMessage.success('验证码发送成功')
    } else{
      ElMessage.error(res.message)
    }
    // console.log(res,'获取邮箱验证码')
  } catch(e){
    console.log(e)
  }
  // TODO: 调用接口获取验证码
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
    const res = await api.register(registerform.value)
    // console.log(res)
    if(res.code === 200){
      registerConfig.setPane('login')
      ElMessage.success('注册成功，快去登录吧')
    } 
  } catch (error: any) {
    ElMessage.error(error.message)
  }
  loading.value = false
}

onMounted(async () => {})

</script>

<style lang="scss" scoped></style>
