<template>
  <!-- 对话列表 -->
  <div class="chat-message-list">
    <div class="chat-message-item" v-for="(item, index) in messageList" :key="index">
      <Question v-if="item.type === 'question'" v-bind="item" :isLast="isLast(index)" />
      <Answer v-if="item.type === 'answer'" v-bind="item" :isLast="isLast(index)" />
    </div>
    <!-- 当前回答 -->
    <Answer v-bind="currentQA" v-if="showCurrentQA" />
    <!-- 推荐问题 -->
    <!-- <suggestedVue /> -->
  </div>
</template>

<script lang="ts" setup>
import Question from './question.vue'
import Answer from './answer.vue'
import { useCopyCode } from './useCopyCode'
useCopyCode() // 复制代码
// import suggestedVue from './suggested.vue'
const getCurrentQA = inject('getCurrentQA') as () => { isThinking: boolean; isResponing: boolean }
const getCurrentChat = inject('getCurrentChat') as () => { messageList: any[] }
const messageList = computed(() => getCurrentChat()?.messageList || [])
const currentQA = computed(() => getCurrentQA())
const showCurrentQA = computed(() => {
  const { isThinking, isResponing } = getCurrentQA()
  return isThinking || isResponing
})

// 方法
const isLast = (index: number) => {
  return index === messageList.value.length - 1
}
</script>

<style lang="scss">
.chat-sidebar {
  height: 100%;
  width: 260px;
  background: #fff;
  position: relative;
  padding: 24px 16px;
  box-sizing: border-box;

  .chat-new-btn {
    cursor: pointer;
    margin-bottom: 8px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 14px;
    color: #ffffff;
    background: linear-gradient(90deg, #878cf6 0%, #1968fc 100%);
    border-radius: 4px;

    .el-icon-plus {
      position: relative;
      top: 1px;
      margin-right: 6px;
    }
  }
}
</style>
