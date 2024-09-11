<template>
  <el-tooltip :content="icons[currentIndex].tip">
    <el-icon @click="handleSwitch"> <svg-icon :iconName="icons[currentIndex].icon" :size="20" /> </el-icon>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/store'
import useTheme from '@/hooks/themeColor'

const icons = [
  { value: 'light', label: 'light', icon: 'icon-taiyang', tip: '明亮' },
  { value: 'dark', label: 'dark', icon: 'icon-yueliang', tip: '暗黑' },
  { value: 'auto', label: 'auto', icon: 'icon-gensuixitong', tip: '跟随系统' },
]
const globalStore = useGlobalStore()
const { setTheme, isDark } = useTheme()

const index = computed(() => icons.findIndex(item => item.value === globalStore.theme))
const currentIndex = ref(index.value)
const changeTheme = () => {
  currentIndex.value = (currentIndex.value + 1) % icons.length
  globalStore.setGlobalState('theme', icons[currentIndex.value].value)
  setTheme(icons[currentIndex.value].value) // 设置主题
}

// 暗黑主题和明亮主题切换
const handleSwitch = async (event: MouseEvent) => {
  const anydocument: any = document
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const transition = anydocument?.startViewTransition(() => changeTheme())
  await transition.ready
  const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
  anydocument.documentElement.animate(
    { clipPath: isDark.value ? clipPath : [...clipPath].reverse() },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: isDark.value ? '::view-transition-new(root)' : '::view-transition-old(root)',
    },
  )
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: none;
}
::view-transition-old(root) {
  z-index: 9999;
}
::view-transition-new(root) {
  z-index: 1;
}
.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 9999;
}
</style>
