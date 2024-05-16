<template>
  <el-dialog class="picker-dialog" v-model="visible" append-to-body draggable :overflow="true" :before-close="onCancel" node-key="id">
    <template #header></template>
    <div class="picker">
      <div class="picker-header"></div>
      <div class="picker-body">
        <div class="picker-body_left">
          <!-- <el-tree-v2 style="max-width: 600px" :data="treeData" :props="nodeProps" show-checkbox :height="208" /> -->
          <el-tree lazy :props="nodeProps" :load="loadNode" :show-checkbox="multiple" @check-change="handleCheckChange" @node-click="handleNodeClick" :expand-on-click-node="false" />
        </div>
        <div class="picker-body_right">
          <div class="picker-body_right--header">
            <p>已选择 {{ selectedList.length }} 个</p>
            <el-button type="primary" size="small" link @click="deleceAll">清空</el-button>
          </div>
          <data class="picker-body_right--main">
            <div v-for="item in selectedList">
              <p>{{ item[nodeProps.label] }}</p>
              <icon name="close" @click="deleteItem(item)" />
            </div>
          </data>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button type="primary" @click="onConfirm">确定</el-button>
      <el-button @click="onCancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
/**
 * 基础选择弹窗 树、列表结构
 * 支持搜索、多选、单选、树形
 * 支持懒加载
 * 支持回显数据
 */

import { ref, computed } from 'vue'
const props = defineProps({
  customClass: { type: String, default: '' },
  load: { type: Function, default: () => {} },
  treeProps: { type: Object },
  // 单选 多选 默认单选
  multiple: { type: Boolean, default: false },
})
const visible = ref<Boolean>(false)
const treeProps = { value: 'id', label: 'label', children: 'children' }
const onCancel = () => {
  visible.value = false
}
const onOpen = (list: any) => {
  visible.value = true
  selectedList.value = list
}
const loadNode = async (node: Node, resolve: (data: any[]) => void, reject: () => void) => {
  try {
    const res = await props.load(node?.data)
    return resolve([...res.data])
  } catch (error) {
    reject()
  }
}
const nodeProps = computed(() => props.treeProps ?? treeProps)

const selectedList = ref<any[]>([])
const handleCheckChange = (e: any, checked: boolean) => {
  if (checked) {
    selectedList.value.push(e)
  } else {
    selectedList.value = selectedList.value.filter(item => item.id !== e.id)
  }
}
const handleNodeClick = (e: any) => {
  if (props.multiple) return console.log('多选不触发 点击事件')
  selectedList.value = [e]
}
const deleteItem = (e: any) => {
  selectedList.value = selectedList.value.filter(item => item.id !== e.id)
}
const deleceAll = () => {
  selectedList.value = []
}
const emits = defineEmits(['change'])
const onConfirm = () => {
  if (props.multiple) {
    emits('change', selectedList.value)
  } else {
    emits('change', selectedList.value[0])
  }

  visible.value = false
}
defineExpose({ onCancel, onOpen })
</script>

<style lang="scss">
.picker {
  min-height: 500px;
  background: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  &-body {
    flex: 1;
    display: flex;
    overflow: hidden;
    margin: 24px;
    border: 1px solid #eaeaea;
    border-radius: 2px;
    &_left {
      padding: 20px;
      flex: 1;
      border-right: 1px solid #eaeaea;
      overflow: hidden;
    }
    &_right {
      padding: 20px;
      width: 320px;
      overflow: auto;
      box-sizing: border-box;
      &--header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
      }
      &--main {
        > div {
          font-size: 14px;
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          height: 40px;
          padding-left: 0;
          flex: 1;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          .el-icon {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
