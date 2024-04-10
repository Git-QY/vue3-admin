<template>
  <div class="login">
    <Login></Login>
  </div>
</template>

<script setup lang="ts">
import Login from './login-components/index.vue'
</script>
<style lang="scss">
.login {
  position: relative;
  height: 100vh;
  &-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    z-index: -1;
  }
  .login-box {
    position: absolute;
    top: 40%;
    right: 50px;
  }
  &-footer {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    writing-mode: vertical-lr;
    text-align: center;
    font-size: 14px;
  }
}
</style>
