<template>
  <!-- 、添加编辑弹窗 -->
  <el-dialog v-model="dialogVisible" :title="title" :width="props.width" @close="close">
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
import { addDictItem, updateDictItem, Dict } from '@/api'
import { ElMessage } from 'element-plus'
// 路由
import { useRoute } from 'vue-router'
const props = defineProps({
  width: { type: String, default: '50%' },
  confirm: { type: Function, default: () => {} },
})
const columns = reactive([
  { prop: 'parentId', label: '父级id', width: 150, 'show-overflow-tooltip': true },
  { prop: 'label', label: '名称', width: 180, rules: 'must' },
  { prop: 'value', label: '值', width: 150, rules: 'must' },
  { prop: 'sort', label: '排序', type: 'input-number' },
  { prop: 'remark', label: '备注', type: 'textarea' },
  { prop: 'status', label: '状态', type: 'radio-group', dict: 'dict_status' },
])
const form = ref<Dict>({
  dictName: '',
  dictType: '',
  status: '1',
  sort: 0,
  remark: '',
})
const _form = toRaw(form.value) // 获取初始表单数据
// 命令式
const dialogVisible = ref(false)
const title = ref('')
const open = (row: any, { title }: any) => {
  if (row) form.value = { ...row }
  dialogVisible.value = true
}
const close = () => {
  form.value = { ..._form } // 恢复表单初始数据
  dialogVisible.value = false
  formRef.value?.resetForm()
}
const formRef = ref<HTMLFormElement | null>(null)
const loading = ref(false)
const route = useRoute()

const confirm = async () => {
  const res = await formRef.value?.validateForm()
  if (!res) return
  try {
    loading.value = true
    if (form.value.id) {
      await updateDictItem(form.value)
    } else {
      await addDictItem({ ...form.value, ...route.query })
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
