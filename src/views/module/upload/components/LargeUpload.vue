<template>
  <el-upload class="upload-demo" drag action :auto-upload="false" multiple :on-change="handleChange">
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <template #tip></template>
  </el-upload>
  <div>
    <el-button type="primary" @click="uploadFiles">上传</el-button>
    <div v-for="item in list" :key="item.hash">
      <div style="display: flex; justify-content: space-between; margin: 10px 0">
        <div>上传进度：{{ item.fileName }}{{ speed }}</div>
        <div>
          <!-- 取消上传是将文件所有请求取消并发送请求删除文件 -->
          <el-button type="primary" @click="() => abortUpload(item)">取消上传</el-button>
          <!-- 暂停上传即根据取消标识将当前文件的所有请求进行取消 可以继续上传  点断续传 -->
          <el-button type="primary" @click="() => pauseUpload(item)">暂停上传</el-button>
        </div>
      </div>
      <el-progress :stroke-width="20" :text-inside="true" :percentage="item.uploaedProgress"></el-progress>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createFileChunk, calculationChunksMd5 } from '@/utils/upload'
import request from '@/utils/request'
import { uploadChunkMerge } from '@/api/utils'
import { ElMessage } from 'element-plus'
import axios from 'axios'

defineProps({
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
  progress?: number
  cancelTokenSource?: any
}

interface List {
  chunkList: Chunk[]
  fileName: string
  hash: string
  uploaedProgress: number
}

const emits = defineEmits(['update:modelValue'])

const chunkList = ref<Chunk[]>([])
// const hashProgress = ref(0)
const hash = ref('') // 文件hash
const fileName = ref('')
const list = ref<List[]>([]) // 上传列表
const totalSize = ref(0) // 总文件大小
const uploadedSize = ref(0) // 已上传的总大小
const speed = ref(0) // 当前网速，单位可以是字节/秒

let startTime: number | null = null // 开始上传的时间戳
const intervalTimer = ref<any>(null)

// 处理文件变化
const handleChange = async (file: UploadFile) => {
  totalSize.value += file.size || 0
  const chunks = createFileChunk(file.raw as File)
  hash.value = await calculationChunksMd5(chunks)
  fileName.value = file.name || file.raw?.name || ''
  const extension = fileName.value.split('.').pop()
  chunkList.value = chunks.map((chunk, index) => {
    return {
      chunk,
      chunkFileName: `${index}_${hash.value}.${extension}`,
      index,
      hash: hash.value,
      cancelTokenSource: axios.CancelToken.source(), // 初始化取消令牌源
    }
  })
  list.value.push({
    chunkList: chunkList.value,
    fileName: fileName.value,
    hash: hash.value,
    uploaedProgress: 0,
  })
}

// 确定上传
const uploadFiles = async () => {
  startTime = Date.now() // 记录开始上传时间
  intervalTimer.value = setInterval(() => {
    // 计算上传速度
    if (startTime !== null && uploadedSize.value > 0) {
      const elapsedTime = (Date.now() - startTime) / 1000 // 已经过的时间（秒）
      speed.value = uploadedSize.value / elapsedTime // 计算上传速度（字节/秒）
    }
  }, 1000) // 每秒更新一次
  // 多选上传列表
  list.value.forEach(async item => {
    await uploadFile(item)
  })
}

// 上传逻辑
const uploadFile = async (item: List) => {
  let uploadedCount = 0 // 已上传的切片数量
  const totalChunks = item.chunkList.length // 总切片数量
  const requestChunks = item.chunkList.map(({ chunk, chunkFileName, hash, cancelTokenSource }: Chunk) => {
    return () => {
      const formData = new FormData()
      formData.append('file', chunk)
      formData.append('fileName', chunkFileName)
      formData.append('hash', hash)
      return request.post('/utils/uploads/chunk', formData, {
        cancelToken: cancelTokenSource.token, // 传递取消令牌
        onUploadProgress: function (progressEvent: ProgressEvent) {
          // 切片上传成功时更新已上传的切片数量
          if (progressEvent.loaded === progressEvent.total) {
            uploadedCount++
            const totalProgress = Math.floor((uploadedCount / totalChunks) * 100) // 计算总进度
            item.uploaedProgress = totalProgress
            uploadedSize.value += progressEvent.loaded // 更新已上传大小
          }
        },
      } as any)
    }
  })
  try {
    await limitConcurrency(requestChunks, 5)
    const res = await uploadChunkMerge({ hash: item.hash, fileName: item.fileName })
    ElMessage.success('上传成功')
    intervalTimer.value = null
    emits('update:modelValue', res.data.url)
  } catch (error) {
    ElMessage.error('上传失败')
  }
}

// 限制并发数
const limitConcurrency = async (requestList: any[] = [], limit: number = 3) => {
  return new Promise(resolve => {
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
const abortUpload = (item: List) => {
  item.chunkList.forEach(chunk => {
    chunk.cancelTokenSource.cancel('用户取消上传')
  })
  ElMessage.info('上传已取消')
}

// 暂停上传
const pauseUpload = (item: List) => {
  item.chunkList.forEach(chunk => {
    chunk.cancelTokenSource.cancel('用户暂停上传')
  })
  ElMessage.info('上传已暂停')
}
</script>

<style lang="scss" scoped></style>

<style lang="scss" scoped></style>
