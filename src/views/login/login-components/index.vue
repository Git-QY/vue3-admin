<template>
  <div class="qy-login">
    <div class="login-logo">{{pane === forget ? '忘记密码' : pane === register ? '注册' : '登录'}}</div>
    <component :is="pane"></component>
    <footer class="footer">
      <el-divider class="divider">
        <span>其他登录方式</span>
      </el-divider>
      <div class="third-login-items">
        <div class="item" @click="giteeLogin">
          <img style="width: 100%;height: 100%;" src="@/assets/images/giteeLogo.png" alt="">
        </div>
      </div>
    </footer>
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

// 通过gitee登录
const giteeLogin = ()=>{
  console.log('e')
}
</script>
<style lang="scss" scoped>
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
  .footer{
    width: 80%;
  }
  .divider::v-deep .el-divider__text{
    color: #acadaf;
    background-color: transparent !important;
  }
  .third-login-items{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .item{
      width: 30px;
      height: 30px;
      :hover{
        cursor: pointer;
      }
    }
  }
}
</style>
