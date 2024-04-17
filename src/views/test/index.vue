<template>
  <div>
    <p>测试上传接口</p>
    <!-- <input type="file" ref="file" @change="onChangeFile" /> -->
    <p>测试切片上传接口</p>
    <input type="file" ref="file" @change="onChangeFile" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import request from '@/utils/request'
import { createFileChunk, calculationChunksMd5 } from '@/utils/upload'

const file = ref<HTMLInputElement | null>(null)
const onChangeFile = (e: any) => {
  const formData = new FormData()
  formData.append('file', e.target.files[0])
  request.post('/utils/upload', formData).then(res => {
    console.log(res)
  })
}
// const onChangeFile = async (e: any) => {
//   const file = e.target.files[0]
//   if (!file) return
//   const chunks = createFileChunk(file)
//   const fileHash = await calculationChunksMd5([file])
//   // 上传切片
//   await Promise.all(
//     chunks.map(async (chunk, index) => {
//       const formData = new FormData()
//       formData.append('chunk', chunk)
//       formData.append('fileHash', fileHash)
//       formData.append('chunkHash', `${fileHash}-${index}`)
//       return request({
//         method: 'post',
//         url: '/utils/chunk-upload',
//         data: formData,
//       })
//     }),
//   ).then(res => {
//     request({
//       method: 'post',
//       url: '/utils/chunk-merge',
//       data: {
//         fileHash,
//         fileName: file.name,
//       },
//     }).then(res => {
//       console.log(res)
//     })
//   })
//   console.log('上传成功')
// }
</script>

<style lang="scss" scoped></style>
