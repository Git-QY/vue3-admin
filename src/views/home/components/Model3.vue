<template>
  <div class="banner-container">
    <div class="banner-inner">
      <div class="layer" v-for="(item, index) in imgList" :key="index">
        <img :src="item.img" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getAssetsImage } from '@/utils'
const imgList = ref([
  { img: getAssetsImage('images/banner/01.webp') },
  { img: getAssetsImage('images/banner/03.webp') },
  { img: getAssetsImage('images/banner/04.webp') },
  { img: getAssetsImage('images/banner/05.webp') },
  { img: getAssetsImage('images/banner/06.webp') },
  { img: getAssetsImage('images/banner/08.webp') },
  { img: getAssetsImage('images/banner/18.webp') },
  { img: getAssetsImage('images/banner/09.webp') },
  { img: getAssetsImage('images/banner/07.webp') },
  { img: getAssetsImage('images/banner/02.webp') },
  { img: getAssetsImage('images/banner/10.webp') },
  { img: getAssetsImage('images/banner/11.webp') },
  { img: getAssetsImage('images/banner/12.webp') },
  { img: getAssetsImage('images/banner/13.webp') },
  { img: getAssetsImage('images/banner/14.webp') },
  { img: getAssetsImage('images/banner/15.webp') },
  { img: getAssetsImage('images/banner/16.webp') },
  { img: getAssetsImage('images/banner/17.webp') },
])
</script>

<style lang="scss" scoped>
.banner-container {
  width: 100%;
  .banner-inner {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    .layer {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
      }
    }
  }
}
</style>
