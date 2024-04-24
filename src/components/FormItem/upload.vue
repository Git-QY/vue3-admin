<template>
  <!-- 原生上传组件 -->
  <div class="upload-card">
    <div class="upload-card--item" v-for="(item, index) in fileList" :key="index">
      <!-- <img :src="item.url" :alt="item.name" /> -->
      <fileIcon :data="item.url" :width="100" :height="100"></fileIcon>
      <!-- 遮罩层 -->
      <div class="modal">
        <el-icon @click="onDownload(item)"><Download /></el-icon>
        <el-icon @click="onRemove(item)"><Delete /></el-icon>
      </div>
    </div>
    <div class="upload-card--item upload-btn" @click="onUpload">
      <input type="file" hidden @change="onChange" ref="fileRef" />
      <svg-icon iconName="icon-add" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { upload } from '@/api/utils'
import { ElMessage } from 'element-plus'
import fileIcon from '@/components/FormItem/fileIcon.vue'
interface File {
  url: string
  name: string
}

const props = defineProps({
  modelValue: { type: [String, Array] }, // 绑定值
  multiple: { type: Boolean, default: false }, // 是否多选
  limit: { type: Number, default: 10 }, // 最大上传数量
  beforeUpload: { type: Function }, // 上传前的钩子
})
const emits = defineEmits(['update:modelValue'])

const fileList = ref<any[]>([]) // 文件列表
const fileRef = ref<any>(null)

const onUpload = () => {
  fileRef.value.click()
  fileRef.value.value = null // 防止相同文件上传的问题
}

const onChange = async (e: any) => {
  let files = e.target.files
  if (props.limit < files.length) return ElMessage.warning('超出最大上传数量')
  if (props.beforeUpload && !props.beforeUpload(files)) return // 上传前的钩子
  try {
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await upload(formData)
      if (props.limit > 1) {
        fileList.value.push({ ...res.data })
      } else {
        fileList.value = [{ ...res.data }]
      }
    }
    emits(
      'update:modelValue',
      fileList.value.map(item => item.url),
    )
    ElMessage.success('上传成功')
  } catch (error: any) {
    ElMessage.error(error)
  }
}
const onDownload = () => {}
const onRemove = (data: File) => {
  fileList.value = fileList.value.filter((item: File) => item.url != data.url)
  emits(
    'update:modelValue',
    fileList.value.filter((item: File) => item.url),
  )
}
</script>

<style lang="scss" scoped>
.upload {
  &-btn {
    position: relative;
    width: 100px;
    height: 100px;
    line-height: 100px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    border: 1px dashed #ccc;
    &:hover {
      border-color: #409eff;
    }
    .svg-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
    }
  }
  &-card {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    &--item {
      position: relative;
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
      &:hover {
        .modal {
          opacity: 1;
        }
      }
      .modal {
        /*里层绝对位置：为了让盒子位置重叠*/
        position: absolute;
        z-index: 2;
        top: 0;
        /*宽高：撑开鼠标悬停后的盒子*/
        width: 100%;
        height: 100%;
        border-radius: 4px;
        /*样式：鼠标悬停前*/
        opacity: 0;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        text-align: center;
        cursor: pointer;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
}
</style>
