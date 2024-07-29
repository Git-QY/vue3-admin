<template>
  <div class="iframe-container">
    <!-- 加载动画 -->
    <div v-if="loading" class="loading-spinner">加载中...</div>

    <!-- Iframe元素 -->
    <iframe v-if="URL" :src="URL" @load="onLoad" @error="onError" ref="iframe" class="iframe-content" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>

<script setup lang="ts">
// 获取当前路由信息
const route = useRoute()
// 判断是否存在https和http
const isHttps = (url: any) => {
  return url.startsWith('https://') || url.startsWith('http://')
}
// 默认URL，通过路由元数据获取
const defaultUrl: any = isHttps(route.meta.isLink) ? route.meta.isLink : `${import.meta.env.VITE_API_BASE_URL}${route.meta.isLink}`

// 定义组件的props
const props = defineProps({ url: { type: String, default: '' } })

// 计算最终使用的URL，优先使用传入的props.url，否则使用默认URL
const URL = computed(() => props.url || defaultUrl)

// Iframe元素的引用
const iframe = ref<HTMLIFrameElement | null>(null)

// 加载状态
const loading = ref<boolean>(true)

// Iframe加载成功的回调函数
const onLoad = () => {
  console.log('Iframe loaded successfully')
  loading.value = false // 隐藏加载动画
}

// Iframe加载失败的回调函数
const onError = () => {
  console.error('Failed to load iframe')
  window.location.href = URL.value // 跳转到URL
}

onMounted(() => {
  if (iframe.value) {
    iframe.value.src = URL.value
  }
})
</script>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #333;
}

.iframe-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
