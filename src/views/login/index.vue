<template>
  <div class="login">
    <div class="login-img" :style="{ backgroundImage: `url(${bgImg})` }"></div>
    <Login class="login-content"></Login>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Login from './login-components/index.vue'
const bgImg = ref('https://picui.cn//uploads/background/auth/382ae767058ba05c1eb2e6ba56cb1264.jpg')
onMounted(() => {})
</script>
<style lang="scss">
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  font-size: 18px;
  &-img {
    width: 70%;
    height: 100%;
    background-size: cover;
    background-position: 50%;
  }
  &-content {
    flex: 1;
  }
}
</style>
