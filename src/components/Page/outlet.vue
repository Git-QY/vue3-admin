<template>
  <div class="outlet">
    <div class="outlet-head" @click="onBack" v-if="title">
      <el-icon> <ArrowLeft /></el-icon>
      <span>{{ title }}</span>
    </div>
    <div class="outlet-inners">
      <slot />
    </div>
    <div class="outlet-footer" v-if="showFooter">
      <el-button v-if="showBack" @click="onBack">返回</el-button>
      <el-button v-if="showFinish" type="primary" @click="onFinish" :loading="loading" :disabled="disabled">{{ confirmText || '确认' }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  finish: Function,
  back: Function,
  loading: Boolean,
  disabled: Boolean,
  title: String,
  confirmText: String,
  showFooter: { type: Boolean, default: true },
  showBack: { type: Boolean, default: true },
  showFinish: { type: Boolean, default: true },
})
const router = useRouter()
const onBack = () => {
  if (props.back) return props.back()
  router.back()
}
const onFinish = () => {
  if (props.finish) return props.finish()
}
</script>

<style scoped lang="scss">
.outlet {
  height: calc(100vh - 59px - 40px);
  position: relative;
  display: flex;
  flex-direction: column;
  &-head {
    width: 100%;
    font-size: 16px;
    height: 46px;
    background: #f2f3f5;
    font-weight: 400;
    color: #616161;
    display: flex;
    align-items: center;
    cursor: pointer;
    i {
      font-size: 20px;
      margin-right: 15px;
    }
    span {
      position: relative;
      &::before {
        content: '';
        top: 3px;
        position: absolute;
        left: -10px;
        display: block;
        width: 1px;
        height: 15px;
        background: #dddddd;
      }
    }
  }
  &-inners {
    background: #fff;
    flex: 1;
    // padding: 20px;
    padding-top: 40px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 20px;
  }
  &-footer {
    z-index: 10;
    padding: 13px 0;
    border-top: 1px solid #eaeaea;
    background: #fff;
    text-align: center;
    .el-button {
      min-width: 80px;
    }
  }
}
</style>
