<template>
  <div class="container">
    <div class="pain-items">
      <div
        class="pain-item"
        :active="curPainId == pain.id"
        v-for="(pain, index) in pains"
        :key="index"
        @mousemove="onMouseMove(pain)"
        @mouseleave="onMouseleave()"
      >
        <div class="pain-item-img" :style="{ backgroundImage: `url(${pain.img})` }"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const curPainId = ref('1')
const pains = ref([
  { id: '1', img: 'https://static1.weizan.cn/zhibo/static/img/vzan/pc/home/index/point1.png' },
  { id: '2', img: 'https://static1.weizan.cn/zhibo/static/img/vzan/pc/home/index/point4.png' },
  { id: '3', img: 'https://static1.weizan.cn/zhibo/static/img/vzan/pc/home/index/point2.png' },
  { id: '4', img: 'https://static1.weizan.cn/zhibo/static/img/vzan/pc/home/index/point3.png' },
  { id: '5', img: 'https://static1.weizan.cn/zhibo/static/img/vzan/pc/home/index/point1.png' },
  { id: '6', img: 'https://static1.weizan.cn/zhibo/static/img/vzan/pc/home/index/point1.png' },
])
onMounted(() => {
  handleSetTimer()
})
// 定时器事件
const timer = ref<any>()
const handleSetTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
  }
  timer.value = setInterval(() => {
    const index = pains.value.findIndex(item => item.id === curPainId.value)
    const nextIndex = index + 1 >= pains.value.length ? 0 : index + 1
    curPainId.value = pains.value[nextIndex].id
  }, 8000)
}
const onMouseMove = (pain: any) => {
  curPainId.value = pain.id
  clearInterval(timer.value)
}
const onMouseleave = () => {
  handleSetTimer()
}
</script>

<style lang="scss" scoped>
$width: 1200px;
$pain-item-number: 6;
$gap: 12px;
$pain-item-width: calc(($width - $gap * ($pain-item-number - 1)) / ($pain-item-number + 2));

.container {
  width: $width;
  margin: 0 auto;
  .pain-items {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    height: 396px;
    justify-content: space-between;
    margin-top: 48px;
    overflow: hidden;
    .pain-item {
      &[active='true'] {
        width: calc($pain-item-width * 3);
        &:before {
          opacity: 0;
        }
        .pain-item-img {
          transform: scale(1.1);
        }
      }
      // &:hover {
      //   width: calc($pain-item-width * 3);
      // }
      position: relative;
      width: $pain-item-width;
      animation-direction: normal;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      animation-name: changeWidthSmall-1109578e;
      animation-timing-function: ease-in-out;
      border-radius: 8px;
      display: flex;
      flex-shrink: 0;
      height: 396px;
      overflow: hidden;
      transition: all 0.5s linear;
      &-img {
        background-position-x: right;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 8px;
        cursor: pointer;
        height: 396px;
        opacity: 1;
        overflow: hidden;
        position: relative;
        transition: all 0.5s linear;
        width: 100%;
      }
    }
  }
}
$color-list-1: #edf7ff80, #edf7ff80, #edf7ff80, #edf7ff80, #edf7ff80, #edf7ff80;
$color-list-2: #38e8ffa9, #3860f4, #27a2fe, #3c5a6fe6, #3d5b70, #0bbacd;
$color-list-3: #38e8ffa9, #3860f4, #27a2fe, #3c5a6f, #3d5b70, #0bbacd;

@for $i from 1 through length($color-list-1) {
  .pain-item {
    &:nth-child(#{$i}) {
      &::before {
        background: linear-gradient(180deg, nth($color-list-1, $i) 0, nth($color-list-2, $i) 75%, nth($color-list-3, $i) 100%);
        bottom: 0;
        content: '';
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
      }
    }
  }
}
</style>
