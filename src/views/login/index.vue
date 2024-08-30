<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-img" :style="{ backgroundImage: `url(${bgImg})` }"></div>
      <Login class="login-content"></Login>
    </div>
    <footer class="login-footer">
      <div class="yiyan">{{ yiyan }}</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { getYiyan } from '@/api/utils'
import Login from './login-components/index.vue'
const bgImg = ref('https://picui.cn//uploads/background/auth/382ae767058ba05c1eb2e6ba56cb1264.jpg')
const yiyan = ref('')
onMounted(async () => {
  const res = await getYiyan()
  yiyan.value = res.data
})
</script>
<style lang="scss">
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  font-size: 18px;
  .login-img {
    width: 70%;
    height: 100%;
    background-size: cover;
    background-position: 50%;
  }
  .login-content {
    flex: 1;
  }
}
.login-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  .yiyan {
    color: #fff;
    font-size: 12px;
  }
}
</style>
