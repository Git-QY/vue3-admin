<template>
  <Dialog v-model="visible" @cancel="cancel" @confirm="confirm" width="50%" title="角色权限" :confirmLoading="confirmLoading">
    <template #content>
      <Panel v-bind="{ ...config, multiple }" v-model:selected="selected"></Panel>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { listDept, detailDept, Dept } from '@/api'
import Dialog from '@/components/Dialog/index.vue'
import Panel from '@/components/FormItem/panel/index.vue'
defineProps({
  confirm: { type: Function },
  multiple: { type: Boolean, default: false },
})
const visible = ref<boolean>(false)
const selected = ref<Dept[]>([])
const confirmLoading = ref(false)
const config = reactive({
  getList: listDept,
  getIdList: detailDept,
  mode: 'nodeTree',
  options: { label: 'deptName', value: 'id', children: 'children' },
  isRightPanel: true,
})
const cancel = () => (visible.value = false)
const $emits = defineEmits(['confirm'])
const confirm = async () => {
  if (props.confirm) {
    confirmLoading.value = true
    try {
      await props.confirm(selected.value)
    } catch (error) {
      console.log(error)
    } finally {
      confirmLoading.value = false
    }
  } else {
    $emits('confirm', selected.value)
  }

  cancel()
}
const open = async (row: Dept[]) => {
  visible.value = true
  selected.value = [...row]
}
onMounted(() => {
  console.log('dept-dialog=>onMounted')
})
defineExpose({ open })
</script>

<style lang="scss" scoped></style>
