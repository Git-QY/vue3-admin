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

import { addAiRoom, listAiRoom, addAiRoomMessage, chatGpt, listAiRoomMessage } from '@/api'

const currentId = ref<string>('') // 当前会话 ID
const historyList = ref<Array<{ name: string; id: string }>>([]) // 会话历史列表
const currentQA = ref({
  isThinking: false, // 是否正在思考中
  isResponing: false, // 是否正在回应中
  val: '', // 当前回答内容
})
const currentChat = ref<{ id: string; messageList: Array<{ type: string; val: string }> }>({ id: '', messageList: [] }) // 当前会话对象
const suggestedList = ref<Array<string>>([]) // 推荐问题列表
// 创建新会话
const createNewChat = async () => {
  await loadHistory()
  stopResponse()
  updateCurrentQA({ isThinking: false, isResponing: false, val: '' })
  // 重置对话id
  currentId.value = ''
  // 自动聚焦输入框
  focusInput()
}
// 获取focus
const focusInput = () => {
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
const switchChat = async (chat: { id: string }) => {
  if (currentId.value === chat.id && currentId.value) return
  stopResponse()
  // 根据需要加载会话逻辑
  currentId.value = chat.id
  focusInput()
  // 加载历史对话
  const res = await listAiRoomMessage({ roomId: chat.id })
  const messageList = res.data.map((item: any) => item.contant)
  currentChat.value = { id: chat.id, messageList }
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
  // 更新当前问答状态
  updateCurrentQA({ isThinking: true, isResponing: false, val: '' })
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
    // 拼接数据
    const messageList = currentChat.value.messageList.map((item: any) => {
      return { role: item.type === 'question' ? 'user' : 'assistant', content: item.val }
    })
    const res = await chatGpt(messageList)
    const answerList = res.data
    let timer = null as any
    let count = 0
    let abort = () => {
      clearInterval(timer)
    }
    timer = setInterval(() => {
      if (count >= answerList.length) {
        abort()
        onEnd()
      } else {
        if (answerList[count].code == '0') {
          onData({ val: answerList[count].choices[0].delta.content }, abort)
        } else {
          onData({ val: answerList[count].message }, abort)
        }
        count += 1
      }
    }, 50)
  } catch (error) {
    onError(error)
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
  updateCurrentQA({ isThinking: false, isResponing: false, val: '' })
  scrollBottom()
}
// 结束回调
const onEnd = async () => {
  stopResponse()
  // suggestedList.value = await mock.getSuggested()
  scrollBottom()
}
// 滚动到底部
const scrollBottom = async () => {
  await nextTick()
  const Input = document.querySelector('#chat-playground--body') as HTMLInputElement
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
