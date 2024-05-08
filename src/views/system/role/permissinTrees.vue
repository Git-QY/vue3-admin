<template>
  <div>
    <!-- 权限树组件包含目录菜单按钮 -->
    <!-- 抽屉 -->
    <el-drawer v-model="drawer" title="I am the title" :before-close="handleClose">
      {{ selectIds }}
      <el-tree style="max-width: 600px" :data="treeData" node-key="id" :props="props" show-checkbox :check-strictly="true" @check-change="handleCheckChange" ref="treeRef" />
      <!-- 使用基础组件实现树组件  不需要半选状态 但需要实现全选 -->

      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="confirm" :loading="loading">确 定</el-button>
        </span>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRef, nextTick } from 'vue'
import { useUserStore } from '@/store'
import { Role, listMenuByRoleIds, updateRoleField } from '@/api'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
const handleClose = (done: any) => {
  done()
}
const treeData = toRef(userStore.menusTree)
const props = { label: 'menuName', children: 'children' }
const drawer = ref(false)
const treeRef = ref<HTMLFormElement | null>(null)
const selectIds = ref<string[]>([])

const handleCheckChange = () => {
  selectIds.value = treeRef.value?.getCheckedNodes(false, true).map((item: any) => item.id)
}
const curItem = ref<Role>({} as Role)
const open = async (row: Role) => {
  curItem.value = row
  treeRef.value?.setCheckedKeys([], false)
  const res = await listMenuByRoleIds({ ids: [row.id as string] })
  drawer.value = true
  nextTick(() => {
    treeRef.value?.setCheckedKeys(res.data.permissions, false)
  })
}
const close = () => {
  drawer.value = false
}
const loading = ref(false)
const confirm = async () => {
  try {
    loading.value = true
    await updateRoleField({ id: curItem.value.id as string, fieldName: 'permissions', fieldValue: selectIds.value })
    ElMessage({ message: '权限分配成功', type: 'success' })
    close()
  } catch (error) {
  } finally {
    loading.value = false
  }
}
defineExpose({ open, close })
</script>

<stye lang="scss" scoped></stye>
