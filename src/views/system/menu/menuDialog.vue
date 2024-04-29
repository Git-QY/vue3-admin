<template>
  <el-dialog v-model="dialogVisible" :title="props.title" :width="props.width" @close="close">
    <Form :columns="wColumns" v-model="form" ref="formRef">
      <template #parentId>
        <el-tree-select v-model="form.parentId" :data="treeData" check-strictly :render-after-expand="false" placeholder="请选择父级菜单" style="width: 100%" />
      </template>
      <template #menuType>
        <el-radio-group v-model="form.menuType" size="small">
          <el-radio-button value="0">目录</el-radio-button>
          <el-radio-button value="1">菜单</el-radio-button>
          <el-radio-button value="2">按钮</el-radio-button>
        </el-radio-group>
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
import { ref, reactive, watch, toRaw } from 'vue'
import { addMenu, updateMenu, Menu } from '@/api'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  width: { type: String, default: '50%' },
  // 按钮回调函数
  confirm: { type: Function, default: () => {} },
  treeData: { type: Array, default: () => [] },
})
const columns = reactive<columnsProps[]>([
  { prop: 'parentId', label: '父级菜单', type: 'slot', rules: 'must', span: 24 },
  { prop: 'menuType', label: '菜单类型', rules: 'must', type: 'slot', span: 12 },
  // 状态
  {
    prop: 'status',
    label: '菜单状态',
    type: 'radio-group',
    options: [
      { label: '启用', value: '1' },
      { label: '禁用', value: '0' },
    ],
    rules: 'must',
    span: 12,
  },
  { prop: 'icon', label: '菜单图标', type: 'icon-selector', props: { placeholder: '请选择菜单图标' }, span: 24 },
  { prop: 'menuName', label: '菜单名称', rules: 'must', span: 12 },
  { prop: 'perms', label: '权限标识', rules: 'must', span: 12 },
  { prop: 'sort', label: '排序', type: 'input-number', span: 12 },

  { prop: 'path', label: '路由路径', span: 12 },
  { prop: 'component', label: '组件路径', rules: 'must', span: 12 },
  {
    prop: 'isKeepAlive',
    label: '是否缓存',
    type: 'radio-group',
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
    rules: 'must',
    span: 12,
  },
  {
    prop: 'visible',
    label: '是否隐藏',
    type: 'radio-group',
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
    rules: 'must',
    span: 12,
  },
  {
    prop: 'isFold',
    label: '是否折叠',
    type: 'radio-group',
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
    rules: 'must',
    span: 12,
  },
  {
    prop: 'isLink',
    label: '外链地址',
    props: { placeholder: '存在外联则确定为外链地址' },
    span: 24,
  },
])
const treeData = reactive([{ label: '顶级菜单', value: '0', children: userStore.menusTree }])
const form = ref<any>({
  menuType: '0',
})
const _form = toRaw(form.value) // 获取初始表单数据
const dialogVisible = ref(false)
const open = (row: Menu) => {
  if (row) {
    form.value = { ...form.value, ...row }
  }
  dialogVisible.value = true
}
const close = () => {
  form.value = { ..._form } // 恢复表单初始数据
  formRef.value.resetForm() // 重置表单
  dialogVisible.value = false
}
const formRef = ref(null as any)
const loading = ref(false)
const confirm = async () => {
  const res = await formRef.value.validateForm()
  if (!res) return
  try {
    loading.value = true
    if (form.value.id) {
      await updateMenu(form.value)
      ElMessage.success('修改成功')
    } else {
      await addMenu(form.value)
      ElMessage.success('添加成功')
    }
    close()
    props.confirm()
  } catch (error: any) {
    ElMessage.error(error)
  } finally {
    loading.value = false
  }
}
const wColumns = ref<columnsProps[]>([])
const pickProp = (fields: string[]) => {
  return columns.filter(item => fields.includes(item.prop))
}
watch(
  () => form.value.menuType,
  newVal => {
    let fields: string[] = []
    switch (newVal) {
      case '0':
        fields = ['parentId', 'menuType', 'icon', 'menuName', 'perms', 'path', 'sort', 'visible', 'isFold', 'isLink', 'status']
        break
      case '1':
        fields = ['parentId', 'menuType', 'icon', 'menuName', 'perms', 'path', 'component', 'sort', 'visible', 'isKeepAlive', 'isFold', 'isLink', 'status']
        break
      case '2':
        fields = ['parentId', 'menuType', 'menuName', 'sort', 'visible', 'perms', 'isLink', 'status']
        break

      default:
        break
    }
    wColumns.value = pickProp(fields)
  },
  { immediate: true },
)
// 向外暴露
defineExpose({
  open,
  close,
})
</script>

<style lang="scss" scoped></style>
