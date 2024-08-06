<template>
  <ul class="panel-content-right--body panel-content-body">
    <div v-for="(item, index) in selected" :key="index" class="item">
      <span> {{ item[name] }}</span>
      <Icon name="close" @click="onDelete(item)"></Icon>
    </div>
  </ul>
</template>

<script lang="ts" setup>
import { Item } from './index'

defineProps({
  selected: { type: Array as () => Item[], default: () => [] },
  name: { type: String, default: 'name' },
})
const $emits = defineEmits(['delete'])
const onDelete = (item: any) => $emits('delete', item)
</script>

<style lang="scss" scoped></style>
