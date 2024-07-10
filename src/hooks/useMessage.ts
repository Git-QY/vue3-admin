import { ElMessage, ElMessageBox } from 'element-plus'

// 消息类型定义
type MessageType = 'success' | 'warning' | 'info' | 'error'

// 对话框选项定义
interface MessageBoxOptions {
  confirmButtonText?: string
  cancelButtonText?: string
  type?: MessageType
}

export function useElementUI() {
  // 是否只显示一个消息或对话框
  const onlyOne = ref(false)

  // 消息提示
  const showMessage = (message: string, type: MessageType = 'success'): void => {
    if (onlyOne.value) {
      ElMessage.closeAll()
    }
    ElMessage({
      message,
      type,
    })
  }

  // 确认对话框
  const showMessageBox = async (message: string, title: string = '提示', options: MessageBoxOptions = {}): Promise<boolean> => {
    if (onlyOne.value) {
      ElMessageBox.close()
    }
    try {
      const result = await ElMessageBox.confirm(message, title, {
        confirmButtonText: options.confirmButtonText || '确认',
        cancelButtonText: options.cancelButtonText || '取消',
        type: options.type || 'warning',
      })
      return result === 'confirm' // 用户点击了确认按钮
    } catch (error) {
      return false // 用户点击了取消按钮或关闭了对话框
    }
  }

  return {
    showMessage,
    showMessageBox,
    onlyOne,
  }
}
