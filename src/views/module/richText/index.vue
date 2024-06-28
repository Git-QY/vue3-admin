<template>
  <RichText v-model="text"></RichText>
  <div>{{ text }}</div>
</template>

<script lang="ts" setup>
import RichText from '@/components/FormItem/richText.vue'
import { ref } from 'vue'
const text = ref('<p><strong>Hello! WangEditor</strong></p>')
</script>

<style lang="scss" scoped></style>
