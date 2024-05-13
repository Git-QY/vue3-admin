<template>
  <!-- 纵向布局 -->
  <div class="layout layout-vertical">
    <el-container>
      <el-aside width="200px">
        <Logo />
        <Aside />
      </el-aside>
      <el-container>
        <el-header> <Header /><NavTab /> </el-header>
        <el-main><Main /></el-main>
      </el-container>
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

<style lang="scss" scoped></style>
