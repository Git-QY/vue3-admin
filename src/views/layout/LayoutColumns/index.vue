<template>
  <!-- 分栏布局 -->
  <div class="layout layout-columns">
    <div class="layout-column">
      <div class="layout-column--logo">
        <img src="~@/assets/svgs/logo1.svg" style="height: 32px" />
      </div>
      <div
        v-for="item in menuList"
        :key="item.path"
        class="layout-column--item"
        :class="{ 'is-active': columnActive === item.path || `/${columnActive.split('/')[1]}` === item.path }"
        @click="handleSubMenu(item)"
      >
        <el-icon><svg-icon :iconName="item.icon" /></el-icon>
        <p>{{ item.menuName }}</p>
      </div>
    </div>
    <div v-if="subMenuList.length > 0" class="layout-columns--aside">
      <Aside :menuList="subMenuList"></Aside>
    </div>
    <div class="layout-columns--main">
      <Header />
      <NavTab />
      <Main />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store'
import { Menu } from '@/api'
import Header from '../components/header/index.vue'
// import Logo from '../components/logo/index.vue'
import Main from '../components/main/index.vue'
import NavTab from '../components/navTab/index.vue'
import Aside from '../components/aside/index.vue'
const router = useRouter()
const authStore = useAuthStore()
const menuList = computed(() => {
  return authStore.permissionsMenus.filter((item: Menu) => item.parentId == '0').sort((a: Menu, b: Menu) => a.sort - b.sort) as Menu[]
})
const columnActive = ref('')
const subMenuList = ref<Menu[]>([]) // 当前目录下级目录

const handleSubMenu = (item: Menu) => {
  columnActive.value = item.path
  subMenuList.value = authStore.permissionsMenus.filter((menu: Menu) => menu.parentId == item.id) || []
  if (subMenuList.value.length == 0) router.push(item.path)
}
</script>

<style lang="scss" scoped></style>
