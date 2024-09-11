//  抽取table
import { useUserStore } from '@/store'
import { Layout } from '@/api'
import ProjectDynamics from './components/ProjectDynamics.vue'
import LoginLog from './components/LoginLog.vue'
import Threejs from './components/Threejs.vue'
import Model1 from './components/Model1.vue'
import Model2 from './components/Model2.vue'
import Model3 from './components/Model3.vue'
import Model4 from './components/Model4.vue'
import Model5 from './components/Model5.vue'
import Swiper from './components/Swiper.vue'

export function useDefault() {
  const { userInfo } = useUserStore()
  const LayoutComponent: Record<string, Component> = {
    ProjectDynamics,
    LoginLog,
    Swiper,
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
      { name: '登录日志', x: 12, y: 0, w: 12, h: 12, i: 'LoginLog', display: true, moved: false },
      { name: '首页swiper', x: 0, y: 12, w: 12, h: 10, i: 'Swiper', display: true, moved: false },
      { name: '3D模型', x: 0, y: 22, w: 4, h: 6, i: 'Threejs', display: true, moved: false },
      { name: '模型1', x: 18, y: 17, w: 4, h: 12, i: 'Model1', display: true, moved: false },
      { name: '模型2', x: 22, y: 17, w: 2, h: 12, i: 'Model2', display: true, moved: false },
      { name: '模型3', x: 12, y: 12, w: 12, h: 5, i: 'Model3', display: true, moved: false },
      { name: '模型4', x: 12, y: 17, w: 6, h: 12, i: 'Model4', display: true, moved: false },
      { name: '模型5', x: 4, y: 22, w: 8, h: 7, i: 'Model5', display: true, moved: false },
    ],
  }
  onMounted(() => {})
  return {
    defaultView,
    LayoutComponent,
    userId: (userInfo.id || '') as string,
  }
}
