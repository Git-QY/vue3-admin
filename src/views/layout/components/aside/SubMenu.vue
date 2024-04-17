<template>
  <el-sub-menu v-if="item && item.children?.length > 0" :index="item.path">
    <template #title>
      <component class="icons" :is="item.icon"></component>
      <span>{{ item.name }}</span>
    </template>
    <div v-for="(child, index) in item.children" :key="index">
      <sub-menu v-if="child.children?.length > 0" :item="child" />
      <MenuItem v-else :item="child" />
    </div>
  </el-sub-menu>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import MenuItem from './MenuItem.vue'

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
