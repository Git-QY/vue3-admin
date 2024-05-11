<template>
  <!-- append-to-body 点击空白处不关闭弹窗 -->
  <el-dialog
    :model-value="modelValue"
    :title="title"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    append-to-body
    draggable
    :overflow="true"
    :destroy-on-close="destroyOnClose"
    :before-close="onCancel"
    :fullscreen="fullscreen"
    :loading="loading"
    :footerHidden="footerHidden"
  >
    <div class="container" :style="style">
      <slot name="content"></slot>
    </div>
    <template #footer v-if="!footerHidden">
      <span class="dialog-footer">
        <el-button type="danger" @click="onCancel">{{ cancelText }}</el-button>
        <el-button type="primary" loading-icon="Eleme" :loading="confirmLoading" @click="onConfirm">{{ confirmText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
interface IDialogProps {
  title?: string
  modelValue?: boolean
  width?: number
  style?: object
  confirmText?: string
  cancelText?: string
  destroyOnClose?: boolean
  fullscreen?: boolean
  loading?: boolean
  footerHidden?: boolean // 是否隐藏确认和取消按钮部分
  overflow?: boolean
  closeOnClickModal?: boolean
}
const props = withDefaults(defineProps<IDialogProps>(), {
  title: '标题',
  height: 300,
  width: 650,
  modelValue: false,
  confirmText: '确定',
  cancelText: '取消',
  destroyOnClose: true,
  fullscreen: false,
  loading: false,
  footerHidden: false,
  overflow: false,
  closeOnClickModal: true,
})
const { loading } = toRefs(props)
const confirmLoading = ref(loading)
const emits = defineEmits(['confirm', 'cancel']) // 当前组件获取父组件传递的事件方法
const onConfirm = () => emits('confirm') // 弹框的确定事件
const onCancel = () => emits('cancel') // 弹框的取消事件
</script>
<style lang="scss" scope>
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
