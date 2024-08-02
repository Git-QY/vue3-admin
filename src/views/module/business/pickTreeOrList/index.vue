<template>
  <div style="width: 240px">
    <!-- <dialogPick></dialogPick>
    <dialogPick ref="dialogPickRef" v-model="value">
      <template #default="{ names }">
        <el-input :model-value="names" placeholder="请选择" readonly @click="openDialog" />
      </template>
    </dialogPick>
    <dialogPick ref="dialogPickRef1" v-model="value1" :multiple="true">
      <template #default="{ names }">
        <el-input :model-value="names" placeholder="请选择" readonly @click="openDialog1" />
      </template>
    </dialogPick> -->
    <dialogPick ref="dialogPickRef2" v-model="value2" :multiple="true" mode="list-table" v-bind="options2">
      <template #default="{ names }">
        <el-input :model-value="names" placeholder="请选择" readonly @click="openDialog2" />
      </template>
    </dialogPick>
  </div>
</template>

<script lang="ts" setup>
import { listRole, detailRole } from '@/api'
import dialogPick from './components/dialogPick.vue'
// const dialogPickRef = ref<HTMLFormElement | null>(null)
// const value = ref('17b8ebaf-8333-48be-a622-2c656a62494a')
// const openDialog = () => {
//   dialogPickRef.value?.open()
// }
// const dialogPickRef1 = ref<HTMLFormElement | null>(null)
// const value1 = ref(['1218d55d-3ce8-4d2e-9af9-538835f791b8', '45ab3418-0e2f-46bd-855b-05bc2f3f9437'])
// const openDialog1 = () => {
//   dialogPickRef1.value?.open()
// }

const dialogPickRef2 = ref<HTMLFormElement | null>(null)
const value2 = ref(['1218d55d-3ce8-4d2e-9af9-538835f791b8', '45ab3418-0e2f-46bd-855b-05bc2f3f9437'])
const options2 = reactive({
  getList: listRole,
  getIdList: detailRole,
  options: {
    label: 'roleName',
    value: 'id',
    children: 'children',
    page: { page: 1, pageSize: 10, total: 0, pageSizes: [10, 20, 30, 40, 50], layout: 'total, sizes, prev, pager, next, jumper' },
    columns: [
      { label: '角色名称', prop: 'roleName' },
      { label: '角色编码', prop: 'perms' },
      { label: '角色描述', prop: 'remark' },
    ],
  },
})
const openDialog2 = () => {
  dialogPickRef2.value?.open()
}
</script>

<style lang="scss" scoped></style>
