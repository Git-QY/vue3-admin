import { ElMessage, ElMessageBox } from 'element-plus'

// 消息类型定义
type MessageType = 'success' | 'warning' | 'info' | 'error'

// 对话框选项定义
interface MessageBoxOptions {
  confirmButtonText?: string
  cancelButtonText?: string
  type?: MessageType
}
export function useMessage(onlyOne?: boolean) {
  // 是否只显示一个消息或对话框
  const onlyOnes = ref<boolean>(onlyOne || false)
  // 消息提示
  const showMessage = (message: any, type: MessageType = 'success'): void => {
    if (onlyOnes.value) {
      ElMessage.closeAll()
    }
    if (message.error || message.msg || message.message) {
      message = message.error || message.msg || message.message
    }
    ElMessage({ message, type })
  }
  // 确认对话框
  const showMessageBox = async (message: string, title: string = '提示', options: MessageBoxOptions = {}): Promise<boolean> => {
    if (onlyOnes.value) {
      ElMessageBox.close()
    }
    return new Promise((resolve, _reject) => {
      ElMessageBox.confirm(message, title, {
        confirmButtonText: options.confirmButtonText || '确认',
        cancelButtonText: options.cancelButtonText || '取消',
        type: options.type || 'warning',
      })
        .then(() => {
          resolve(true)
        })
        .catch(() => {
          resolve(false)
        })
    })
  }
  return {
    showMessage,
    showMessageBox,
    onlyOne,
  }
}
