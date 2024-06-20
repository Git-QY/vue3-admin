<template>
  <LargeUpload v-model="fileList" />
</template>

<script lang="ts" setup>
import LargeUpload from './components/LargeUpload.vue'
import { ref } from 'vue'
const fileList = ref([])
</script>

<style lang="scss" scoped></style>
