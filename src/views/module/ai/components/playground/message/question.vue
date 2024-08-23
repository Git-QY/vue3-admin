<template>
  <!-- TODO：最后的一条提问，是可以编辑的 -->
  <div class="chat-message-question" :isLast="isLast">
    <div class="chat-message-question-icon">
      <img :src="require('@/images/avatar.png')" width="40px" height="40px" />
    </div>
    <div class="chat-message-question-editor" v-if="isEdit">
      <textarea class="chat-message-question-editor-body" v-model="editVal" ref="textarea" @keydown.enter.prevent="again"></textarea>
      <div class="chat-message-question-editor-foot">
        <span class="chat-btn" @click="closeEditor">取消</span>
        <span class="chat-btn-primary" @click="again" :disabled="!enableSubmit">发送</span>
      </div>
    </div>
    <template v-else>
      <div class="chat-message-question-content">
        {{ val }}
      </div>
      <div class="chat-message-question-edit" v-if="enableEdit">
        <el-popover placement="top" width="85px" trigger="hover" popper-class="chat-msg-popover" content="重新编辑">
          <span slot="reference" @click="openEditor">
            <img :src="require('@/images/edit.png')" class="chat-message-question-edit-icon1" />
            <img :src="require('@/images/edit_active.png')" class="chat-message-question-edit-icon2" />
          </span>
        </el-popover>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick, defineProps, defineEmits, inject } from 'vue'

// 组件注册
const props = defineProps<{
  isLast: boolean
  val: string
  files?: any[]
}>()

const emit = defineEmits<{
  (event: 'sendQuestionAgain', payload: { text: string; files: any[] }): void
}>()

const getCurrentQA = inject<() => { isResponing: boolean; isThinking: boolean }>('getCurrentQA')
const sendQuestionAgain = inject<(payload: { text: string; files: any[] }) => void>('sendQuestionAgain')

const isEdit = ref(false)
const editVal = ref(props.val || '')

const enableEdit = computed(() => {
  const { isResponing, isThinking } = getCurrentQA ? getCurrentQA() : { isResponing: false, isThinking: false }
  return !isResponing && !isThinking && props.isLast
})

const enableSubmit = computed(() => !!editVal.value.length)

const openEditor = async () => {
  isEdit.value = true
  editVal.value = props.val
  await nextTick()
  ;(document.querySelector('textarea') as HTMLTextAreaElement).focus()
}

const closeEditor = () => {
  isEdit.value = false
}

const again = () => {
  if (!enableSubmit.value) return
  closeEditor()
  if (sendQuestionAgain) {
    sendQuestionAgain({
      text: editVal.value,
      files: props.files || [],
    })
  }
}
</script>
<style lang="scss">
.chat-msg-popover {
  min-width: 80px;
  background: linear-gradient(90deg, #878cf6 0%, #1968fc 100%);
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  line-height: 1;
  text-align: center;
  padding: 12px 0;
  border: 0;
  .popper__arrow::after {
    border-top-color: #878cf6 !important;
  }
}
.chat-message-question {
  width: 100%;
  display: flex;
  margin-bottom: 16px;
  flex-direction: row-reverse;
  &:hover {
    .chat-message-question-edit {
      display: block;
    }
  }
  .chat-message-question-icon {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    top: 9px;
    flex-shrink: 0;
  }
  .chat-message-question-content {
    min-width: 40px;
    margin-right: 12px;
    background: #fff;
    border-radius: 12px 12px 0 12px;
    color: #fff;
    padding: 16px;
    background: linear-gradient(90deg, #878cf6, #1968fc);
  }
  .chat-message-question-edit {
    display: none;
    position: relative;
    margin-top: 16px;
    margin-right: 16px;
    width: 16px;
    .chat-message-question-edit-icon2 {
      width: 0;
    }
    &:hover {
      .chat-message-question-edit-icon2 {
        width: 16px;
      }
      .chat-message-question-edit-icon1 {
        width: 0;
      }
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
  .chat-message-question-editor {
    flex: 1;
    height: 88px;
    background: var(--light-8);
    border: 1px solid var(--primary);
    border-radius: 12px 12px 0 12px;
    overflow: hidden;
    margin-right: 12px;
    position: relative;
    .chat-message-question-editor-body {
      font-weight: 500;
      font-size: 16px;
      height: 100%;
      padding: 14px 16px;
      border: 0;
      outline: 0;
      width: 100%;
      box-sizing: border-box;
      resize: none;
      display: block;
      color: #333;
    }
    .chat-message-question-editor-foot {
      text-align: right;
      position: absolute;
      right: 0;
      bottom: 8px;
      z-index: 2;
      width: 200px;
      span {
        display: inline-block;
        width: 56px;
        height: 28px;
        line-height: 28px;
        border-radius: 4px;
        font-size: 14px;
        text-align: center;
        margin-right: 8px;
        cursor: pointer;
      }
      .chat-btn {
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #eaeaea;
        color: #333333;
      }
      .chat-btn-primary {
        background: linear-gradient(90deg, #878cf6, #1968fc);
        color: #fff;
        &[disabled] {
          pointer-events: none;
          background: #eaeaea;
        }
      }
    }
  }
}
</style>
