<template>
  <div class="viewEdit">
    <el-container style="height: 100%">
      <el-header class="viewEdit-header">
        <el-input class="viewEdit-header--search" v-model="layout.viewName" placeholder="请输入内容"></el-input>
        <span class="viewEdit-header--doc">你可以对模块进行添加、拖拽、移动</span>
        <div class="viewEdit-header--tool">
          <div @click="onDel" v-if="route.query.id"><span>删除视图</span></div>
          <div @click="restoreDefault"><span>恢复默认</span></div>
          <div @click="empty(false)"><span>清空</span></div>
          <el-button type="primary" plain @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSave">保存</el-button>
        </div>
      </el-header>
      <el-container style="height: calc(100% - 60px)">
        <el-aside width="200px" class="viewEdit-sidebar">
          <div class="viewEdit-sidebar--head">
            <span>隐藏已添加模块</span>
            <el-switch v-model="display"></el-switch>
          </div>
          <div class="viewEdit-sidebar--menu">
            <div v-for="it in moduleList" class="viewEdit-sidebar--menu_item">
              <span>{{ it.name }}</span>
              <Icon :name="it.display ? 'Minus' : 'Plus'" @click="handelItem(it)" />
            </div>
          </div>
        </el-aside>
        <el-main class="viewEdit-view">
          <grid-layout :layout.sync="showModuleList" :col-num="24" :row-height="10" :margin="[16, 16]">
            <grid-item style="touch-action: none" v-for="it in showModuleList" :x="it.x" :y="it.y" :w="it.w" :h="it.h" :i="it.i" class="griditem">
              <span>{{ it.name }}</span>
              <component :is="LayoutComponent[it.i]" :preview="true"></component>
              <Icon class="el-icon-close" name="Close" @click="removeItem(it)" />
            </grid-item>
          </grid-layout>
          {{ layout }}
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { detailLayout, deleteLayout, addLayout, updateLayout, Layout, LayoutItem } from '@/api'
import { useDefault } from './default.ts'
import { deepClone } from '@/utils'
import { ElMessage } from 'element-plus'

const { LayoutComponent, defaultView, userId } = useDefault()
const route = useRoute()
const router = useRouter()
const layout = ref<Layout>({ moduleList: [], userId, viewName: '' })

// 获取视图详情
const getDetail = async () => {
  if (!route.query.id) {
    layout.value = deepClone(defaultView)
    return
  }
  const res = await detailLayout(route.query.id as string)
  layout.value = res.data
}

onMounted(() => {
  getDetail()
})

const display = ref(false) // 隐藏已添加模块 true 隐藏 false 显示
const moduleList = computed(() => (display.value ? hiddenModuleList.value : layout.value.moduleList))
const hiddenModuleList = computed(() => layout.value.moduleList.filter(item => !item.display))
const showModuleList = computed(() => layout.value.moduleList.filter(item => item.display))

const onDel = async () => {
  try {
    await deleteLayout(route.query.id as string)
    ElMessage.success('视图删除成功')
    router.push('/views') // 跳转到视图列表页
  } catch (error) {
    ElMessage.error('视图删除失败')
  }
}

const restoreDefault = () => {
  layout.value = deepClone(defaultView)
  ElMessage.success('已恢复默认视图')
}

const empty = () => {
  layout.value.moduleList = []
  ElMessage.success('已清空视图')
}

const removeItem = (item: LayoutItem) => {
  item.display = false
}

const onCancel = () => {
  getDetail() // 重新获取视图详情，恢复到编辑前的状态
  ElMessage.info('已取消编辑')
}

const onSave = async () => {
  try {
    if (route.query.id) {
      await updateLayout(layout.value)
    } else {
      await addLayout(layout.value)
    }

    ElMessage.success('视图保存成功')
    router.go(-1)
  } catch (error) {
    ElMessage.error('视图保存失败')
  }
}

// 总宽度
const totalWidth = 24
const handelItem = (item: LayoutItem) => {
  // 堆放规则
  item.display = !item.display
  if (item.display) return
}
</script>

<style lang="scss" scoped>
.viewEdit {
  height: 100vh;

  &-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    line-height: 60px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.07);

    &--search {
      height: 40px;
      margin: 0 10px;
      width: 180px;
      border-radius: 3px;
    }

    &--tool {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .el-button {
        height: 32px;
        width: 74px;
        margin-right: 15px;
      }

      div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 20px;
        font-size: 14px;
        cursor: pointer;
      }
    }

    &--doc {
      color: #c8c8c8;
    }
  }

  &-sidebar {
    &--head {
      height: 60px;
      color: #c8c8c8;
      font-size: 14px;
      border-bottom: 1px solid #e5e6eb;
      line-height: 60px;
      padding-left: 20px;

      .el-switch {
        margin-left: 18px;
      }
    }

    &--menu {
      padding: 20px;

      &_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        font-size: 13px;

        i {
          color: var(--primary);
          font-weight: 700;
        }
      }
    }
  }

  &-view {
    background-color: #f4f5f6;
    height: 100%;
    overflow: auto;
    padding: 0;
  }

  .griditem {
    background-color: #fff;
    border-radius: 4px;
    overflow: visible;
    border: 1px solid transparent;

    .el-icon-close {
      font-size: 14px;
      position: absolute;
      top: -8px;
      right: -8px;
      width: 20px;
      height: 20px;
      background: #80838f;
      border-radius: 50%;
      opacity: 0.8;
      color: #fff;
      line-height: 20px;
      text-align: center;
      opacity: 0;
      box-sizing: border-box;
    }

    &:hover {
      box-sizing: border-box;

      .el-icon-close {
        opacity: 1;
      }
    }
  }
}

.vue-grid-layout {
  ::v-deep(.vue-grid-item.vue-grid-placeholder) {
    border: 1px dashed #020814;
    background: #f4f5f6;
    opacity: 0.2;
    transition-duration: 100ms;
    z-index: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
}
</style>
