<template>
  <div>
    <!-- 新增 -->
    <el-button type="primary" @click="onAdd">新增</el-button>
    <el-table :data="tableData" row-key="id" border style="margin: 10px 0" v-loading="loading" max-height="800px">
      <el-table-column prop="menuName" label="菜单名称" show-overflow-tooltip />
      <el-table-column prop="menuType" label="菜单类型">
        <template #default="{ row }">
          <div>{{ TypeEnum(row.menuType) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="path" label="路由路径" />
      <el-table-column prop="component" label="组件路径" />
      <el-table-column prop="icon" label="菜单图标">
        <template #default="{ row }">
          <svg-icon :iconName="`icon-${row.icon}`" style="margin-right: 10px" />
          <span>{{ row.icon }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <div>{{ StatusEnum(row.status) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="visible" label="是否隐藏">
        <template #default="{ row }">
          <div>{{ VisibleEnum(row.visible) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="perms" label="权限标识" />
      <el-table-column prop="buttons" v-slot="{ row }" label="操作" fixed="right">
        <el-button type="primary" link @click="onEdit(row)">编辑</el-button>
        <el-button type="danger" link @click="onDelete(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
  <!-- 增加/编辑菜单抽屉表单 -->
  <el-drawer v-model="isDrawerShow" direction="rtl">
    <template #header>
      <h4>{{isAdd ?'新增' :'编辑'}}菜单</h4>
    </template>
    <template #default>
      <div>
        <el-form :model="drawerform" :rules="drawerFormRules" ref="drawerFormRef" label-width="auto" style="max-width: 600px">
          <el-form-item label="父级名称" prop="parentName">
            <el-input v-model="drawerform.parentName" />
          </el-form-item>
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="drawerform.menuName" />
          </el-form-item>
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="drawerform.menuType">
              <el-radio value="0">目录</el-radio>
              <el-radio value="1">菜单</el-radio>
              <el-radio value="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单图标" prop="icon">
            <el-input v-model="drawerform.icon" />
          </el-form-item>
          <el-form-item label="路由路径" prop="path">
            <el-input v-model="drawerform.path" />
          </el-form-item>
          <el-form-item label="页面路径" prop="component">
            <el-input v-model="drawerform.component" />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="drawerform.sort" />
          </el-form-item>
          <el-form-item label="权限标识" prop="perms">
            <el-input v-model="drawerform.perms" />
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="drawerform.status" active-text="启用" inactive-text="停用" active-value="1" inactive-value="0"
              :inline-prompt="true"> </el-switch>
          </el-form-item>
          <el-form-item label="是否隐藏">
            <el-switch v-model="drawerform.visible" active-text="显示" inactive-text="隐藏" active-value="1" inactive-value="0"
              :inline-prompt="true"> </el-switch>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="isDrawerShow = false">取消</el-button>
        <el-button type="primary" @click="confirmSubmit">{{ isAdd ? '新增' : '修改' }}</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { menulist,addMenu,deleteMenu,updateMenu } from '@/api/menu'
import { DrawerForm } from './index'
import { ElMessage, ElMessageBox, FormRules } from 'element-plus'

onMounted(() => {
  getMenuList()
})

// 获取全部菜单
const getMenuList = async () => {
  loading.value = true
  const {data} = await menulist()
  tableData.value = data
  loading.value = false
}
// 判断是增加还是编辑
const isAdd = ref(true)

// 表格加载
const loading = ref(false)
// 表格数据
const tableData = ref([])

// 菜单类型处理
const TypeEnum = (type: string) => {
  switch (type) {
    case '0':
      return '目录'
    case '1':
      return '菜单'
    case '2':
      return '按钮'
  }
}
// 菜单状态处理
const StatusEnum = (status: string) => {
  switch (status) {
    case '0':
      return '停用'
    case '1':
      return '启用'
  }
}
// 菜单是否隐藏处理
const VisibleEnum = (visible: string) => {
  switch (visible) {
    case '0':
      return '隐藏'
    case '1':
      return '显示'
  }
}


// 增加/编辑菜单form DOM
const drawerFormRef = ref<HTMLFormElement | null>()

// 菜单抽屉显隐
const isDrawerShow = ref(false)

// 增加/编辑菜单表单form
const drawerform = ref<DrawerForm>({
  parentName:'',
  menuName: '',
  menuType: '0',
  sort: 0,
  perms: '',
  status: '1',
  visible: '1'
})
// 菜单表单form验证表单
const drawerFormRules = reactive<FormRules<DrawerForm>>({
  parentName: [
    { required: true, message: '父级名称不能为空', trigger: 'blur' },
  ],
  menuName: [
    { required: true, message: '菜单名称不能为空', trigger: 'blur' },
  ],
  menuType: [
    { required: true, message: '菜单类型不能为空', trigger: 'blur' },
  ],
  icon: [
    { required: true, message: '菜单图标不能为空', trigger: 'blur' },
  ],
  path: [
    { required: true, message: '路由路径不能为空', trigger: 'blur' },
  ],
  component: [
    { required: true, message: '页面路径不能为空', trigger: 'blur' },
  ],
  sort: [
    { required: true, message: '排序不能为空', trigger: 'blur' },
  ],
  perms: [
    { required: true, message: '权限标识不能为空', trigger: 'blur' },
  ],
})
// 确认添加/编辑菜单
const confirmSubmit = async () => {
  drawerFormRef.value?.validate(async (valid:Boolean) => {
    if(valid){
      if(isAdd.value){
        const data = await addMenu(drawerform.value)
        if(data.code === 200){
          ElMessage.success('添加成功')
        }
      } else {
        const data = await updateMenu(drawerform.value)
        if(data.code === 200){
          ElMessage.success('修改成功')
        }
      }
      isDrawerShow.value = false
      getMenuList()
    } else {
      console.log('error')
    }
  })
}

// 新增菜单
const onAdd = ()=>{
  isAdd.value = true
  drawerform.value = {
    parentName:'',
    menuName: '',
    menuType: '0',
    sort: 0,
    perms: '',
    status: '1',
    visible: '1'
  }
  isDrawerShow.value = true
}

// 编辑菜单
const onEdit = (row:DrawerForm)=>{
  console.log(row,'row???')
  isAdd.value = false
  isDrawerShow.value = true
  drawerform.value = {...row}
}
// 删除菜单
const onDelete = async(id:string)=>{
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const data = await deleteMenu(id)
    if(data.code === 200){
      ElMessage.success('删除成功')
      getMenuList()
    } else {
      ElMessage.error('删除失败')
    }
  }).catch(() => {
  })
}

</script>
<style lang="scss" scoped></style>
