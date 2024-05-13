<template>
  <el-dialog v-model="dialogVisible" :title="props.title" :width="props.width" @close="close">
    <div class="dialog-body"></div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm" :loading="loading">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  title: { type: String, default: '角色分配' }, // 标题
  width: { type: String, default: '50%' }, // 宽度
  confirm: { type: Function, default: () => {} }, // 回调
})
const dialogVisible = ref(true)
const open = () => {
  dialogVisible.value = true
}
const close = () => {
  dialogVisible.value = false
}

const loading = ref(false)
const confirm = async () => {
  try {
    loading.value = true
    props.confirm()
  } catch (error) {
  } finally {
    loading.value = false
  }
}
defineExpose({ open, close })
</script>

<style lang="scss" scoped>
.dialog-body {
  min-height: 200px;
}
</style>
