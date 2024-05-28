<template>
  <el-dialog :model-value="visible" append-to-body draggable :overflow="true" :before-close="colse">
    <!-- 基础选择弹窗 -->
    <section class="picker">
      <slot name="content">
        <div class="picker-body">
          <div class="picker-body--left">
            <template v-if="props.prop.type == 'tree'">
              <el-tree style="max-width: 600px" :props="props.prop" :load="loadNode" lazy
                :show-checkbox="props.multiple" :expand-on-click-node="false" @node-click="handleNodeClick" />
            </template>
            <template v-else>
              <div v-for="item in listData" class="picker-body--item">
                <el-checkbox :model-value="item.checked" :label="item[name]" size="large"
                  @change="handleChange(item)" />
              </div>
            </template>
          </div>
          <div class="picker-body--right">
            <div v-for="item in selectData" class="picker-body--item">
              <span> {{ item[name] }}</span>
              <Icon name="close" @click="handleDelete(item)"></Icon>
            </div>
          </div>
        </div>
      </slot>
    </section>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="colse">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
const props = defineProps({
  getList: {
    type: Function,
    default: () => {
      return []
    },
  },
  multiple: {
    type: Boolean,
    default: false,
  }, //   是否多选
  prop: {
    type: Object,
    default: {
      label: 'roleName', // 显示字段
      value: 'id', // 值字段
      children: 'children', // 子级字段
      type: 'list', // 类型
      lazy: false, // 是否懒加载
    },
  }, // 配置
})
const name = props.prop.label
const key = props.prop.value
const visible = ref(false)
const open = (list: any[]) => {
  visible.value = true
  listData.value.forEach((item: any) => {
    item.checked = list.find(x => x[key] == item[key]) ? true : false
  })
}
const colse = () => {
  visible.value = false
}
const emits = defineEmits(['confirm'])
const onConfirm = () => {
  emits('confirm', selectData.value)
  colse()
}
const listData = ref<any[]>([])
const handleChange = (item: any) => {
  if (!props.multiple) {
    if (item.checked) {
      listData.value.forEach(x => (x.checked = false))
    } else {
      listData.value.forEach(x => (x.checked = false))
      item.checked = true
    }
  } else {
    item.checked = !item.checked
  }
}
const handleDelete = (item: any) => {
  item.checked = false
}
const selectData = computed(() => listData.value.filter(item => item.checked))
// 树组件
const loadNode = async (node: Node, resolve: (data: any[]) => void) => {
  try {
    const res = await props.getList({ parentId: node.data[key] || '0' })
    resolve(res.data || [])
  } catch (error) { }
}
const handleNodeClick = (node: Node) => {
  console.log(listData, node)
  listData.value = [{ ...node, checked: true }]
}
defineExpose({ open, colse })
onMounted(async () => {
  if (props.prop.type == 'tree') return
  const res = await props.getList()
  listData.value = (res.data || []).map((item: any) => {
    return { ...item, checked: false }
  })
})
</script>

<style lang="scss" scoped>
.picker {
  &-body {
    flex: 1;
    display: flex;
    overflow: hidden;
    margin: 24px;
    border: 1px solid #eaeaea;
    border-radius: 2px;

    &--left {
      flex: 1;
      border-right: 1px solid #eaeaea;
      overflow: hidden;
    }

    &--right {
      width: 320px;
      overflow: auto;
      box-sizing: border-box;
    }

    &--item {
      padding: 0 8px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
