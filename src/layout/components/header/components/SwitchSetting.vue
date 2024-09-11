<template>
  <div class="switchSetting felx-between">
    <span class="demonstration">{{ title }} </span>
    <el-switch :modelValue="modelValue" @change="onChange" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '深色侧边栏' },
})

const emit = defineEmits(['change', 'update:modelValue'])
const onChange = (val: boolean) => {
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style lang="scss" scoped>
.switchSetting {
  span {
    height: 32px;
    line-height: 32px;
  }
}
</style>
