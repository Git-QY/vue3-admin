<template>
  <div class="dropdownTree">
    <!-- 下拉菜单组件 -->
    <el-dropdown ref="dropdown" trigger="contextmenu" placement="bottom-start">
      <!-- 输入框 -->
      <span class="el-dropdown-link" style="width: 100%">
        <el-input v-model="input" class="dropdownTree-input" placeholder="请输入" readonly @click="toggleDropdown">
          <template #suffix>
            <el-icon class="el-input__icon">
              <ArrowDown v-if="!visible" />
              <!-- 下拉箭头 -->
              <ArrowUp v-else />
              <!-- 上拉箭头 -->
            </el-icon>
          </template>
        </el-input>
      </span>
      <!-- 下拉菜单内容 -->
      <template #dropdown>
        <PanelTree v-if="visible" v-bind="{ getList, options, multiple, nodeAdapter }" v-model:selected="selected"></PanelTree>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted, watch } from 'vue'
import type { DropdownInstance } from 'element-plus'
import PanelTree from './panel-tree.vue'

const props = defineProps({
  modelValue: { type: [String, Array] },
  multiple: { type: Boolean, default: false }, // 是否多选
  getList: { type: Function, default: () => {} }, // 懒加载函数
  getIdList: { type: Function, default: () => {} }, // 获取选中详情
  options: { type: Object, default: () => ({}) }, // tree配置
  nodeAdapter: { type: Function, default: () => {} }, // 树节点数据适配
})

const dropdown = ref<DropdownInstance>()
const input = ref('')
const visible = ref(false)
const selected = ref<any[]>([]) // 默认被选中的数据
const $emit = defineEmits(['update:modelValue'])

// 切换下拉菜单显示状态
const toggleDropdown = async () => {
  visible.value = !visible.value
  if (visible.value) {
    dropdown.value?.handleOpen()
  } else {
    dropdown.value?.handleClose()
  }
}

// 更新输入框显示内容
const updateInput = (data: any) => {
  if (props.multiple) {
    input.value = data.map((item: any) => item[props.options.label]).join(',')
  } else {
    input.value = data instanceof Array ? data[0][props.options.label] : data[props.options.label]
  }
}

// 获取选中详情数据
const getDetails = async () => {
  const ids = props.multiple ? props.modelValue : [props.modelValue]
  const res = await props.getIdList({ ids })
  selected.value = res.data
}

// 组件挂载时获取选中详情数据
onMounted(async () => {
  await getDetails()
})

// 监听 selected 值变化，更新输入框内容和触发事件
watch(
  () => selected.value,
  (newVal: any) => {
    if (!newVal.length) return
    const val = props.multiple ? newVal.map((item: any) => item.id) : newVal[0].id
    updateInput(newVal)
    $emit('update:modelValue', val)
  },
)
</script>

<style lang="scss" scoped>
.dropdownTree {
  width: 100%;
  &::v-deep(.el-dropdown) {
    width: 100%;
  }
  &-input {
    width: 100%;
    &::v-deep(.el-input__inner) {
      cursor: pointer;
    }
  }
}
</style>
