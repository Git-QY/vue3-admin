<template>
  <img v-for="url in urls" :src="getFileImage(url)" alt="file image" :style="{ width: `${width}px`, height: `${height}px` }" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getAssetsImge } from '@/utils'
// 引入图片资源
// import PDF from '@/assets/image/fileType/pdf.png'
// import TXT from '@/assets/image/fileType/txt.png'
// import DOC from '@/assets/image/fileType/doc.png'
// import XLS from '@/assets/image/fileType/xls.png'
// import PPT from '@/assets/image/fileType/ppt.png'
// import ZIP from '@/assets/image/fileType/zip.png'
// import MUSIC from '@/assets/image/fileType/music.png'
// import VIDEO from '@/assets/image/fileType/video.png'
// import UNKNOWN from '@/assets/image/fileType/unknown.png'
const props = defineProps({
  data: { type: [String, Array] },
  width: { type: Number, default: 50 },
  height: { type: Number, default: 50 },
})
// 计算属性
const urls = computed(() => {
  if (!props.data) return []
  if (Array.isArray(props.data)) {
    return props.data
  } else {
    return [props.data]
  }
})
const getFileImage = (url: string): string => {
  if (url.endsWith('.pdf')) {
    return getAssetsImge('images/fileType/pdf.png')
  } else if (url.endsWith('.doc') || url.endsWith('.docx')) {
    return getAssetsImge('images/fileType/doc.png')
  } else if (url.endsWith('.xls') || url.endsWith('.xlsx')) {
    return getAssetsImge('images/fileType/xls.png')
  } else if (url.endsWith('.txt')) {
    return getAssetsImge('images/fileType/txt.png')
  } else if (url.endsWith('.zip') || url.endsWith('.rar')) {
    return getAssetsImge('images/fileType/zip.png')
  } else if (url.endsWith('.mp3') || url.endsWith('.wav') || url.endsWith('.wma')) {
    return getAssetsImge('images/fileType/music.png')
  } else if (url.endsWith('.mp4') || url.endsWith('.avi') || url.endsWith('.rmvb')) {
    return getAssetsImge('images/fileType/video.png')
  } else if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.gif')) {
    return url
  } else {
    return getAssetsImge('images/fileType/unknown.png')
  }
}
</script>
