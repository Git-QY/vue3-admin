<template>
  <router-view></router-view>
</template>
<script lang="ts" setup>
// 设置主题色
import useTheme from '@/hooks/themeColor'
import { useGlobalStore } from '@/store'
const globalStore = useGlobalStore()
const { setTheme } = useTheme()
setTheme(globalStore.themeColor)
</script>
<style lang="scss"></style>
