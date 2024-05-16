<template>
  <div class="page-form">
    <Form :columns="columns" v-model="form" ref="formRef">
      <template #deptId="{ item }">
        <!-- 输入框 -->
        <!-- <el-input v-model="deptName" placeholder="请选择部门" readonly @click="showDeptDialog"> </el-input>
        <deptDialog ref="deptDialogRef" @change="onDeptChange"></deptDialog> -->
        <!-- 目前纠结的是触发弹窗的输入框是放在组件里面  还是 外面 -->
      </template>
    </Form>
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
import { DICTS } from '@/utils/enums'
// import deptDialog from '@/components/Dialog/base-dialog/components/dept-dialog.vue'
const router = useRouter()
const route = useRoute()
const columns = reactive([
  { label: '用户名', prop: 'username', rules: 'must' },
  { label: '昵称', prop: 'nickname' },
  { label: '头像', prop: 'avatar', type: 'upload', rules: 'must' },
  { label: '邮箱', prop: 'email', rules: 'email' },
  { label: '性别', prop: 'sex', type: 'select', options: DICTS.userSex },
  { label: '状态', prop: 'status', type: 'select', options: DICTS.userStatus },
  { label: '角色选择', prop: 'roleIds' },
  { label: '所属部门', prop: 'deptId', type: 'slot' },
  { label: '备注', prop: 'remark' },
])
const form = ref<User>({
  id: '',
  username: '',
  password: '',
  email: '',
  sex: '',
  status: '',
  roleIds: [],
  deptId: '',
  remark: '',
})
const formRef = ref(null as any)
const loading = ref(false)
const onAdd = async () => {
  const res = await formRef.value.validateForm()
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
// const deptDialogRef = ref(null as any)
// const showDeptDialog = () => {
//   deptDialogRef.value.open([form.value.deptId])
// }
// const deptName = ref('')
// const onDeptChange = (item: any) => {
//   form.value.deptId = item.id
//   deptName.value = item.deptName
// }
</script>

<style lang="scss" scoped></style>
