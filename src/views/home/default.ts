//  抽取table
import { ref, onMounted, computed, type Component } from 'vue'
import { useUserStore } from '@/store'
import { Layout } from '@/api'
import ProjectDynamics from './components/ProjectDynamics.vue'
import Threejs from './components/Threejs.vue'
import Model1 from './components/Model1.vue'
import Model2 from './components/Model2.vue'
import Model3 from './components/Model3.vue'
import Model4 from './components/Model4.vue'
import Model5 from './components/Model5.vue'

export function useDefault() {
  const { userInfo } = useUserStore()
  const LayoutComponent: Record<string, Component> = {
    ProjectDynamics,
    Threejs,
    Model1,
    Model2,
    Model3,
    Model4,
    Model5,
  }
  // 默认视图
  const defaultView: Layout = {
    viewName: '默认视图',
    userId: userInfo.id,
    moduleList: [
      { name: '项目动态', x: 0, y: 0, w: 12, h: 12, i: 'ProjectDynamics', display: true, moved: false },
      { name: '3D模型', x: 0, y: 12, w: 12, h: 12, i: 'Threejs', display: true, moved: false },
      { name: '模型1', x: 12, y: 0, w: 10, h: 16, i: 'Model1', display: true, moved: false },
      { name: '模型2', x: 22, y: 0, w: 2, h: 2, i: 'Model2', display: true, moved: false },
      { name: '模型3', x: 22, y: 2, w: 2, h: 14, i: 'Model3', display: true, moved: false },
      { name: '模型4', x: 12, y: 16, w: 3, h: 8, i: 'Model4', display: true, moved: false },
      { name: '模型5', x: 15, y: 16, w: 9, h: 8, i: 'Model5', display: true, moved: false },
    ],
  }
  onMounted(() => {})
  return {
    defaultView,
    LayoutComponent,
    userId: (userInfo.id || '') as string,
  }
}
