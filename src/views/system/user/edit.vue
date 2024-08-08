<template>
  <Outlet :finish="onAdd">
    <Form class="form" :columns="columns" v-model="form" ref="formRef">
      <template #roleIds>
        <el-input v-model="roleNames" placeholder="请选择角色" readonly @click="openRoleDialog" />
      </template>
      <template #deptId>
        <el-input v-model="deptNames" placeholder="请选择部门" readonly @click="openDeptDialog" />
      </template>
    </Form>
    <RoleDialog ref="roleDialogRef" :multiple="true" @confirm="onRoleConfirm"></RoleDialog>
    <DeptDialog ref="deptDialogRef" @confirm="onDeptConfirm"></DeptDialog>
  </Outlet>
</template>

<script lang="ts" setup>
import api, { User } from '@/api/user'
import { detailRole, detailDept, Dept } from '@/api'
import { ElMessage } from 'element-plus'

import RoleDialog from '@/components/DusinessDialog/role-dialog.vue'
import DeptDialog from '@/components/DusinessDialog/dept-dialog.vue'

const router = useRouter()
const route = useRoute()
const columns = reactive([
  { label: '用户名', prop: 'username', rules: 'must' },
  { label: '头像', prop: 'avatar', type: 'upload', rules: 'must', props: { limit: 1 } },
  { label: '邮箱', prop: 'email', rules: 'must' },
  { label: '性别', prop: 'sex', type: 'select', dict: 'user_sex', span: 12 },
  { label: '状态', prop: 'status', type: 'select', dict: 'user_status', span: 12 },
  { label: '角色', prop: 'roleIds', type: 'solt', span: 12 },
  { label: '所属部门', prop: 'deptId', type: 'solt', span: 12 },
  { label: '备注', prop: 'remark', props: { type: 'textarea' } },
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
      await api.updateUser({ ...form.value, avatar: form.value.avatar[0].url })
      ElMessage.success('修改成功')
    } else {
      await api.addUser({ ...form.value, avatar: form.value.avatar[0].url })
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

const getDetail = async () => {
  const id: any = route.query.id
  if (!id) return
  try {
    const res = await api.detailUser(id)
    form.value = { ...res.data, avatar: [{ url: res.data.avatar }] }
  } catch (error: any) {
    console.log('🚀 ~ getDetail ~ error:', error)
    ElMessage.error(error)
  }
}
// 角色弹窗
const roleDialogRef = ref<typeof RoleDialog>()
const roleList = ref<any[]>([])
const roleNames = computed(() => {
  return roleList.value.map(item => item.roleName)
})
// 获取角色list详情
const getRoleList = async () => {
  if (!form.value.roleIds.length) return
  try {
    const res = await detailRole({ ids: form.value.roleIds })
    roleList.value = res.data || []
  } catch (error: any) {
    ElMessage.error(error)
  }
}
const openRoleDialog = async () => {
  roleDialogRef.value?.open(roleList.value)
}
const onRoleConfirm = async (list: any[]) => {
  roleList.value = list
  form.value.roleIds = list.map((item: any) => item.id)
}
onMounted(async () => {
  await getDetail()
  await getRoleList()
  await getDepList()
})
// 部门弹窗
const deptDialogRef = ref<typeof DeptDialog>()
const deptList = ref<any[]>([])
const deptNames = computed(() => {
  return deptList.value.map(item => item.deptName)
})
// 获取角色list详情
const getDepList = async () => {
  if (!form.value.deptId) return
  try {
    const res = await detailDept({ ids: [form.value.deptId] })
    deptList.value = res.data || []
  } catch (error: any) {
    ElMessage.error(error)
  }
}
const openDeptDialog = async () => {
  deptDialogRef.value?.open(deptList.value)
}
const onDeptConfirm = async (list: Dept[]) => {
  deptList.value = list
  form.value.deptId = list.map((item: any) => item.id).join(',')
}
</script>

<style lang="scss" scoped>
.form {
  padding: 0 100px;
}
</style>
