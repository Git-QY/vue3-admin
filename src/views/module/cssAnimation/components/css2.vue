<template>
  <div class="container">
    <div class="product-left">
      <div class="product-left-item"></div>
    </div>
    <div class="product-right"></div>
  </div>
</template>

<script lang="ts" setup>
const productList = ref([{ title: '推荐产品' }])
</script>

<style lang="scss" scoped>
$width: 1200px;
.container {
  width: $width;
  margin: 0 auto;
}
</style>
