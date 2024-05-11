<template>
  <div class="themeColor felx-between">
    <span class="demonstration">{{ title }} {{ themeColor }}</span>
    <el-color-picker v-model="themeColor" :predefine="predefineColors" @change="changeTheme" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useTheme from '@/hooks/themeColor'

const props = defineProps({
  title: { type: String, default: '主题色' },
  type: { type: String, default: 'primary' },
})

// themeColor是存储在localStorage中的主题色
const themeColor = ref('')
const theme = useTheme()
const changeTheme = () => {
  theme.changeThemeColor(props.type, themeColor.value, '#fff')
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
