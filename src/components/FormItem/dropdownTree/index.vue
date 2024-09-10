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
              <ArrowUp v-else />
            </el-icon>
          </template>
        </el-input>
      </span>
      <!-- 下拉菜单内容 -->
      <template #dropdown>
        <panel v-bind="{ getList, options, multiple, nodeAdapter, defaultTop, mode }" v-model:selected="selected"></panel>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted, watch } from 'vue'
import type { DropdownInstance } from 'element-plus'
import panel from '../panel/index.vue'

const props = defineProps({
  modelValue: { type: [String, Array] },
  multiple: { type: Boolean, default: false }, // 是否多选
  getList: { type: Function, default: () => {} }, // 懒加载函数
  getIdList: { type: Function, default: () => {} }, // 获取选中详情
  options: { type: Object, default: () => ({}) }, // tree配置
  nodeAdapter: { type: Function }, // 树节点数据适配
  defaultTop: { type: Array, default: () => [] }, // 默认顶级节点
  mode: { type: String, default: 'nodeTree' }, // 默认展示模式
})

interface Item {
  [key: string]: any
}
const dropdown = ref<DropdownInstance>()
const input = ref('')
const visible = ref(false)
const selected = ref<Item[]>([]) // 默认被选中的数据
const $emit = defineEmits(['update:modelValue'])
// 切换下拉菜单显示状态
const toggleDropdown = async () => {
  visible.value = !visible.value
}

// 更新输入框显示内容
const updateInput = (data: any) => {
  if (props.multiple) {
    input.value = data.map((item: Item) => item[props.options.label]).join(',')
  } else {
    input.value = data instanceof Array ? data[0][props.options.label] : data[props.options.label]
  }
}

// 获取选中详情数据
const getDetails = async () => {
  const ids: any = props.multiple ? props.modelValue : [props.modelValue]
  const res = await props.getIdList({ ids })
  selected.value = res.data
  // 处理默认顶级组织
  if (props.defaultTop.length > 0 && !props.multiple) {
    props.defaultTop.forEach((item: any) => {
      if (ids.includes(item.id)) {
        selected.value.push(item)
      }
    })
  }
}
onMounted(() => {})
// 监听visible
watch(
  () => visible.value,
  (newVal: boolean) => {
    if (newVal) {
      dropdown.value?.handleOpen()
    } else {
      dropdown.value?.handleClose()
    }
  },
)
// 监听 modelValue 值变化，更新输入框内容和触发事件
watch(
  () => props.modelValue,
  () => {
    getDetails()
  },
  { immediate: true },
)
// 监听 selected 值变化，更新输入框内容和触发事件
watch(
  () => selected.value,
  (newVal: Item[]) => {
    if (!newVal.length) return
    const val = props.multiple ? newVal.map((item: Item) => item.id) : newVal[0].id
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
