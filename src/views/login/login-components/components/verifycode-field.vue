<template>
  <div class="verifycode-field">
    <!-- 获取邮箱code 点击发送 -->
    <el-form-item label="" prop="code">
      <el-input v-model="inputValue" :placeholder="placeholder" @input="onInput">
        <!-- <template #prefix>
          <el-icon class="el-input__icon"><svg-icon iconName="icon-yanzhengma" /></el-icon>
        </template> -->
        <template #suffix>
          <el-button class="verifycode-field--refresh" @click="onRefresh" link type="primary" :disabled="!disabledTip">{{ tip }}</el-button>
        </template>
      </el-input>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '请输入验证码' },
  disabled: { type: Boolean, default: true },
  send: { type: Function, default: () => {} },
})
const disabledTip = computed(() => {
  return props.disabled && count.value == 60
})
const tip = computed(() => {
  if (count.value == 60) {
    return '发送验证码'
  } else {
    return `已发送${count.value}秒`
  }
})
const inputValue = ref(props.modelValue)
const emits = defineEmits(['update:modelValue'])
const onInput = (value: string) => {
  emits('update:modelValue', value)
}
const onRefresh = async () => {
  emits('update:modelValue', '')
  countDown()
  await props.send()
}
// 倒计时函数
const count = ref(60)
const countDown = () => {
  if (count.value > 0) {
    count.value--
    setTimeout(() => {
      countDown()
    }, 1000)
  } else {
    count.value = 60
  }
}
</script>
<style lang="scss" scoped></style>
