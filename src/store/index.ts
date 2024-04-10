import { createPinia } from 'pinia'
const pinia = createPinia()
// pinia-plugin-persistedstate 插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)
export default pinia