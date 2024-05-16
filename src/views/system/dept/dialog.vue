<script setup lang="ts">
import { DICTS } from '@/utils/enums';
import { reactive, ref } from 'vue'
import { addDept, updateDept } from '@/api/dept'
import { ElMessage } from 'element-plus';
// props接受参数
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  width: { type: String, default: '50%' },
  // 按钮回调函数
  confirm: { type: Function, default: () => { } },
})
// 弹框显隐
const dialogVisible = ref(false)

const columns = reactive([
  { prop: 'deptName', label: '部门名称', rules: 'must' },
  { prop: 'parentId', label: '上级部门ID', rules: 'must' },
  { prop: 'remark', label: '备注' },
  { prop: 'phone', label: '联系电话' },
  { prop: 'email', label: '邮箱' },
  {
    prop: 'status',
    label: '状态',
    type: 'radio-group',
    span: 12,
    rules: 'must',
    options: DICTS.deptStatus,
  },
  { prop: 'createTime', label: '创建人', rules: 'must' },
  { prop: 'updateTime', label: '更新者', rules: 'must' },
])
// form表单
const form = ref({
  id: '',
  deptName: '',
  parentId: '',
  remark: '',
  phone: null,
  email: '',
  status: '',
  createTime: '',
  updateTime: '',
})
// form DOM
const formRef = ref(null as any)

// 确定按钮加载状态
const loading = ref(false)
// 点击取消 关闭弹框
const onClickClose = () => {
  dialogVisible.value = false
}
// 点击确定 发起请求
const onClickConfirm = async () => {
  console.log(form.value, 'form')
  const valid = formRef.value.validateForm()
  if (valid) {
    loading.value = true
    try {
      if (form.value.id) {
        const data = await updateDept(form.value)
        console.log(data, 'data')
        if (data.code === 200) {
          ElMessage.success('修改成功')
        }
      } else {
        const data = await addDept(form.value)
        console.log(data, 'data')
        if (data.code === 200) {
          ElMessage.success('添加成功')
        }
      }
      dialogVisible.value = false
      props.confirm()
    } catch (e: any) {
      ElMessage.error(e)
    } finally {
      loading.value = false
    }
  } else {
    console.log('error submit!!')
  }
}


const open = (row: any) => {
  if (row) {
    form.value = { ...row }
  }
  dialogVisible.value = true
}
const close = () => {
  dialogVisible.value = false
}
// 向外暴露方法
defineExpose({ open, close })
</script>

<template>
  <!-- 添加编辑弹窗 -->
  <el-dialog v-model="dialogVisible" :title="props.title" :width="props.width" @close="onClickClose">
    <Form :columns="columns" v-model="form" ref="formRef"></Form>
    <!-- 按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClickClose">取 消</el-button>
        <el-button type="primary" @click="onClickConfirm" :loading="loading">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
