<template>
  <div class="page-form">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" status-icon>
      <div class="page-form--box">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名称" clearable />
        </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择用户状态" clearable>
            <el-option label="启用" value="1" />
            <el-option label="停用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户头像" prop="avatar"> <Upload v-model="form.avatar" :limit="1"></Upload> </el-form-item>
        <el-form-item label="用户备注" prop="remark">
          <el-input v-model="form.remark" :rows="5" type="textarea" placeholder="请输入用户备注" />
        </el-form-item>
      </div>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio value="0">女</el-radio>
          <el-radio value="1">男</el-radio>
          <el-radio value="2">保密</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
    </el-form>
    <div class="page-main--footer">
      <el-button type="primary" @click="onAdd" :loading="loading">保存</el-button>
      <el-button @click="onBack">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import api, { User } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const rules = reactive({
  username: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
  status: [{ required: true, message: '请选择用户状态', trigger: 'blur' }],
  //  邮箱 正则
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] },
  ],
  sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
})
const form = ref<User>({
  username: '',
  status: '',
  email: '',
  remark: '',
  sex: '',
  avatar: [],
})
const formRef = ref(null as any)
const loading = ref(false)
const onAdd = async () => {
  const res = await formRef.value.validate()
  if (!res) return
  try {
    loading.value = true
    if (route.query.id) {
      await api.updateUser({ ...form.value, avatar: form.value.avatar[0] || '' })
      ElMessage.success('修改成功')
    } else {
      await api.addUser({ ...form.value, avatar: form.value.avatar[0] || '' })
      ElMessage.success('添加成功')
    }
    onBack()
  } catch (error: any) {
    ElMessage.error(error)
  } finally {
    loading.value = false
  }
}
const onBack = () => {
  router.go(-1)
}
onMounted(() => {
  getDetail()
})
const getDetail = async () => {
  const id: any = route.query.id
  if (!id) return
  try {
    const res = await api.detailUser(id)
    form.value = { ...res.data, avatar: res.data.avatar ? [res.data.avatar] : [] }
  } catch (error: any) {
    ElMessage.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
