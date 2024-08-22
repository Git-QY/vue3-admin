<template>
  <div class="wangEditor">
    <!-- 工具栏 -->
    <Toolbar class="wangEditor-toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" />
    <!-- 编辑器 -->
    <Editor class="wangEditor-container" :style="{ height: props.height }" v-model="modal" :defaultConfig="editorConfig" @onCreated="handleCreated" />
  </div>
</template>
<script setup lang="ts">
import { upload } from '@/api/utils'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { SlateElement } from '@wangeditor/editor'

// 高度默认
const props = defineProps({
  height: { type: String, default: '500px' },
  maxLength: { type: Number, default: 1000 },
})

// type VideoElement = SlateElement & {
//   src: string
//   poster?: string
// }
// 编辑器配置
const editorConfig = {
  placeholder: '请输入内容...',
  readOnly: false, // 是否只读 默认 false
  autoFocus: false, // 是否自动聚焦 默认 false
  scroll: true, // 是否开启滚动 默认 true  (配置编辑器是否支持滚动，默认为 true 。注意，此时不要固定 editor-container 的高度，设置一个 min-height 即可)
  maxLength: 10000, // 限制输入字数 (onMaxLength 当达到 maxlength 限制时，触发该回调函数)
  MENU_CONF: {
    // 自定义图片上传
    uploadImage: {
      customUpload: (file: any, insertFn: any) => upLoad(file, insertFn),
    },
    // 自定义视频上传
    uploadVideo: {
      customUpload: (file: any) => upLoad(file, customParseVideoSrc),
    },
  }, // 菜单栏配置
}
const upLoad = async (file: any, insertFn: any) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await upload(formData)
    insertFn(res.data.url)
  } catch (error) {
    console.log(error)
  }
}
// 自定义上传插入视频节点
const customParseVideoSrc = (src: string) => {
  const videoElement = {
    type: 'video',
    src: src,
    poster: '',
    children: [{ text: '' }],
  }
  editorRef.value.insertNode(videoElement)
}

// 工具栏配置
const toolbarConfig = {}
const modal = defineModel() // 获取父组件的modal
const editorRef = shallowRef() // 获取编辑器实例
const handleCreated = (editor: any) => {
  editorRef.value = editor
}
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
.wangEditor {
  border: 1px solid #ccc;
  &-toolbar {
    border-bottom: 1px solid #ccc;
  }
  &-container {
    // height: 500px !important;
    overflow-y: hidden;
  }
}
</style>
