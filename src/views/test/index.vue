<template>
  <div>测试封装的基础弹窗</div>
  <baseDialog ref="baseDialogRef" title="测试" :onLoad="onLoad" :multiple="multiple"></baseDialog>
  <!-- 输入框 -->
  <el-input v-model="input" placeholder="请输入内容" @click="handleFocus" readonly />
  <!-- 是否多选 -->
  <el-checkbox v-model="multiple">是否多选</el-checkbox>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
// api
import { listRole } from '@/api'
import baseDialog from '@/components/Dialog/base-dialog/index.vue'
const input = computed(() => {
  return list.value.map((item: any) => item.roleName).join(',')
})
const show = ref(false)
const list = ref([
  {
    _id: '664700264553bc3a38696087',
    id: '53a5686c-c9d7-4753-a8d2-c46fe67ac412',
    roleName: 'admin',
    permissions: [],
    remark: '',
    status: '1',
    perms: 'admin',
    sort: 1,
    createBy: 'admin',
    updateBy: '',
    createTime: '2024-05-17T06:58:46.158Z',
    updateTime: '2024-05-17T06:58:46.158Z',
    __v: 0,
    checked: true,
  },
]) // 选中的数据 ids 或者 完整的数据数组
const baseDialogRef = ref<InstanceType<typeof baseDialog>>()
const handleFocus = () => {
  baseDialogRef.value?.open()
}
const multiple = ref(false)
// 请求列表的方法
const onLoad = (data: any) => {
  return listRole(data)
}
</script>

<style lang="scss" scoped></style>
