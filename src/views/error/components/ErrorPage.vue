<template>
  <div class="error-page">
    <section class="container">
      <div class="img-box">
        <img class="img-parent" :src="props.src" />
      </div>

      <div class="tip-box">
        <div class="ops">抱歉!</div>
        <div class="tip">当前页面不存在...</div>
        <div class="info">请检查您输入的网址是否正确，或点击下面的按钮返回首页</div>
        <el-button type="primary" shape="round" size="large" @click="back">{{ countDownTime }} 返回首页</el-button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
}
const props = withDefaults(defineProps<Props>(), {
  src: '',
})

defineOptions({ name: 'ErrorPage' })
const router = useRouter()

const countDownTime = ref(5)
let timer: NodeJS.Timer | any // 定时器

onMounted(() => {
  onCountDownTime()
})

onBeforeUnmount(() => {
  clearInterval(timer)
})

// 返回页面
const back = () => {
  router.replace({ path: '/' })
}

// 倒计时
const onCountDownTime = () => {
  timer = setInterval(() => {
    if (countDownTime.value) {
      countDownTime.value--
    } else {
      back()
      clearInterval(timer)
    }
  }, 1000)
}
</script>

<style lang="scss" scoped>
.error-page {
  width: 100%;
  height: 100%;
  background: var(--color-bg-1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .img-box {
    width: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .img-parent {
      max-width: 90%;
      height: 50vh;
    }
    .img-child {
      position: absolute;
    }
  }
  .tip-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .ops {
      margin-bottom: 20px;
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: rgb(var(--primary-6));
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    .tip {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
      line-height: 24px;
      color: var(--color-text-1);
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    .info {
      padding: 0 30px;
      margin-bottom: 20px;
      font-size: 13px;
      text-align: center;
      line-height: 20px;
      color: var(--color-text-2);
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        opacity: 0;
        transform: translateY(60px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>
