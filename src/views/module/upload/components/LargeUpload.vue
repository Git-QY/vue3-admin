<template>
  <el-upload class="upload-demo" drag action :auto-upload="false" multiple :on-change="handleChange">
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    <template #tip> </template>
  </el-upload>
  <div>
    <el-button type="primary" @click="uploadFiles">上传</el-button>
    <div v-for="item in list">
      <div style="display: flex; justify-content: space-between; margin: 10px 0">
        <div>上传进度：{{ item.fileName }}</div>
        <div>
          <!-- 取消上传是将文件所有请求取消并发送请求删除文件 -->
          <el-button type="primary" @click="abortUpload">取消上传</el-button>
          <!-- 暂停上传即根据取消标识将当前文件的所有请求进行取消 可以继续上传  点断续传 -->
          <el-button type="primary" @click="pauseUpload">暂停上传</el-button>
        </div>
      </div>
      <el-progress :stroke-width="20" :text-inside="true" :percentage="item.uploaedProgress"></el-progress>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { createFileChunk, calculationChunksMd5 } from '@/utils/upload'
import request from '@/utils/request'
import { uploadChunkMerge } from '@/api/utils'
import { ElMessage } from 'element-plus'
const props = defineProps({
  modelValue: { type: Array, default: () => [] }, // 绑定值
  multiple: { type: Boolean, default: false }, // 是否多选
  limit: { type: Number, default: 1 }, // 最大上传数量
  beforeUpload: { type: Function }, // 上传前的钩子
})
type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
interface UploadFile {
  name: string
  percentage?: number
  status: UploadStatus
  size?: number
  response?: unknown
  uid: number
  url?: string
  raw?: UploadRawFile
}
interface UploadRawFile extends File {
  uid: number
}
interface Chunk {
  chunk: Blob
  chunkFileName: string
  index: number
  hash: string
  Progress?: number
}
interface List {
  chunkList: Chunk[]
  fileName: string
  hash: string
  uploaedProgress: number
}
const emits = defineEmits(['update:modelValue'])

const chunkList = ref<Chunk[]>([])
const hashProgress = ref(0)
const hash = ref('') // 文件hash
const fileName = ref('')
const list = ref<List[]>([]) // 上传列表
const totalSize = ref(0) // 总文件大小
const uploadedSize = ref(0) // 已上传的总大小
const speed = ref(0) // 当前网速，单位可以是字节/秒
const handleChange = async (file: UploadFile) => {
  totalSize.value += file.size || 0
  const chunks = createFileChunk(file.raw as File)
  hash.value = await calculationChunksMd5(chunks)
  fileName.value = file.name || file.raw?.name || ''
  const extendsion = fileName.value.split('.').pop()
  chunkList.value = chunks.map((chunk, index) => {
    return { chunk, chunkFileName: `${index}_${hash.value}.${extendsion}`, index, hash: hash.value }
  })
  list.value.push({
    chunkList: chunkList.value,
    fileName: fileName.value,
    hash: hash.value,
    uploaedProgress: 0,
  })
}
//  确定上传
const uploadFiles = async () => {
  // 多选上传列表
  list.value.forEach(async item => {
    await uploadFile(item)
  })
}
// 上传逻辑
const uploadFile = async (item: List) => {
  let uploadedCount = 0 // 已上传的切片数量
  const totalChunks = item.chunkList.length // 总切片数量
  const requestChunks = item.chunkList.map(({ chunk, chunkFileName, hash }: Chunk) => {
    return () => {
      const formData = new FormData()
      formData.append('file', chunk)
      formData.append('fileName', chunkFileName)
      formData.append('hash', hash)
      return request.post('/utils/uploads/chunk', formData, {
        onUploadProgress: function (progressEvent: ProgressEvent) {
          // 切片上传成功时更新已上传的切片数量
          if (progressEvent.loaded === progressEvent.total) {
            uploadedCount++
            const totalProgress = Math.floor((uploadedCount / totalChunks) * 100) // 计算总进度
            item.uploaedProgress = totalProgress
          }
        },
      })
    }
  })
  try {
    await limitConcurrency(requestChunks, 5)
    const res = await uploadChunkMerge({ hash: hash.value, fileName: fileName.value })
    // uploaedProgress.value = 0
    ElMessage.success('上传成功')
    emits('update:modelValue', res.data.url)
  } catch (error) {}
}
const limitConcurrency = async (requestList: any[] = [], limit: number = 3) => {
  return new Promise((resolve, reject) => {
    const length = requestList.length
    if (length === 0) return resolve([])
    const result: any[] = [] // 存储结果
    let index = 0 // 索引 (当前请求) 确保返回结果顺序一致
    let count = 0 // 已完成的请求数量

    const sendRequest = async () => {
      if (index === requestList.length) return
      const i = index
      index++
      try {
        const res = await requestList[i]()
        result[i] = res
      } catch (e) {
        result[i] = e
      } finally {
        count++
        console.log(`当前已完成的请求数量：${count}`)
        if (count === requestList.length) {
          return resolve(result)
        }
        sendRequest()
      }
    }
    for (let i = 0; i < Math.min(limit, length); i++) {
      sendRequest()
    }
  })
}
// 中断上传
const abortUpload = () => {}
// 暂停上传
const pauseUpload = () => {}
</script>

<style lang="scss" scoped></style>
