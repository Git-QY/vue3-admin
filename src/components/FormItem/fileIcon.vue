<template>
  <div :style="{ width: `${width}px`, height: `${height}px` }">
    <img v-for="url in urls" :src="getFileImage(url)" alt="file image" class="img-item" />
  </div>
</template>

<script setup lang="ts">
import { getAssetsImage } from '@/utils'
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
const getFileImage = (url: any): string => {
  if (url.endsWith('.pdf')) {
    return getAssetsImage('images/fileType/pdf.png')
  } else if (url.endsWith('.doc') || url.endsWith('.docx')) {
    return getAssetsImage('images/fileType/doc.png')
  } else if (url.endsWith('.xls') || url.endsWith('.xlsx')) {
    return getAssetsImage('images/fileType/xls.png')
  } else if (url.endsWith('.txt')) {
    return getAssetsImage('images/fileType/txt.png')
  } else if (url.endsWith('.zip') || url.endsWith('.rar')) {
    return getAssetsImage('images/fileType/zip.png')
  } else if (url.endsWith('.mp3') || url.endsWith('.wav') || url.endsWith('.wma')) {
    return getAssetsImage('images/fileType/music.png')
  } else if (url.endsWith('.mp4') || url.endsWith('.avi') || url.endsWith('.rmvb')) {
    return getAssetsImage('images/fileType/video.png')
  } else if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.gif')) {
    return url
  } else {
    return getAssetsImage('images/fileType/unknown.png')
  }
}
</script>
<style lang="scss" scoped>
.img-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
