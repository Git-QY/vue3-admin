<template>
  <el-breadcrumb separator-icon="arrow-right">
    <el-breadcrumb-item v-for="item in routes" :key="item.path">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
const router = useRouter()

// 获取当前路由的匹配记录
const routes = computed(() => {
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})
</script>

<style scoped></style>
