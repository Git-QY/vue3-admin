<template>
  <!-- 实现左右滚动 鼠标悬停时暂停 支持配置css来滚动速度 全部css实现 -->
  <div class="container">
    <div class="wall">
      <div class="wall-item"><img src="http://615orob70703.vicp.fun:26545/uploads/unnamed.jpg" alt="" :style="{ width: '100%' }" /></div>
      <div class="wall-item">2</div>
      <div class="wall-item">3</div>
      <div class="wall-item">4</div>
      <div class="wall-item">5</div>
      <div class="wall-item">6</div>
      <div class="wall-item">7</div>
      <div class="wall-item">8</div>
      <div class="wall-item">9</div>
    </div>
    <div class="wall" data-direction="reverse">
      <div class="wall-item">1</div>
      <div class="wall-item">2</div>
      <div class="wall-item">3</div>
      <div class="wall-item">4</div>
      <div class="wall-item">5</div>
      <div class="wall-item">6</div>
      <div class="wall-item">7</div>
      <div class="wall-item">8</div>
      <div class="wall-item">9</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
$wall-item-width: 200px;
$wall-item-height: 60px;
$wall-item-number: 9;
$duration: 16s;

.container {
  width: 100%;
  .wall {
    box-sizing: border-box;
    padding: 0 $wall-item-width;
    margin: 0 $wall-item-width;
    margin-top: 30px;
    height: $wall-item-height;
    position: relative;
    mask-image: linear-gradient(90deg, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0));
    overflow: hidden;
    .wall-item {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateX(calc($wall-item-width * $wall-item-number));
      height: $wall-item-height;
      width: $wall-item-width;
      background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
      animation: scrolling $duration linear infinite;
      cursor: pointer;
    }
    // scss循环
    @for $i from 1 through $wall-item-number {
      .wall-item:nth-child(#{$i}) {
        animation-delay: calc((($duration / $wall-item-number) * ($wall-item-number - #{$i})) * -1);
      }
    }
    &:has(.wall-item:hover) .wall-item {
      animation-play-state: paused;
    }
    &[data-direction='reverse'] .wall-item {
      animation-direction: reverse;
      background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    }
  }
  @keyframes scrolling {
    to {
      transform: translateX(calc($wall-item-width * -1));
    }
  }
}
</style>
