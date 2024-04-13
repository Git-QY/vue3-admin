<template>
  <div class="qy-login">
    <div class="login-logo">{{pane === forget ? '忘记密码' : pane === register ? '注册' : '登录'}}</div>
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
  width: 400px;
  padding: 40px 10px;
  border-radius: 16px;
  background: #f5f5f5;
  box-shadow:  5px 5px 9px #a6a6a6,
             -5px -5px 9px #ffffff;


  .login-logo {
    text-align: center;
    height: 50px;
    img {
      height: 40px;
      margin: 10px 0;
    }
  }
}
</style>
