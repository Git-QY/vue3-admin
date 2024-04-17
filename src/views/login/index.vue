<template>
  <div class="login-bg">
    <Login></Login>
  </div>
</template>

<script setup lang="ts">
import Login from './login-components/index.vue'
</script>
<style lang="scss">
.login-bg {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  // &-bg {
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  //   background-size: cover;
  //   background-color: green;
  //   z-index: -1;
  // }
  // .login-box {
  //   position: absolute;
  //   top: 40%;
  //   right: 50px;
  // }
  // &-footer {
  //   position: absolute;
  //   left: 10px;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   writing-mode: vertical-lr;
  //   text-align: center;
  //   font-size: 14px;
  // }
}
</style>
