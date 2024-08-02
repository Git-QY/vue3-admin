<template>
  <div class="node-content">
    <el-checkbox
      :class="multiple ? '' : 'checkbox-as-radio'"
      :disabled="data.disabled"
      @click.native.prevent.stop="checkNodeClick"
      :model-value="isChecked"
    ></el-checkbox>

    <el-icon class="node-icon"> <svg-icon iconName="icon-bumenguanli" /></el-icon>
    <span class="node-name">{{ data[name] }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  multiple: { type: Boolean, default: false },
  options: { type: Object, default: () => {} },
  data: { type: Object, default: () => {} },
  selected: { type: Array, default: () => [] },
  nodeKey: { type: String },
})
const name = props.options.label

const isChecked = computed(() => {
  const nodeKey = props.nodeKey || 'id'
  return !!props.selected.find((i: any) => i[nodeKey] === props.data[nodeKey])
})
const $emits = defineEmits(['checkNodeClick'])
const checkNodeClick = () => {
  if (props.data.disabled) return
  $emits('checkNodeClick', arrayize(props.selected, props.data, props.multiple, props.nodeKey))
}
const arrayize = (list: any[], data: any, multiple: boolean, nodeKey: string = '_id'): any[] => {
  let newList: any[] = [data]
  // 处理多选逻辑
  if (multiple) {
    const isExist = !!list.find(i => i[nodeKey] === data[nodeKey])
    if (isExist) {
      newList = list.filter(item => item[nodeKey] !== data[nodeKey])
    } else {
      newList = [...list, ...newList]
    }
  }
  return newList
}
</script>

<style lang="scss" scoped>
.node-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  &::v-deep(.checkbox-as-radio) {
    .el-checkbox__inner {
      border-radius: 50%;
    }
  }
  &::v-deep(.el-checkbox) {
    margin: 0;
  }
}
</style>
