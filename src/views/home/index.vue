<template>
  <div class="view-head">
    <VueDraggableNext v-model="viewList" @end="onEnd">
      <transition-group class="viwe-list">
        <div class="viwe-list--item" :class="{ active: activeId === item.id }" @click="changeView(item)" v-for="item in viewList" :key="item.id">
          <Icon name="Operation" style="cursor: move" />
          <div :title="item.viewName">{{ item.viewName }}</div>
          <Icon name="Edit" @click="onEdit(item.id)" />
        </div>
      </transition-group>
    </VueDraggableNext>
    <span class="viwe-add" @click="onAdd"> <i class="el-icon-setting">添加视图</i> </span>
  </div>

  <grid-layout :layout.sync="activeView" :col-num="24" :row-height="10" :margin="[16, 16]">
    <grid-item v-for="it in activeView" :x="it.x" :y="it.y" :w="it.w" :h="it.h" :i="it.i" :static="true" :key="it.i" class="griditem">
      <component :is="LayoutComponent[it.i]"></component>
    </grid-item>
  </grid-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { listLayout, addLayout, Layout, LayoutItem } from '@/api'
import { useRouter } from 'vue-router'
import { useDefault } from './default.ts'
const { LayoutComponent, defaultView, userId } = useDefault()

onMounted(() => {
  getViewList()
})
const getViewList = async () => {
  const res = await listLayout({ userId })
  if (res.data.length == 0) {
    const data = await addLayout({ ...defaultView })
    activeId.value = data.data.id
    activeView.value = data.data.moduleList
    viewList.value = data.data
  } else {
    activeId.value = res.data[0].id
    activeView.value = res.data[0].moduleList
    viewList.value = res.data
  }
}

const viewList = ref<Layout[]>([])
const activeId = ref<string>('')
const activeView = ref<LayoutItem[]>([])
const router = useRouter()
const onEnd = () => console.log('onEnd')
const changeView = item => {
  activeId.value = item.id
}
const onEdit = (id: string) => {
  router.push(`/layout/edit?id=${id}`)
}
const onAdd = () => {
  router.push('/layout/edit')
}
</script>

<style lang="scss" scoped>
.viwe-list {
  display: flex;
  justify-content: flex-start;
  // display: inline-block;
  padding: 2px;
  height: 32px;
  background-color: #045ec2;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 3px;

  &--item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    width: 120px;
    height: 32px;
    line-height: 32px;
    margin-right: 4px;
    overflow: hidden;
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;

    border-radius: 4px;
    background: #e7e7e7;
    color: #000;

    > div {
      text-align: center;
      // display: inline-block;
      // width: 75%;
      overflow: hidden;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .icon-edit {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .layout-icon {
      opacity: 0;
    }
    &:hover {
      background-color: var(--primary);
      color: #fff;
      .layout-icon {
        opacity: 1;
      }
    }
    &:last-child {
      margin: 0;
    }
  }
  .active {
    background-color: #fff;
    color: var(--primary);
    cursor: pointer;
    text-align: left;
  }
}
.viwe-add {
  font-size: 14px;
  display: inline-block;
  background-color: #045ec2;
  height: 32px;
  width: 90px;
  text-align: center;
  line-height: 32px;
  color: #ffffff;
  margin-left: 15px;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background: #e7e7e7;
    color: #000;
  }
}
.view-head {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
