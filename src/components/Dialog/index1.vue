<template>
  <!-- append-to-body 点击空白处不关闭弹窗 -->
  <el-dialog
    :model-value="visible"
    :title="title"
    :width="width"
    :close-on-click-modal="false"
    append-to-body
    draggable
    :destroy-on-close="destroyOnClose"
    :before-close="close"
    :fullscreen="fullscreen"
    :loading="loading"
    :footerHidden="footerHidden"
  >
    <div class="container" :style="{ height: height + 'px' }">
      <slot name="content"></slot>
    </div>
    <template #footer v-if="!footerHidden">
      <span class="dialog-footer">
        <el-button type="primary" loading-icon="Eleme" :loading="confirmLoading" v-throttle="onConfirm">{{ confirmText }}</el-button>
        <el-button type="danger" @click="onCancel">{{ cancelText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<!-- 此弹窗封装将使用 defineExpose，通过ref进行使用 -->
<script setup lang="ts">
import { ref, toRefs } from 'vue'
// 定义参数的类型
interface IDialogProps {
  title?: string
  visible?: boolean
  width?: number
  height?: number
  confirmText?: string
  cancelText?: string
  destroyOnClose?: boolean
  fullscreen?: boolean
  loading?: boolean
  footerHidden?: boolean // 是否隐藏确认和取消按钮部分
}
// 子组件接收父组件的值
// withDefaults：设置默认值  defineProps：接收父组件的参数
const props = withDefaults(defineProps<IDialogProps>(), {
  title: '标题',
  height: 300,
  width: 650,
  visible: false,
  confirmText: '确定',
  cancelText: '取消',
  destroyOnClose: false,
  fullscreen: false,
  loading: false,
  footerHidden: false,
})

const visible = ref(false)
const { loading } = toRefs(props)
const confirmLoading = ref(loading)

// 打开弹窗
const open = () => {
  visible.value = true
}
// 取消
const close = () => {
  visible.value = false
}

const emits = defineEmits(['confirm', 'cancel']) // 当前组件获取父组件传递的事件方法
const onConfirm = () => emits('confirm') // 弹框的确定事件
const onCancel = () => emits('cancel') // 弹框的取消事件

// 暴露给父组件方法
defineExpose({
  open,
  close,
})
</script>
<style lang="scss" scope>
.container {
  overflow-x: initial;
  overflow-y: auto; // 超出部分则滚动
}
.el-dialog {
  border-top-left-radius: 8px !important;
  border-top-right-radius: 8px !important;
  padding-top: 0px;

  // 标题头部
  .el-dialog__header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px !important;
    padding: 0 0 6px 0;

    // background: #1e71ee;
    @apply dark:bg-#141414;
    .el-dialog__title {
      font-family: YouYuan;
      font-size: 18px;
      font-weight: 500;
    }
  }
  .el-dialog__body {
    padding: 0px;
  }
  // .el-dialog__footer {
  //   padding: 10px;
  // }
}
.el-dialog__body {
  // 内容区域内边距
  padding: 10px;
}
.el-dialog__headerbtn {
  padding-bottom: 6px !important;
  .el-dialog__close {
    border: 1px solid;
    border-radius: 10px;
  }
}
</style>
