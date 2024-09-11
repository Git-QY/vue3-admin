<template>
  <el-tooltip placement="left" content="语言翻译">
    <el-dropdown @command="changeLanguage" class="my-dropdown">
      <svg-icon iconName="icon-yuyan" :size="20" color="var(--text-color)" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in languageList" :key="item.value" :command="item.value" :disabled="language === item.value">
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useGlobalStore } from '@/store'
import { LanguageType } from '@/store/interface'

const i18n = useI18n()
const globalStore = useGlobalStore()
const language = computed(() => globalStore.language)
const languageList = [
  { label: '简体中文', value: 'Chinese' },
  { label: 'English', value: 'English' },
  { label: '한국어', value: 'Korean' },
  { label: '日本語', value: 'Japanese' },
]

const changeLanguage = (lang: string) => {
  i18n.locale.value = lang
  globalStore.setGlobalState('language', lang as LanguageType)
}
</script>

<style lang="scss" scoped></style>
