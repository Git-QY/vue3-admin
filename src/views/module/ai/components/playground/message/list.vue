<template>
  <!-- 对话列表 -->
  {{ currentQA }}
  <div class="chat-message-list">
    <div class="chat-message-item" v-for="(item, index) in messageList" :key="index">
      {{ item }}
      <!-- <Question v-if="item.type === 'question'" v-bind="item" :isLast="isLast(index, 'question')" />
      <Answer v-if="item.type === 'answer'" v-bind="item" :isLast="isLast(index, 'answer')" /> -->
    </div>
    <!-- 当前回答 -->
    <!-- <Answer v-bind="currentQA" v-if="showCurrentQA" /> -->
    <!-- 推荐问题 -->
    <!-- <suggestedVue /> -->
  </div>
</template>

<script lang="ts" setup>
// import Question from './question.vue'
// import Answer from './answer.vue'
// import suggestedVue from './suggested.vue'

// 注入的属性
const getCurrentQA = inject('getCurrentQA') as () => { isThinking: boolean; isResponing: boolean }
const getCurrentChat = inject('getCurrentChat') as () => { messageList: any[] }
const getCurrentId = inject('getCurrentId')

// 计算属性
const messageList = computed(() => getCurrentChat()?.messageList || [])
const currentQA = computed(() => getCurrentQA())
const showCurrentQA = computed(() => {
  const { isThinking, isResponing } = getCurrentQA()
  return isThinking || isResponing
})

// 方法
const isLast = (index: number, type: string) => {
  return (
    index ===
    messageList.value
      .slice()
      .reverse()
      .findIndex(item => item.type === type)
  )
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
