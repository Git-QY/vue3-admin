<template>
  <div class="layout-box">
    <el-tooltip effect="dark" content="纵向" placement="top" :show-after="200">
      <div :class="['layout-item layout-vertical', { 'is-active': layout == 'vertical' }]" @click="setLayout('vertical')">
        <div class="layout-dark"></div>
        <div class="layout-container">
          <div class="layout-light"></div>
          <div class="layout-content"></div>
        </div>
        <el-icon v-if="layout == 'vertical'">
          <CircleCheckFilled />
        </el-icon>
      </div>
    </el-tooltip>
    <el-tooltip effect="dark" content="分栏" placement="top" :show-after="200">
      <div :class="['layout-item layout-columns', { 'is-active': layout == 'columns' }]" @click="setLayout('columns')">
        <div class="layout-dark"></div>
        <div class="layout-light"></div>
        <div class="layout-content"></div>
        <el-icon v-if="layout == 'columns'">
          <CircleCheckFilled />
        </el-icon>
      </div>
    </el-tooltip>
    <el-tooltip effect="dark" content="经典" placement="top" :show-after="200">
      <div :class="['layout-item layout-classic', { 'is-active': layout == 'classic' }]" @click="setLayout('classic')">
        <div class="layout-dark"></div>
        <div class="layout-container">
          <div class="layout-light"></div>
          <div class="layout-content"></div>
        </div>
        <el-icon v-if="layout == 'classic'">
          <CircleCheckFilled />
        </el-icon>
      </div>
    </el-tooltip>
    <el-tooltip effect="dark" content="横向" placement="top" :show-after="200">
      <div :class="['layout-item layout-horizontal', { 'is-active': layout == 'horizontal' }]" @click="setLayout('horizontal')">
        <div class="layout-dark"></div>
        <div class="layout-content"></div>
        <el-icon v-if="layout == 'horizontal'">
          <CircleCheckFilled />
        </el-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useGlobalStore } from '@/store'
const globalStore = useGlobalStore()
const layout = computed(() => globalStore.layout)
// 布局切换
const setLayout = (value: any) => globalStore.setGlobalState('layout', value)
</script>

<style lang="scss" scoped>
/** 布局css */
.layout-box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px 7px 0;
  .layout-item {
    position: relative;
    box-sizing: border-box;
    width: 100px;
    height: 70px;
    padding: 6px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px var(--el-border-color-dark);
    transition: all 0.2s;
    .layout-dark {
      background-color: var(--el-color-primary);
      border-radius: 3px;
    }
    .layout-light {
      border-radius: 3px;
    }
    .layout-content {
      border-radius: 3px;
    }
    .el-icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: var(--el-color-primary);
      transition: all 0.2s;
    }
    &:hover {
      box-shadow: 0 0 5px 1px var(--el-text-color-secondary);
    }
  }
  .is-active {
    box-shadow: 0 0 0 2px var(--el-color-primary) !important;
  }
  .layout-vertical {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .layout-dark {
      width: 20%;
    }
    .layout-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 72%;
      .layout-light {
        height: 20%;
      }
      .layout-content {
        height: 67%;
      }
    }
  }
  .layout-columns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .layout-dark {
      width: 14%;
    }
    .layout-light {
      width: 17%;
    }
    .layout-content {
      width: 55%;
    }
  }
  .layout-classic {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
    .layout-dark {
      height: 22%;
    }
    .layout-container {
      display: flex;
      justify-content: space-between;
      height: 70%;
      .layout-light {
        width: 20%;
      }
      .layout-content {
        width: 70%;
      }
    }
  }
  .layout-horizontal {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 15px;
    .layout-dark {
      height: 20%;
    }
    .layout-content {
      height: 67%;
    }
  }
}
</style>
