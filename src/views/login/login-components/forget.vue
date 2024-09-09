<template>
  <div class="forget-form">
    <el-form label-position="top" :model="forgetform" :ref="forgetFormRef" :rules="forgetrules">
      <el-form-item label="" prop="email">
        <el-input v-model="forgetform.email" placeholder="请输入邮箱" :suffix-icon="Message"> </el-input>
      </el-form-item>
      <!-- 获取邮箱code 点击发送 -->
      <verifycode-field v-model="forgetform.code" :disabled="verifycodeDisabled" :send="getEmailCode"></verifycode-field>
      <div v-if="isverified">
        <el-form-item label="" prop="password">
          <el-input type="password" v-model.trim="forgetform.newPassword" placeholder="请输入密码" autocomplete="new-password" show-password :suffix-icon="Lock"> </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input type="password" v-model.trim="forgetform.nextPassword" placeholder="确认密码" autocomplete="new-password" show-password :suffix-icon="Lock"> </el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button class="forget-form--next" type="primary" size="large" @click="onSubmit" :loading="loading"
          >{{ isverified ? (loading ? '正在修改密码...' : '修改密码') : loading ? '正在验证...' : '下一步' }}
        </el-button>
      </el-form-item>
      <div class="forget-form--other">
        <el-button type="primary" size="small" link @click="forget.setPane('login')">返回登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import api, { ForgetType } from '@/api/user.ts'
import verifycodeField from './components/verifycode-field.vue'
import { ElMessage, FormRules } from 'element-plus'
import { Lock, Message } from '@element-plus/icons-vue'
import CryptoJS from 'crypto-js'
// 忘记密码form表单
const forgetform = ref<ForgetType>({ email: '', code: '', newPassword: '', nextPassword: '' })
// 表单验证
const forgetrules = reactive<FormRules<ForgetType>>({
  email: [{ required: true, type: 'email', message: '请输入正确格式的邮箱', trigger: ['change', 'blur'] }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  newPassword: [{ required: true, max: 10, min: 6, message: '请输入6-10位密码', trigger: 'blur' }],
  nextPassword: [{ required: true, max: 10, min: 6, message: '请输入6-10位密码', trigger: 'blur' }],
})
// 绑定dom
const forgetFormRef = ref<HTMLFormElement | null>(null)

const forget = inject('loginConfig') as any

const verifycodeDisabled = computed(() => {
  const emailRegular = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)
  return !!forgetform.value.email && emailRegular.test(forgetform.value.email)
})

// 如果通过了邮箱验证就显示修改密码
const isverified = ref(false)
// 获取邮箱验证码
const getEmailCode = async () => {
  return api.emailCode(forgetform.value.email)
}
// 邮箱验证成功后返回的token
const token = ref('')

// 按钮加载状态
const loading = ref(false)

// 验证邮箱验证码
const verifyEmail = async () => {
  if (forgetform.value.email === '' || !verifycodeDisabled.value) {
    ElMessage.error('请输入正确格式的邮箱')
    return
  }
  if (forgetform.value.code === '') {
    ElMessage.error('请输入验证码')
    return
  }
  try {
    loading.value = true
    await setTimeout(() => {}, 1000)
    const res = await api.checkEmailCode({ email: forgetform.value.email, code: forgetform.value.code })
    if (res.code === 200) {
      isverified.value = true
      token.value = res.data
      loading.value = false
    }
  } catch (error: any) {
    ElMessage.error(error.message)
    loading.value = false
  }
}

// 修改密码
const modifyPassword = async () => {
  if (forgetform.value.newPassword === '' || forgetform.value.nextPassword === '') {
    ElMessage.error('密码不能为空')
    return
  }
  if (forgetform.value.newPassword !== forgetform.value.nextPassword) {
    ElMessage.error('两次密码输入不一致')
    return
  }
  try {
    loading.value = true
    const newPassword = CryptoJS.SHA256(forgetform.value.newPassword).toString()
    const nextPassword = CryptoJS.SHA256(forgetform.value.nextPassword).toString()
    const res = await api.forget({ email: forgetform.value.email, token: token.value, newPassword: newPassword, nextPassword: nextPassword })
    if (res.code === 200) {
      ElMessage.success('密码修改成功，快去登录吧')
      loading.value = false
      forget.setPane('login')
    }
  } catch (error: any) {
    ElMessage.error(error.message)
    loading.value = false
  }
}

// 点击按钮
const onSubmit = () => {
  if (isverified.value) {
    modifyPassword()
  } else {
    verifyEmail()
  }
}
</script>
<style lang="scss" scoped>
.forget-form {
  .forget-form--next {
    width: 100%;
  }
}
</style>
