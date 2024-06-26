<template>
  <div class="area-select">
    <el-select
      v-for="(level, index) in levels"
      v-model="showList[index]"
      :placeholder="level.label"
      @change="handleUpdateModel($event, index)"
      clearable
      :disabled="props.disabled || loading"
      class="area-select-item"
    >
      <el-option v-for="item in area[`${level.code}List`]" :label="item.name" :value="item.code" />
    </el-select>
    <div class="area-loading" v-if="loading"><Loading class="rotate loading" /><span>加载中...</span></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { getArea } from '@/api/utils'
import { deepClone } from '@/utils'
interface Area {
  code: string
  name: string
  level: String
  _id: string
}
interface levelItem {
  code: string
  label: string
  loading: Boolean
}
const area = reactive<{ [key: string]: Area[] }>({
  provinceList: [],
  cityList: [],
  areaList: [],
  countyList: [],
  streetList: [],
})
const props = defineProps({
  // 数组
  modelValue: { type: [Array, Object] },
  // 显示的级别
  level: {
    type: String as () => 'province' | 'city' | 'area' | 'county' | 'street',
    default: 'area',
  },
  disabled: {
    type: Boolean as () => boolean,
    default: false,
  },
  placeholder: {
    type: String as () => string,
    default: '请选择地区',
  },
  // 返回值和回显值的类型
  // 1 [code,code]
  // 2 [{code,name}]
  // 3 {省code,市name,市code,县name,县code,街道name,街道code}
  valueType: {
    type: String as () => string,
    default: '1',
  },
})
const emits = defineEmits(['update:modelValue'])
// 全部级别
const levelList = reactive<levelItem[]>([
  { code: 'province', label: '省', loading: false },
  { code: 'city', label: '市', loading: false },
  { code: 'area', label: '区/县', loading: false },
  { code: 'county', label: '镇/村', loading: false },
  { code: 'street', label: '街道', loading: false },
])
// 计算出当前显示的级别
const levels = computed(() => {
  const { level } = props
  const index = levelList.findIndex(obj => obj.code === level) + 1
  return deepClone(levelList).splice(0, index)
})
const loading = ref(false)
onMounted(async () => {
  try {
    loading.value = true
    const lenght = showList.value.length
    for (let i = -1; i < lenght - 1; i++) {
      let res = await getArea({ parentId: i == -1 ? '0' : showList.value[i] })
      area[`${levelList[i + 1].code}List`] = res.data
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
})
// 根据type清空数组
const handleClear = (index: number) => {
  // 清空数组
  levelList.forEach((item: any, i: number) => {
    if (i <= index) return false
    area[`${item.code}List`] = []
  })
}
const showList = ref<string[]>([])
watch(
  () => props.valueType,
  val => {
    if (!props.modelValue) return
    switch (val) {
      case '1':
        showList.value = props.modelValue as string[]
        break
      case '2':
        showList.value = props.modelValue.map((item: { label: string; value: string }) => item.value)
        break
      case '3':
        const data = props.modelValue as { [key: string]: any }
        showList.value = levels.value.map((item: levelItem) => data[`${item.code}Code`])
    }
  },
  { immediate: true },
)
// 处理选中地区变化事件
const handleUpdateModel = async (e: any, index: number) => {
  // 请空选中的值
  showList.value = showList.value.filter((_item: string, i: number) => i <= index)

  if (levels.value.length === index + 1) {
    console.log('已经是当前的最后一级 不进行加载 和 清空')
  } else {
    handleClear(index) // 清空数组
    const list = await getArea({ parentId: e })
    area[`${levelList[index + 1].code}List`] = list.data
  }
  updateModelValue()
}
// 更新value的值
const updateModelValue = () => {
  let returnValue = null
  switch (props.valueType) {
    case '1':
      returnValue = showList.value
      break
    case '2':
      returnValue = showList.value.map((code, index) => {
        const label = area[`${levelList[index].code}List`].find(item => code === item.code)?.name
        return { value: code, label }
      })
      break
    default:
      returnValue = levels.value.reduce((obj: any, item: levelItem, index: number) => {
        obj[`${item.code}Code`] = showList.value[index]
        obj[`${item.code}Name`] = area[`${levelList[index].code}List`].find(item => showList.value[index] === item.code)?.name
        return obj
      }, {})
  }
  emits('update:modelValue', returnValue)
}
</script>

<style lang="scss" scoped>
.area-select {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
  width: auto;
  align-items: center;
  .area-select-item {
    max-width: 200px;
  }
  .area-loading {
    display: flex;
    align-items: center;
    font-size: 14px;
    .loading {
      height: 20px;
      margin-right: 5px;
    }
  }
}
</style>
