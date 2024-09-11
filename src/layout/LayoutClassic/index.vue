<template>
  <!-- 经典布局 -->
  <div class="layout layout-classic">
    <el-container>
      <el-header>
        <Logo />
        <Header />
      </el-header>
      <el-container>
        <el-aside><Aside /></el-aside>
        <el-main><NavTab /> <Main /></el-main>
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

<style lang="scss"></style>
