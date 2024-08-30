<template>
  <div class="themeColor felx-between">
    <span class="demonstration" style="line-height: 32px">主题色 {{ themeColor }}</span>
    <el-color-picker v-model="themeColor" :predefine="predefineColors" @change="changeTheme" />
  </div>
</template>

<script lang="ts" setup>
import useTheme from '@/hooks/themeColor'
import { useGlobalStore } from '@/store'

const globalStore = useGlobalStore()
// themeColor是存储在localStorage中的主题色
const themeColor = ref('')
themeColor.value = globalStore.themeColor
const theme = useTheme()
const changeTheme = () => {
  theme.setThemeColor(themeColor.value)
  globalStore.setGlobalState('themeColor', themeColor.value)
}
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
</script>

<style lang="scss" scoped></style>
