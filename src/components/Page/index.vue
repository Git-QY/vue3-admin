<template>
  <div class="page-main" v-show="isShow">
    <slot></slot>
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
const route = useRoute()
const props = defineProps({ main: String })
const isShow = computed(() => props.main == route.path)
</script>

<style scoped lang="scss"></style>
