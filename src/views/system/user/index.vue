<template>
  <Page main="/system/user">
    <page-table v-bind="tableConfig" ref="tableRef">
      <template #btnleft>
        <el-button type="primary" @click="onAdd" v-auth="['system:user:add']">新增</el-button>
        <el-button type="primary" @click="onAssignRole" v-auth="['system:user:assign']">批量分配角色</el-button>
      </template>
      <!-- <template #query-createTime="{ item }">具名插槽</template> -->
      <template #operate="{ item }">
        <el-table-column v-slot="{ row }" v-bind="item">
          <el-button type="primary" link @click="onEdit(row)" v-auth="['system:user:update']">编辑</el-button>
          <el-button type="danger" link @click="onDelete(row.id)" v-auth="['system:user:delete']">删除</el-button>
        </el-table-column>
      </template>
      <template #status="{ item }">
        <el-table-column v-slot="{ row }" v-bind="item">
          <el-switch
            v-model="row.status"
            active-text="启用"
            inactive-text="停用"
            active-value="1"
            inactive-value="0"
            :inline-prompt="true"
            @click="onChangeStatus(row)"
          >
          </el-switch>
        </el-table-column>
      </template>
    </page-table>
    <roleDialog ref="roleAssignmentDialogRef" @confirm="confirm" :confirmLoading="confirmLoading" :multiple="true"></roleDialog>
  </Page>
</template>

<script lang="ts" setup>
import pageTable from '@/components/Table/index.vue'
import request from '@/utils/request'
import api, { User } from '@/api/user'
import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
import roleDialog from '@/components/DusinessDialog/role-dialog.vue'
import { useElementUI } from '@/hooks/useMessage'
const { showMessage } = useElementUI()
const router = useRouter()
const tableConfig = reactive({
  table: { rowKey: 'id' },
  searchForm: {},
  // 可以通过pomise构建需要的格式
  api: (data: any) => {
    return request.post('/users/list', { ...data })
  },
  page: {
    pageSize: 5,
    pageSizes: [1, 2, 3, 4, 5],
  },
  columns: [
    { type: 'selection', fixed: 'left', width: 40 },
    { prop: 'username', label: '用户名', query: {} },
    // { prop: 'password', label: '密码', width: 100, 'show-overflow-tooltip': true },
    { prop: 'avatar', label: '头像', type: 'upload', rules: 'must' },
    { prop: 'email', label: '邮箱', query: {} },
    {
      prop: 'status',
      label: '状态',
      type: 'slot',
      query: { type: 'select', dict: 'user_status' },
    },
    {
      prop: 'createTime',
      label: '创建时间',
      type: 'date',
      width: 200,
      formatter: (row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    { prop: 'updateTime', label: '更新时间', type: 'date', width: 200, formatter: (row: any) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') },
    { prop: 'operate', label: '操作', type: 'slot', fixed: 'right', width: 200 },
  ],
})
const tableRef = ref(null as any)
const onAdd = () => {
  router.push('/system/user/add')
}
const onEdit = (row: User) => {
  router.push(`/system/user/edit?id=${row.id}`)
}
const onDelete = (id: string) => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const res = await api.deleteUser(id)
      ElMessage.success(res.message)
      tableRef.value.refresh()
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}
const onChangeStatus = async (row: any) => {
  try {
    const res = await api.updateUserField({ id: row.id, fieldName: 'status', fieldValue: row.status })
    ElMessage.success(res.message)
  } catch (error: any) {
    ElMessage.error(error)
  }
}
const confirmLoading = ref(false)
const userIds = ref([])
const confirm = async (data: any) => {
  const roleIds: any[] = data.map((item: any) => item.id)
  try {
    confirmLoading.value = true
    await api.assignRoles({ userIds: userIds.value, roleIds })
    tableRef.value.refresh()
    showMessage('分配权限成功')
  } catch (error) {
    showMessage('分配权限失败', 'error')
  } finally {
    confirmLoading.value = false
  }
}
// 分配角色
const roleAssignmentDialogRef = ref<HTMLFormElement | null>(null)
const onAssignRole = () => {
  if (tableRef.value?.selectData.length == 0) return ElMessage.warning('请先选择用户')
  if (tableRef.value?.selectData.length == 1) {
    roleAssignmentDialogRef.value?.open(tableRef.value?.selectData[0].roleIds)
  } else {
    roleAssignmentDialogRef.value?.open()
  }
  userIds.value = tableRef.value?.selectData.map((item: any) => item.id)
}
</script>

<style lang="scss" scoped></style>
