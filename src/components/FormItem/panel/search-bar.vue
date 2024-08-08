<template>
  <header class="org-picker--search-bar">
    <el-input v-model="search" clearable :placeholder="placeholder" @change="onSearch" @clear="onSearch">
      <template #prefix>
        <el-icon class="el-input__icon"><Search /> </el-icon>
      </template>
    </el-input>
  </header>
</template>

<script lang="ts" setup>
defineProps({
  placeholder: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['search'])
const search = ref('')
const onSearch = () => {
  emit('search', search.value)
}
</script>

<style scoped lang="scss">
.org-picker--search-bar {
  position: relative;
  margin-bottom: 10px;
  .el-input__inner {
    border-color: #ddd;
    border-radius: 2px;
  }
  .el-input__prefix {
    color: #333;
  }
}
</style>
