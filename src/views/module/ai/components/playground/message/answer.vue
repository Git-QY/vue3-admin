<template>
  <div class="chat-message-answer">
    <div class="chat-message-answer-icon">
      <img :src="robot" width="40px" height="40px" />
    </div>
    <div class="chat-message-answer-content">
      <el-skeleton :rows="3" animated :loading="isThinking">
        <!-- {{ $attrs }} -->
        <!-- <div v-html="val"></div> -->
        <MarkdownVue :content="val"></MarkdownVue>
      </el-skeleton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import robot from '@/views/module/ai/images/robot.png'
import MarkdownVue from '@/components/FormItem/markdownVue.vue'
defineProps<{
  isLast?: boolean
  val?: string
  files?: any[]
  isThinking?: boolean
  isResponing?: boolean
}>()
</script>

<style lang="scss">
.chat-message-answer {
  width: 100%;
  display: flex;
  margin-bottom: 16px;
  .chat-message-answer-icon {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 20px;
    margin-right: 12px;
    position: relative;
    top: 9px;
    flex-shrink: 0;
  }
  .chat-message-answer-content {
    background: #fff;
    border-radius: 12px 12px 12px 0;
    padding: 16px 24px;
    flex: 1;
    word-break: break-word;
  }
  .typing-icon {
    display: inline-block;
    width: 4px;
    height: 15px;
    background: linear-gradient(25deg, #878cf6 11%, #1968fc 100%);
    border-radius: 2px;
    transform: rotate(30deg);
    margin-left: 5px;
    position: relative;
    top: 3px;
  }
}
</style>
