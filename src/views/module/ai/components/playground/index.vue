<template>
  <!-- 聊天主界面 -->
  <div class="chat-playground">
    <div class="chat-playground--head">
      <div class="title">AI小助</div>
    </div>
    <div class="chat-playground--body" id="chat-playground--body">
      <div class="chat-playground--main">
        <!-- 对话消息列表 -->
        <MessageList v-if="currentId" />
        <template v-else>
          <!-- 欢迎 -->
          <Welcome />
          <!-- 引导词 -->
          <Guide />
        </template>
      </div>
    </div>
    <div class="chat-playground--foot">
      <!-- 停止生成 -->
      <div class="chat-stop-btn" v-if="isResponing" @click="stopResponse">
        <img :src="stop" width="16px" height="16px" />
        <span>停止生成</span>
      </div>
      <ChatInput />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Welcome from './welcome.vue'
import Guide from './guide.vue'
import ChatInput from './chat-input.vue'
import MessageList from './message/list.vue'

import stop from '@/views/module/ai/images/stop.png'

// 注入父组件提供的函数
const getCurrentId = inject<() => string>('getCurrentId')!
const getCurrentQA = inject<() => { isResponing: boolean }>('getCurrentQA')!
const stopResponse = inject<() => void>('stopResponse')!

// 定义响应式数据
// const text = ref('')
// const msg = ref('')
// const msgList = ref<string[]>([])
// const currentMsg = ref('')

// 计算属性
const currentId = computed(() => getCurrentId())
const isResponing = computed(() => getCurrentQA().isResponing)
</script>

<style lang="scss">
.chat-playground {
  flex: 1;
  background: #f7f8fa;
  display: flex;
  flex-direction: column;

  &--head {
    height: 80px;
    flex-shrink: 0;
    font-size: 16px;
    color: #333;
    font-weight: bold;
    padding: 0 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &--body {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &--main {
    max-width: 800px;
    margin: auto;
  }

  &--foot {
    flex-shrink: 0;
    padding-bottom: 20px;
    position: relative;

    .chat-stop-btn {
      position: absolute;
      width: 100px;
      height: 28px;
      border-radius: 14px;
      border: 1px solid #dddddd;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #333333;
      cursor: pointer;
      top: -48px;
      left: 50%;
      margin-left: -50px;
      z-index: 1000;
      line-height: 1;
      background: #f7f8fa;

      img {
        margin-right: 4px;
      }
    }

    .chat-input {
      max-width: 800px;
      margin: auto;
    }
  }
}
</style>
