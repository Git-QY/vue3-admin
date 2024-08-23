<template>
  <!-- 提问消息 -->
  <div class="chat-sidebar">
    <!-- 新建对话 -->
    <div class="chat-new-btn" @click="createNewChat">
      <el-icon name="plus"></el-icon>
      <span>新建对话</span>
    </div>
    <!-- 对话记录 -->
    <History />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, inject } from 'vue'
import History from './history/index.vue'

// 从 inject 中获取 createNewChat 方法
const createNewChat = inject('createNewChat') as () => void

if (!createNewChat) {
  throw new Error('createNewChat 函数未提供')
}

defineComponent({
  components: {
    History,
  },
})
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
