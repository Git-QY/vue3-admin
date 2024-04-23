<template>
  <div>
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" status-icon>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择用户状态" clearable>
              <el-option label="启用" value="0" />
              <el-option label="停用" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="用户头像" prop="avatar"> 上传 </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio label="0">女</el-radio>
              <el-radio label="1">男</el-radio>
              <el-radio label="2">保密</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="用户备注" prop="remark">
            <el-input v-model="form.remark" :rows="5" type="textarea" placeholder="请输入用户备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const rules = reactive({})
const form = ref({
  username: '',
  status: '',
  email: '',
  remark: '',
  sex: '',
})
</script>

<style lang="scss" scoped></style>
