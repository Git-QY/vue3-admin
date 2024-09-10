<template>
  <Iframe :url="defaultUrl" :key="defaultUrl"></Iframe>
</template>

<script lang="ts" setup>
import Iframe from '@/components/Page/iframe.vue'
const route = useRoute()
// 判断是否存在https和http
const isHttps = (url: any) => {
  return url.startsWith('https://') || url.startsWith('http://')
}
const defaultUrl = ref<any>('')
// 监听route
watch(
  () => route.path,
  () => {
    defaultUrl.value = isHttps(route.meta.isLink) ? route.meta.isLink : `${import.meta.env.VITE_API_BASE_URL}${route.meta.isLink}`
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped></style>
