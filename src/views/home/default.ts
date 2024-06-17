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
    id: 'default',
    viewName: '默认视图',
    userId: userInfo.id,
    moduleList: [
      { name: '项目动态', x: 0, y: 0, w: 12, h: 12, i: 'ProjectDynamics', display: false },
      { name: '3D模型', x: 0, y: 0, w: 12, h: 12, i: 'Threejs', display: false },
      { name: '模型1', x: 0, y: 0, w: 2, h: 2, i: 'Model1', display: false },
      { name: '模型2', x: 0, y: 0, w: 2, h: 2, i: 'Model2', display: false },
      { name: '模型3', x: 0, y: 0, w: 2, h: 2, i: 'Model3', display: false },
      { name: '模型4', x: 0, y: 0, w: 2, h: 2, i: 'Model4', display: false },
      { name: '模型5', x: 0, y: 0, w: 2, h: 2, i: 'Model5', display: false },
    ],
  }
  onMounted(() => {})
  return {
    defaultView,
    LayoutComponent,
    userId: (userInfo.id || '') as string,
  }
}
