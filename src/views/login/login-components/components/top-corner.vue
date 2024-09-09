<template>
  <el-tooltip placement="left" :content="content" effect="light" popper-class="qy-login--tooltip">
    <div class="qy-login--corner" @click="toggleType">
      <SvgIcon :icon="icon" />
    </div>
  </el-tooltip>
</template>

<script lang="ts" setup>
const props = defineProps({ value: { type: String, default: '' } })
import SvgIcon from './svg-icon.vue'
const content = computed(() => (props.value === 'qrCode' ? '账号登录' : '扫码登录'))
const icon = computed(() => (props.value === 'qrCode' ? 'login' : 'qrcode'))
const emit = defineEmits(['update:value'])
const toggleType = () => {
  emit('update:value', props.value === 'qrCode' ? 'password' : 'qrCode')
}
</script>

<style lang="scss" scoped></style>
