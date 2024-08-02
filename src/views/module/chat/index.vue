<template>
  <div>聊天室</div>
</template>

<script lang="ts" setup>
import io from 'socket.io-client'
import { useUserStore } from '@/store'
import { loadScript } from '@/utils'
const userStore = useUserStore()

loadScript('http://localhost:30001/socket.io/socket.io.js')
  .then(res => {
    console.log(res)
    const socket = io('http://localhost:30001', {
      extraHeaders: {
        token: userStore.token,
      },
    })
    socket.on('connect', () => {
      console.log('socket连接成功')
    })
  })
  .catch(err => {
    console.log('err', err)
  })

// 创建socket实例
// const socket = io('http://localhost:30001', {
//   extraHeaders: {
//     token: userStore.token,
//   },
// })
// socket.on('connect', data => {
//   console.log('socket连接成功')
// })
</script>

<style lang="scss" scoped></style>
