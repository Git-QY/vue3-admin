<template>
  <div class="qy-login">
    <div class="login-logo">logo</div>
    <component :is="pane"></component>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw, provide } from 'vue'
import login from './login.vue'
import forget from './forget.vue'
import register from './register.vue'
// markRaw 标记为原始类型，不做任何处理
let pane = ref(markRaw(login))
provide('loginConfig', {
  setPane: (name: any) => {
    pane.value = getComponent(name)
  },
})

const getComponent = (name: string) => {
  const componentMap: { [key: string]: any } = {
    login,
    forget,
    register,
  }
  return markRaw(componentMap[name] || login)
}
</script>
<style lang="scss">
@import './index.scss';
</style>
