<template>
  <div>
    <el-popover placement="bottom" title="图标选择" :width="600" trigger="click" @show="handleShow">
      <div class="icon">
        <div class="icon-search">
          <el-input v-model="searchInput" placeholder="搜索图标名称" :prefix-icon="Search" @input="handleSearch" />
          <svg-icon :iconName="layout" className="icon-search--svg" @click="handleLayout" />
        </div>
        <div class="icon-bars" v-if="layout == 'bars'">
          <div v-for="item in iconData" :key="item" :class="`${item == props.modelValue ? ' icon-item icon-active' : 'icon-item'}`" @click="handleItem(item)">
            <svg-icon :iconName="item" /> <span>{{ item }}</span>
          </div>
        </div>
        <div class="icon-braille" v-else>
          <svg-icon v-for="item in iconData" :key="item" :className="`${item == props.modelValue ? ' icon-item icon-active' : 'icon-item'}`" :iconName="item" @click="handleItem(item)" />
        </div>
        <el-pagination background :page-size="size" :current-page="page" layout="prev, pager, next" :total="total" @current-change="currentChange"> </el-pagination>
      </div>
      <template #reference>
        <slot :value="props.modelValue">
          <el-input :value="props.modelValue" placeholder="请选择图标">
            <template #prefix>
              <svg-icon :iconName="props.modelValue" />
            </template>
          </el-input>
        </slot>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'

function getSymbolIDsFromString(svgString: string): string[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')
  const symbols = doc.querySelectorAll('symbol')
  return Array.from(symbols).map(symbol => symbol.id)
}

const props = defineProps({
  modelValue: { type: String, default: '' },
})
const emits = defineEmits(['update:modelValue'])

const iconData = ref<string[]>([])
const page = ref(1)
const size = ref(60)
const total = ref(0)
const allData: string[] = getSymbolIDsFromString(window._iconfont_svg_string_4388344) // 全部数据
console.log("🚀 ~ allData:", allData)
// 临时数据
const tableData = ref<string[]>([])

const getIconData = (data: string[]) => {
  tableData.value = data
  //allData为全部数据，tableData是目前表格绑定的数据
  iconData.value = data.slice((page.value - 1) * size.value, page.value * size.value)
  total.value = data.length
}
const currentChange = (val: number) => {
  page.value = val
  getIconData(tableData.value)
}
onMounted(() => {
  getIconData(allData)
})
const handleItem = (item: string) => {
  emits('update:modelValue', item)
}

const searchInput = ref('')
const layout = ref('braille')
// 防抖 搜索
const handleSearch = () => {
  if (searchInput.value) {
    const reg = new RegExp(searchInput.value, 'i')
    getIconData(allData.filter(item => reg.test(item)))
  } else {
    getIconData(allData)
  }
}
const handleShow = () => {
  const index = tableData.value.map(item => item).indexOf(props.modelValue)
  page.value = index > 0 ? Math.ceil(index / size.value) : 1
  getIconData(tableData.value)
}
const handleLayout = () => {
  layout.value = layout.value == 'bars' ? 'braille' : 'bars'
}
</script>

<style lang="scss" scoped>
.icon {
  &-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    &--svg {
      padding: 0 10px;
      margin-left: 10px;
      border: 1px solid #cdd0d6;
      border-radius: 5px;
      cursor: pointer;
      height: 30px;
    }
  }
  &-braille {
    height: 300px;
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    padding: 10px;
    // gridItem高度固定
    grid-template-rows: repeat(6, 1fr);

    .icon-item {
      width: 20px;
      height: 20px;
      justify-self: center;
      padding: 10px;
      border: 1px dashed transparent;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        border: 1px dashed var(--primary);
      }
    }
  }
  &-bars {
    height: 300px;
    padding: 0 10px;
    margin: 10px 0;
    display: grid;
    overflow: auto;
    grid-template-columns: repeat(4, 1fr);
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;
      justify-content: space-around;
      cursor: pointer;
      height: 50px;
      border: 1px dashed transparent;
      span {
        font-size: 12px;
      }
      &:hover {
        border: 1px dashed var(--primary);
      }
    }
  }
  .icon-active {
    border: 1px dashed var(--primary);
  }
}
</style>
