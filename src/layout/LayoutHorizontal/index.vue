<template>
  <!-- 纵向布局 -->
  <div class="layout layout-horizontal">
    <el-container>
      <el-header><Logo /> <Aside mode="horizontal" /> <Header /></el-header>
      <el-main> <NavTab /> <Main /> </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/header/index.vue'
import Logo from '../components/logo/index.vue'
import Aside from '../components/aside/index.vue'
import Main from '../components/main/index.vue'
import NavTab from '../components/navTab/index.vue'
</script>

<style lang="scss"></style>
