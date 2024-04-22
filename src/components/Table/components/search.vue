<script setup lang="ts">
import { ref } from 'vue';

// 搜索关键字
const keywords = ref('')
</script>

<template>
  <div class="input-wrapper">
    <el-input 
      v-model="keywords" 
      style="width: 240px;margin-right: 10px;" 
      placeholder="请输入关键字" 
      clearable
      @clear="keywords = ''"
      />
    <el-button type="primary" @click="$emit('search', keywords)">搜索</el-button>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper{
  padding: 10px 0;
}
</style>
