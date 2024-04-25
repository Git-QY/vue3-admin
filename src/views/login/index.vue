<template>
  <div class="login">
    <div class="login-img" :style="{ backgroundImage: `url(${bgImg})` }"></div>
    <Login class="login-content"></Login>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Login from './login-components/index.vue'
// api
import { getImage } from '@/api/utils'

const bgImg = ref('')
const getImg = () => {
  // bgImg.value = 'https://api.likepoems.com/img/mc/?json'
  getImage().then(res => {
    console.log(res)
    bgImg.value = res.url
  })
}
onMounted(() => {
  getImg()
})
</script>
<style lang="scss">
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
  &-img {
    width: 70%;
    height: 100%;
  }
  &-content {
    flex: 1;
  }
}
</style>
