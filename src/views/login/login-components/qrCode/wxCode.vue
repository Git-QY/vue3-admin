<template>
  <div class="wx-qrcode" v-loading="loading">
    <!-- 使用微信登录 -->
    <div id="login_container" v-show="!loading"></div>
  </div>
</template>

<script lang="ts" setup>
import { wechatLogin } from '@/api/user'
import { loadScript } from '@/utils'
import { ref } from 'vue'
import { LoginProvide } from '../interface'
const loginConfig = inject<LoginProvide>('loginConfig')
const wxlogin = ref<any>(null)
const appid = 'wxc181285048632446'
const callBackUrl = `https://mp.infocloud.com.cn/wechat.html` // 登录回调地址(公司)
const loading = ref(false)
const getCode = async () => {
  loading.value = true
  await loadScript('https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js')
  wxlogin.value = new (window as any).WxLogin({
    self_redirect: true,
    id: 'login_container',
    appid: appid,
    scope: 'snsapi_login',
    redirect_uri: encodeURIComponent(callBackUrl),
    state: Math.ceil(Math.random() * 1000),
    style: 'black',
    href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4O21hcmdpbi10b3A6MH0KLnN0YXR1c19pY29uIHtkaXNwbGF5OiBub25lfQ==',
  })
  var wechatIframe: any = document.querySelector('iframe')
  wechatIframe.width = '320'
  wechatIframe.height = '320'

  if (wechatIframe) {
    wechatIframe.addEventListener('load', () => {
      console.log('wechatIframe load')
      loading.value = false
    })
  }
}
// 获取code和state登录拿到openId 去登录 没有默认创建账号 如果有直接登录 返回对应的token
const login = async (data: any) => {
  try {
    const res = await wechatLogin(data)
    loginConfig?.loginSuccess(res)
  } catch (error: any) {
    loginConfig?.loginFailure(error)
  }
}
const messageHandler = (event: any) => {
  let { data } = event
  login(data.login)
}
onMounted(() => {
  // 获取微信登录二维码
  getCode()
  // 通过postMessage获取回调信息
  window.addEventListener('message', messageHandler)
})
onUnmounted(() => {
  window.removeEventListener('message', messageHandler)
})
</script>

<style lang="scss" scoped>
// 扫码
.wx-qrcode {
  width: 320px;
  height: 320px;
}
</style>
