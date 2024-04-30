<template>
  <!-- 、添加编辑弹窗 -->
  <el-dialog v-model="dialogVisible" :title="props.title" :width="props.width" @close="close">
    <Form :columns="columns" v-model="form" ref="formRef"></Form>
    <!-- 按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm" :loading="loading">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw } from 'vue'
import { addRole, updateRole } from '@/api'
import { ElMessage } from 'element-plus'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  width: { type: String, default: '50%' },
  // 按钮回调函数
  confirm: { type: Function, default: () => {} },
})
const columns = reactive([
  { prop: 'roleName', label: '角色名称', rules: 'must', span: 12 },
  { prop: 'perms', label: '角色标识', rules: 'must', span: 12 },
  {
    prop: 'status',
    label: '状态',
    type: 'radio-group',
    span: 12,
    rules: 'must',
    options: [
      { label: '启用', value: '1' },
      { label: '禁用', value: '0' },
    ],
  },
  { prop: 'sort', type: 'input-number', label: '排序', span: 12 },
  { prop: 'remark', label: '备注', span: 24 },
])
const form = ref({
  id: '',
  roleName: '',
  remark: '',
  status: '',
  perms: '',
  sort: 0,
})
const _form = toRaw(form.value) // 获取初始表单数据
// 命令式
const dialogVisible = ref(false)
const open = (row: any) => {
  if (row) {
    form.value = { ...row }
  }
  dialogVisible.value = true
}
const close = () => {
  form.value = { ..._form } // 恢复表单初始数据
  dialogVisible.value = false
  formRef.value.resetForm()
}
const formRef = ref(null as any)
const loading = ref(false)

const confirm = async () => {
  const res = await formRef.value.validateForm()
  if (!res) return
  try {
    loading.value = true
    if (form.value.id) {
      await updateRole(form.value)
    } else {
      await addRole(form.value)
    }
    close()
    props.confirm()
  } catch (error: any) {
    ElMessage.error(error)
  } finally {
    loading.value = false
  }
}
// 向外暴露
defineExpose({
  open,
  close,
})
</script>

<style lang="scss" scoped></style>
