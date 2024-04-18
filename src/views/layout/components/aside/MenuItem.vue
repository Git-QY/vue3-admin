<template>
  <div class="menu-item-layout">
    <el-menu-item :index="item.path">
      <component class="icons" :is="item.icon"></component>
      <template #title>
        {{ item.name }}
      </template>
    </el-menu-item>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
<style lang="scss" scoped>
svg {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
