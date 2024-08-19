<template>
  <!-- 、添加编辑弹窗 -->
  <el-dialog v-model="dialogVisible" :title="props.title" :width="props.width" @close="close">
    <Form :columns="columns" v-model="form" ref="formRef">
      <!-- 上级部门 -->
      <template #parentId>
        <DropdownTree v-model="form.parentId" v-bind="treeConfig" />
      </template>
    </Form>
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
import { addDept, updateDept, listDept, detailDept } from '@/api'
import { ElMessage } from 'element-plus'
import DropdownTree from '@/components/FormItem/dropdownTree/index.vue'

const props = defineProps({
  title: { type: String, default: '' },
  width: { type: String, default: '50%' },
  // 按钮回调函数
  confirm: { type: Function, default: () => {} },
})
const columns = reactive([
  { prop: 'parentId', label: '上级部门', type: 'slot', rules: 'must', span: 12 },
  { prop: 'deptName', label: '部门名称', rules: 'must', span: 12 },
  { prop: 'leader', label: '部门负责人', span: 12 },
  { prop: 'phone', label: '联系电话', rules: 'phone-1', span: 12 },
  { prop: 'email', label: '联系邮箱', rules: 'email-0', span: 12 },
  { prop: 'status', label: '状态', type: 'radio-group', span: 12, rules: 'must', dict: 'dept_status' },
  { prop: 'remark', label: '备注', type: 'textarea', span: 24 },
])
const form = ref({
  id: '',
  deptName: '人事部',
  parentId: '0',
  leader: '',
  phone: '',
  email: '',
  status: '1',
  remark: '',
})

const treeConfig = reactive({
  getList: listDept,
  getIdList: detailDept,
  options: { label: 'deptName', value: 'id', children: 'children' },
  multiple: false,
  defaultTop: [{ id: '0', deptName: '顶级部门' }], // 是否默认顶级节点
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
      await updateDept(form.value)
    } else {
      await addDept(form.value)
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
