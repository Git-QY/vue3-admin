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
.qy-login {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  width: 400px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-height: 400px;

  .login-logo {
    text-align: center;

    img {
      height: 40px;
      margin: 10px 0;
    }
  }
}
</style>
