<template>
  <div class="layout-frame-main">
    <div class="layout-frame--mask" v-if="loading"><img :src="gif" width="128" /></div>
    <iframe frameborder="0" ref="frame" @error="onError" :src="iframeUrl" :id="pageId" width="100%" height="100%"></iframe>
  </div>
</template>

<script lang="ts" setup>
import gif from '@/assets/images/loader-light.gif'
import { useElementUI } from '@/hooks/useMessage'
const { showMessage } = useElementUI()
const props = defineProps<{ url: string }>()
const loading = ref<Boolean>(true)
const frame = ref<HTMLIFrameElement | null>(null)
const iframeUrl = ref<string>('about:blank')
const pageId = computed(() => `page-${props.url}`)
const loadFrame = () => {
  loading.value = true
  if (!props.url) return showMessage('场景地址不正确，请联系管理员', 'warning')
  // frame.value.src = 'about:blank'
  iframeUrl.value = 'about:blank'
  nextTick()
  setTimeout(() => {
    // frame.value.src = props.url
    iframeUrl.value = props.url
  }, 100)
  if (!frame.value) return (loading.value = false)
  // 兼容处理
  if (frame.value?.addEventListener) {
    frame.value?.addEventListener('load', () => (loading.value = false)) // IE
  } else {
    frame.value.onload = () => (loading.value = false) // 非IE
  }
}
const onError = () => {
  //   loading.value = false
}
onMounted(() => {
  loadFrame()
})
</script>

<style lang="scss" scoped>
.layout-frame-main {
  height: 100%;
  .layout-frame--mask {
    width: 100%;
    height: 100%;
    position: relative;
    // 白色蒙层
    background: rgba(255, 255, 255, 0.8);
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  iframe {
    display: block;
    width: 100%;
    height: 100%;
    background: #fff;
  }
}
</style>
