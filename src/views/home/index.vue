<template>
  <div class="workbench">
    <el-dropdown>
      <el-icon class="workbench-setting"><Setting /></el-icon>
      <template #dropdown>
        <div class="workbench-header">
          <VueDraggableNext v-model="viewList" class="workbench-list" @end="onEnd">
            <transition-group>
              <div class="workbench-list--item" :active="item.id == layout.id" v-for="(item, index) in viewList" :key="index" @click="onClick(item)">
                <Icon name="Operation" style="cursor: move" />
                <div v-expandText="{ maxLines: 1, maxWidth: '200px' }">{{ item.viewName }}</div>
                <Icon name="Edit" @click="onEdit(item.id)" />
              </div>
            </transition-group>
            <div class="workbench-list--item workbench-add" @click="onAdd">添加视图</div>
          </VueDraggableNext>
        </div>
      </template>
    </el-dropdown>
    <grid-layout :layout.sync="showModuleList" :col-num="24" :row-height="10" :margin="[16, 16]">
      <grid-item
        style="touch-action: none"
        :static="true"
        v-for="it in showModuleList"
        :x="it.x"
        :y="it.y"
        :w="it.w"
        :h="it.h"
        :i="it.i"
        class="griditem"
      >
        <component :is="LayoutComponent[it.i]" :preview="true"></component>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts" setup>
import { VueDraggableNext } from 'vue-draggable-next'
import { listLayout, Layout, LayoutItem } from '@/api'
import { useDefault } from './default.ts'
import { Setting } from '@element-plus/icons-vue'
const router = useRouter()
const { LayoutComponent, defaultView, userId } = useDefault()
const viewList = ref<Layout[]>([])
const layout = ref<Layout>({ moduleList: [], userId, viewName: '' })

const getViewList = async () => {
  try {
    const res = await listLayout({ userId })
    viewList.value = res.data.length == 0 ? [defaultView] : res.data
    layout.value = viewList.value[0]
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getViewList()
})

const onAdd = () => {
  router.push('/layout/edit')
}
const onEdit = (id: string = '') => {
  router.push(`/layout/edit?id=${id}`)
}
const onEnd = (_id: string) => {
  console.log('排序后面开发')
}
const onClick = (item: Layout) => {
  layout.value = item
}

const showModuleList = computed(() => layout.value.moduleList.filter((item: LayoutItem) => item.display))
</script>

<style lang="scss" scoped>
@import url(./index.scss);
</style>
