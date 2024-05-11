import { createPinia } from 'pinia'
const pinia = createPinia()
// pinia-plugin-persistedstate 插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)
export { useUserStore } from './models/user'
export { useGlobalStore } from './models/global'
export { useAuthStore } from './models/auth'
export { useNavTabStore } from './models/navTab'

export default pinia
