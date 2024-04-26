<template>
  <!-- 表格搜索组件 -->
  <el-form ref="formRef" :model="props.modelValue" @submit.native.prevent labelWidth="80px" label-position="left">
    <el-row :gutter="20">
      <!-- 展开的内容 -->
      <template v-for="item in searchColumns" :key="item.prop">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-if="!item.hidden">
          <!-- 怎么把search的插槽映射到table组件上 -->
          <slot v-if="item.type === 'slot'" :name="`query-${item.prop}`" :item="item" :modelValue="props.modelValue[item.prop]"> </slot>
          <!-- 下拉选择 -->
          <el-form-item v-else-if="item.type === 'select'" :label="item.label" :prop="item.prop">
            <el-select v-model="props.modelValue[item.prop]" :placeholder="item.placeholder" :filterable="item.filterable">
              <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
          </el-form-item>

          <el-form-item v-else :label="item.label" :prop="item.prop">
            <el-input v-model="props.modelValue[item.prop]" :placeholder="item.placeholder" />
          </el-form-item>
        </el-col>
      </template>
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <el-form-item labelWidth="0">
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="onReset">重置</el-button>
          <el-button type="primary" link @click="toggleCollapse" v-if="showIsCollapsed">{{ isCollapsed ? '展开' : '收起' }} </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { columnsProps } from '../type'
const props = defineProps<{ columns: any; modelValue: any; maxShow: number }>()

// 搜索栏
// 1. 过滤存在 query 字段
// 2. 给这些字段添加 type 和 rules
// 3. 给这些字段添加插槽
// 4. 给这些字段添加默认值
const searchColumns = ref(
  props.columns
    .filter((item: columnsProps) => item.query)
    .map((item: columnsProps) => {
      return {
        ...item,
        ...item.query,
        placeholder: item.query.placeholder || item.label,
      }
    }),
)

// 响应式数据：是否折叠，默认为 false
const isCollapsed = ref(true)
// 响应式数据：是否显示折叠按钮
// 1. 只有当搜索栏的数量小于 maxShow 时，才显示折叠按钮
// 2. 否则，不显示折叠按钮
const showIsCollapsed = computed(() => {
  return props.maxShow < searchColumns.value.length
})
onMounted(() => {
  showOrHide(props.maxShow)
})
//

// 切换折叠状态的方法
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  showOrHide(props.maxShow)
}
// 通过maxShow控制元素显示/折叠
const showOrHide = (maxShow: number) => {
  const group = searchColumns.value
  const len = group?.length ? group?.length : 0
  if (maxShow < len) {
    group.forEach((item: any, index: number) => {
      if (index > maxShow - 1 && index < len) {
        item.hidden = isCollapsed.value
      }
    })
  }
}

const formRef = ref(null as any)
const emits = defineEmits(['onSearch', 'onReset'])

// 查询按钮点击事件处理方法
const onSearch = () => {
  // 执行查询操作，你可以在此处调用接口等
  emits('onSearch')
}

// 重置按钮点击事件处理方法
const onReset = () => {
  emits('onReset')
  // 重置表单数据
  formRef.value.resetFields()
}
</script>

<style lang="scss" scoped></style>
