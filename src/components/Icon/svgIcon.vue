<template>
  <svg :class="svgClass" aria-hidden="true">
    <use class="use-icon" :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>
<script setup lang="ts">
const props = defineProps({
  iconName: {
    type: String,
    default: 'icon-jiekouwendang',
  },
  className: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#838d94',
  },
  size: {
    type: Number,
    default: 16,
  },
})
// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`
})
// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})
const SIZE = computed(() => {
  return props.size + 'px'
})
</script>
<style scoped>
.svg-icon {
  width: v-bind('SIZE');
  height: v-bind('SIZE');
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
