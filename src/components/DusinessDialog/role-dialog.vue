<template>
  <Dialog v-model="visible" @cancel="cancel" @confirm="confirm" width="50%" title="角色权限" :confirmLoading="confirmLoading">
    <template #content>
      <Panel v-bind="{ ...config, multiple }" v-model:selected="selected"></Panel>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { listRole, detailRole, Role } from '@/api'
import Dialog from '@/components/Dialog/index.vue'
import Panel from '@/components/FormItem/panel/index.vue'

defineProps({
  confirm: { type: Function, default: () => {} },
  multiple: { type: Boolean, default: false },
  confirmLoading: { type: Boolean, default: false },
})
const visible = ref<boolean>(false)
const selected = ref<Role[]>([])
const config = reactive({
  getList: listRole,
  getIdList: detailRole,
  mode: 'nodeList',
  options: { label: 'roleName', value: 'id', children: 'children' },
  isRightPanel: true,
})
const cancel = () => (visible.value = false)
const $emits = defineEmits(['confirm'])
const confirm = async () => {
  $emits('confirm', selected.value)
  cancel()
}
const open = async (row: Role[] | string[] = []) => {
  visible.value = true
  function isStringArray(row: any): row is string[] {
    return Array.isArray(row) && row.every(item => typeof item === 'string')
  }
  if (isStringArray(row) && row.length) {
    const res = await detailRole({ ids: row })
    selected.value = [...res.data]
  } else {
    selected.value = [...row]
  }
}
onMounted(() => {
  console.log('role-dialog=>onMounted')
})
defineExpose({ open })
</script>

<style lang="scss" scoped></style>
