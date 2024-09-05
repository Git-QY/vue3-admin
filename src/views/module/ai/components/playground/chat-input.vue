<template>
  <!-- 输入框 -->
  <div class="chat-input" :class="{ active: isFocus }">
    <!-- 文件上传 -->
    <div class="chat-input--head">
      <el-popover placement="top" width="192px" popper-class="chat-file-popover">
        <div>
          <div>一次最多上传1个文件</div>
          <span>格式Word/PDF，单个最大10MB</span>
        </div>
        <template #reference>
          <div class="chat-input-filebtn" @click="triggerUpload('file')" :disabled="disabled">
            <img :src="upload_file" alt="" />
            <span>上传文件</span>
          </div>
        </template>
      </el-popover>
      <el-popover placement="top" width="192px" popper-class="chat-file-popover">
        <div>
          <div>当前支持上传1张图片</div>
          <span>最大10MB</span>
        </div>
        <template #reference>
          <div class="chat-input-filebtn" @click="triggerUpload('img')" :disabled="disabled">
            <img :src="upload_img" alt="" />
            <span>上传图片</span>
          </div>
        </template>
      </el-popover>
    </div>
    <!-- 文件上传列表 -->
    <div class="chat-input--files"></div>
    <!-- 多行文本框 -->
    <div class="chat-input--textarea">
      <textarea
        id="chat-msg-input"
        v-model="question"
        placeholder="通过shift+回车换行；支持复制粘贴/拖拽上传图片或文件"
        :disabled="disabled"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @keydown.enter="submit"
        @paste="paste"
        @drop="drop"
      ></textarea>
    </div>
    <!-- 发送按钮 -->
    <div class="chat-input--submit" :class="{ disabled: !question.length || disabled }" @click="send">
      <div class="chat-input-loading" v-loading="disabled" v-if="disabled"></div>
      <img :src="send_img" v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
// images
import upload_file from '@/views/module/ai/images/upload_file.png'
import upload_img from '@/views/module/ai/images/upload_img.png'
import send_img from '@/views/module/ai/images/send.png'
import { QuestionItem } from '@/types'

const getCurrentQA = inject<() => { [key: string]: boolean }>('getCurrentQA')!
const sendQuestion = inject<(data: QuestionItem) => void>('sendQuestion')!

// 响应式数据
const isFocus = ref(false)
const question = ref('')

// 计算属性 - 判断是否禁用
const disabled = computed(() => {
  const { isThinking, isResponing } = getCurrentQA()
  return isThinking || isResponing
})

// 处理文本提交
const submit = (evt: KeyboardEvent) => {
  if (!evt.shiftKey) {
    evt.preventDefault()
  }
  if (!question.value || evt.shiftKey) return
  send()
}

// 发送文本消息
const send = () => {
  if (disabled.value) return
  isFocus.value = false
  const text = question.value.replace(/\n+$/, '')
  sendQuestion({ text: text, files: [] })
  question.value = ''
}

// 触发文件上传
const triggerUpload = (_fileType: 'file' | 'img') => {
  // 目前功能尚在开发中
  alert('功能开发中')
}

// 处理拖放事件
const drop = (evt: DragEvent) => {
  if (!disabled.value) return
  evt.preventDefault()
  console.log(evt.dataTransfer?.files[0])
  alert('功能开发中')
}

// 处理粘贴事件
const paste = (evt: ClipboardEvent) => {
  if (!disabled.value) return

  const data = evt.clipboardData?.items || []
  if (!data.length) return
  const item = data[0]
  let file: File | null = null

  if (item.type.includes('image/')) {
    file = item.getAsFile() as File
    console.log(file)
    alert('功能开发中')
  }
  // 这里可以添加更多处理逻辑，如处理 Word 和 PDF 文件
}
</script>

<style lang="scss">
::placeholder {
  color: #c0c4cc;
}
.chat-file-popover {
  background: linear-gradient(90deg, #878cf6 0%, #1968fc 100%);
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  border: 0;
  span {
    color: #ced6fb;
    font-size: 12px;
  }
  .popper__arrow::after {
    border-top-color: #878cf6 !important;
  }
}
.chat-input {
  width: 100%;
  min-height: 150px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  &[active] {
    border-color: var(--primary);
  }
  &--head {
    margin: 0 16px;
    height: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid #ebedf0;
    display: flex;
    align-items: center;
    .chat-input-filebtn {
      margin-right: 8px;
      padding: 0 8px;
      height: 24px;
      background: #edf3ff;
      border-radius: 12px;
      line-height: 24px;
      font-size: 12px;
      color: #333333;
      text-align: center;
      cursor: pointer;
      &[disabled='true'] {
        background: #f7f8fa;
        color: #c0c4cc;
        pointer-events: none;
        img {
          filter: drop-shadow(0 1000px 0 #c0c4cc);
          top: -996px;
        }
      }
      &:hover {
        color: var(--primary);
        img {
          filter: drop-shadow(0 1000px 0 var(--primary));
          top: -996px;
        }
      }
      img {
        margin-right: 1px;
        width: 16px;
        height: 16px;
        object-fit: cover;
        position: relative;
        top: 4px;
      }
    }
  }

  &--files {
  }
  &--textarea {
    overflow: hidden;
    border-radius: 20px;
    textarea {
      font-weight: 500;
      font-size: 16px;
      height: 110px;
      padding: 14px 16px;
      border: 0;
      outline: 0;
      width: 100%;
      box-sizing: border-box;
      resize: none;
      display: block;
      color: #333;
      &[disabled] {
        background: #fff;
      }
    }
  }
  &--submit {
    position: absolute;
    width: 46px;
    height: 30px;
    border-radius: 15px;
    bottom: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    background: linear-gradient(90deg, #878cf6 0%, #1968fc 100%);
    &[disabled] {
      background: #c0c4cc;
      cursor: default;
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
  .chat-input-loading {
    position: relative;
    width: 24px;
    height: 24px;
    .el-loading-mask {
      background: transparent;
    }
    .el-loading-spinner {
      margin-top: -12px;
    }
    .el-loading-spinner .circular {
      width: 24px;
      height: 24px;
    }
    .el-loading-spinner .path {
      stroke: #fff;
    }
  }
}
</style>
