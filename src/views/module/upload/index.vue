<template>
  <div class="demo-upload">
    <el-tabs v-model="activeName" type="card" class="demo-tabs">
      <el-tab-pane v-for="item in components" :label="item.label" :name="item.label">
        <div v-if="activeName == '基础上传'">
          <!-- 配置条件 -->
          <Form class="form" :columns="columns" v-model="item.props" ref="formRef">
            <!-- <template #roleIds>
              <el-input v-model="roleNames" placeholder="请选择角色" readonly @click="openRoleDialog" />
            </template> -->
          </Form>
          <!-- 是否多选 multiple -->
          <!-- 最大上传数量 默认9 limit -->
        </div>
        <component :is="item.component" v-bind="item.props" v-model="item.fileList" />
        <p>{{ item.fileList }}</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import LargeUpload from './components/LargeUpload.vue'
import Upload from '@/components/FormItem/upload.vue'
// import SimpleUpload from './components/SimpleUpload.vue'
interface ComponentItem {
  label: string
  component: Component
  fileList: any[]
  props: Object
}
const components = ref<ComponentItem[]>([
  {
    label: '基础上传',
    component: markRaw(Upload),
    props: {
      mode: 'card',
      multiple: true,
      limit: 9,
    },
    fileList: [],
  },
  { label: '大文件上传', component: markRaw(LargeUpload), props: {}, fileList: [] },
  // { label: 'SimpleUpload', component: markRaw(SimpleUpload), props: {}, fileList: [] },
])
const activeName = ref('基础上传')

const columns = reactive([
  {
    label: '显示模式',
    prop: 'mode',
    type: 'radio-group',
    options: [
      { label: '卡片', value: 'card' },
      { label: '列表', value: 'list' },
    ],
  },
  { label: '是否多选', prop: 'multiple', type: 'switch' },
  { label: '上传数量', prop: 'limit', type: 'input-number' },
])
</script>

<style lang="scss" scoped>
.demo-upload {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
