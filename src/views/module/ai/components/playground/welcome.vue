<template>
  <!-- 提问消息 -->
  <div class="chat-welcome">
    <img class="chat-welcome-bg" :src="welcome" width="452px" height="259px" />
    <div class="chat-welcome-icon">
      <img :src="robot_big" width="64px" height="64px" />
    </div>
    <div class="chat-welcome-body">
      <strong>你好！我是小助！</strong>
      <p>为了确保你的体验能够开心！有什么需要，尽管跟我说！</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import welcome from '@/views/module/ai/images/welcome.png'
import robot_big from '@/views/module/ai/images/robot_big.png'

</script>

<style lang="scss">
.chat-welcome {
  margin-top: 100px;
  margin-bottom: 25px;
  position: relative;
  display: flex;
  .chat-welcome-bg {
    position: absolute;
    left: 358px;
    top: -35px;
    z-index: 0;
  }
  .chat-welcome-icon {
    margin-right: 15px;
    img {
      display: block;
    }
  }
  .chat-welcome-body {
    z-index: 1;
    strong {
      display: block;
      font-weight: bold;
      font-size: 24px;
      color: #333333;
      line-height: 28px;
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
      color: #616161;
      line-height: 28px;
      margin: 0;
    }
  }
}
</style>
