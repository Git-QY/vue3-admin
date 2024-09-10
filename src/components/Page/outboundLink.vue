<template>
  <div></div>
</template>

<script lang="ts" setup>
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
})
watch(
  () => props.href,
  newVal => {
    if (newVal) {
      window.open(newVal, '_blank')
    }
  },
)
</script>

<style lang="scss" scoped></style>
