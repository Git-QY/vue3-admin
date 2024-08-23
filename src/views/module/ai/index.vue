<template>
  <div class="app-chat">
    <!-- 会话列表 -->
    <Sidebar />
    <!-- 当前会话 -->
    <Playground />
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './components/sidebar/index.vue'
import Playground from './components/playground/index.vue'

import { addAiRoom, listAiRoom, deleteAiRoom, addAiRoomMessage, updateAiRoom } from '@/api'
const mock = {
  // 获取机器人配置信息
  getChatConfig() {},
  // 获取推荐问题
  async getSuggested() {
    return Math.random() > 0.2 ? ['问题1', '问题2', '问题3'] : []
  },
  // 获取对话列表
  getHistory() {},
  // 发送问题
  sendQuestion(data: any, options: any) {
    let timer = null as any
    let count = 0
    let abort = () => {
      clearInterval(timer)
    }
    // 模拟一个三秒的返回信息
    setTimeout(() => {
      timer = setInterval(() => {
        count += 1
        if (count >= 50) {
          abort()
          options.onEnd()
        } else {
          options.onData({ val: 'word' }, abort)
        }
      }, 50)
    }, 500)
  },
}

// import { localCache } from '@/utils/cache'

const currentId = ref<string>('') // 当前会话 ID
const historyList = ref<Array<{ name: string; id: string }>>([]) // 会话历史列表
const currentQA = ref({
  isThinking: false, // 是否正在思考中
  isResponing: false, // 是否正在回应中
  val: '', // 当前回答内容
})
const currentChat = ref<{ id: string; messageList: Array<{ type: string; val: string }> } | null>(null) // 当前会话对象
const suggestedList = ref<Array<string>>([]) // 推荐问题列表
// 创建新会话
const createNewChat = async () => {
  await loadHistory()
  stopResponse()
  updateCurrentQA({ isThinking: false, isResponing: false, val: '' })
  // 重置对话id
  currentId.value = ''
  // 自动聚焦输入框
  const Input = document.querySelector('#chat-msg-input') as HTMLInputElement
  Input.focus()
}
// 查询会话列表
const historyLoading = ref(false)
const loadHistory = async () => {
  try {
    historyLoading.value = true
    const res = await listAiRoom()
    historyList.value = res.data
  } catch (error) {
    console.error(error)
  } finally {
    historyLoading.value = false
  }
}
// 切换会话
const switchChat = (chat: { id: string }) => {
  if (currentId.value === chat.id && currentId.value) return
  // 根据需要加载会话逻辑
  currentId.value = chat.id
  const Input = document.querySelector('#chat-msg-input') as HTMLInputElement
  Input.focus()
}
// 重新发送问题
const sendQuestionAgain = (data: { text: string }) => {
  if (currentChat.value) {
    currentChat.value.messageList.pop()
    currentChat.value.messageList.pop()
    sendQuestion(data)
  }
}
// 发送问题
const sendQuestion = async (data: { text: string }) => {
  try {
    suggestedList.value = []
    if (!currentId.value) {
      // 生成messageList
      const res = await addAiRoom({ name: data.text.substring(0, 10) })
      const chatData = res.data || {}
      currentId.value = chatData.id
      historyList.value.unshift({ ...chatData })
      currentChat.value = { id: chatData.id, messageList: [{ type: 'question', val: data.text }] }
    } else {
      currentChat.value && currentChat.value.messageList.push({ type: 'question', val: data.text })
    }
    await addAiRoomMessage({ roomId: currentId.value, contant: { type: 'question', val: data.text } })
    updateCurrentQA({ isThinking: true, isResponing: false, val: '' })
    mock.sendQuestion(data, { onData, onError, onEnd })
  } catch (error) {
    console.error(error)
  }
}
// 更新当前问答状态
const updateCurrentQA = (data: Partial<typeof currentQA.value>) => {
  Object.assign(currentQA.value, data)
}
// 停止回应
const stopResponse = async () => {
  abort?.()
  abort = null
  updateCurrentQA({ isResponing: false })
  if (currentChat.value) {
    currentChat.value.messageList.push({ type: 'answer', val: currentQA.value.val })
    await addAiRoomMessage({ roomId: currentId.value, contant: { type: 'answer', val: currentQA.value.val } })
  }
}
let abort: (() => void) | null = null
// 接收数据的回调
const onData = async (data: { val: string }, abortFn: () => void) => {
  abort = abortFn
  await nextTick()
  updateCurrentQA({ isThinking: false, isResponing: true, val: currentQA.value.val + data.val })
  scrollBottom()
}
// 错误回调
const onError = (err: any) => {
  console.error(err)
}

// 结束回调
const onEnd = async () => {
  stopResponse()
  suggestedList.value = await mock.getSuggested()
  scrollBottom()
}
// 滚动到底部
const scrollBottom = async () => {
  await nextTick()
  const Input = document.querySelector('#chat-msg-input') as HTMLInputElement
  Input.scrollTop = 9999999999
}
// 提供依赖
provide('getHistoryList', () => historyList.value)
provide('getCurrentId', () => currentId.value)
provide('getCurrentQA', () => currentQA.value)
provide('getCurrentChat', () => currentChat.value)
provide('getSuggestedList', () => suggestedList.value)
provide('sendQuestion', sendQuestion)
provide('stopResponse', stopResponse)
provide('createNewChat', createNewChat)
provide('switchChat', switchChat)
provide('sendQuestionAgain', sendQuestionAgain)
// historyLoading
provide('getHistoryLoading', () => historyLoading.value)

onMounted(async () => {
  // 加载历史和当前会话逻辑
  await loadHistory()
  // 默认选中第一个
  historyList.value.length > 0 && switchChat(historyList.value[0])
})

onUnmounted(() => {
  // 清理逻辑（如果需要）
})
</script>

<style lang="scss">
.app-chat {
  height: 100%;
  background: #fff;
  display: flex;
}
</style>
