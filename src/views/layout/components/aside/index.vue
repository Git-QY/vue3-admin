<template>
  <div class="layout-aside" :class="{ 'layout-aside--collapse': isCollapse }">
    <el-menu router :mode="mode" :collapse="isCollapse" active-text-color="var(--primary)" :default-active="activePath" :collapse-transition="false" popper-class="pop-menu">
      <template v-for="item in menuList">
        <aside-item :item="item"></aside-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import asideItem from './aside-item.vue'
import { useGlobalStore, useAuthStore } from '@/store'
import { useRouter } from 'vue-router'
const props = defineProps({
  menuList: { type: Array, default: () => [] },
  mode: { type: String, default: 'vertical' },
})
const globalStore = useGlobalStore()
const authStore = useAuthStore()
const router = useRouter()
const activePath = computed(() => router.currentRoute.value.path)
const isCollapse = computed(() => globalStore.isCollapse)
const menuList = computed(() => {
  if (props.menuList.length === 0) {
    return authStore.getLeftMenuTree()
  } else {
    return props.menuList
  }
})
</script>
<style lang="scss" scoped></style>
