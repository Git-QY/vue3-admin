<template>
  <el-sub-menu popper-class="pop-menu" v-if="hasChildren" :index="item.path">
    <template #title>
      <el-icon> <svg-icon :iconName="`icon-${item.icon}`" color="var(--text-color)" /></el-icon>
      <span>{{ item.menuName }}</span>
    </template>
    <aside-item v-for="childItem in item.children" :item="childItem"></aside-item>
  </el-sub-menu>
  <el-menu-item v-else :index="item.path">
    <el-icon> <svg-icon :iconName="`icon-${item.icon}`" color="var(--text-color)" /></el-icon>
    <template #title>{{ item.menuName }}</template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  item: { type: Object, required: true },
})

// 计算属性，用于判断是否有子菜单
const hasChildren = computed(() => {
  return props.item.children && props.item.children.length > 0
})
</script>

<style scoped lang="scss">
svg {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
