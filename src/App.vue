<template>
  <router-view></router-view>
</template>
<script lang="ts" setup>
// 设置主题色
import useTheme from '@/hooks/themeColor'
import { useGlobalStore } from '@/store'
const globalStore = useGlobalStore()
const { setThemeColor, setTheme } = useTheme()
setThemeColor(globalStore.themeColor)
setTheme(globalStore.theme)
</script>
<style lang="scss"></style>
