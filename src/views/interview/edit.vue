<template>
  <Outlet v-bind="outlet" class="interview">
    <Form class="form" :columns="columns" v-model="form" ref="formRef">
      <template #type="{ item }">
        <el-select v-model="form.type" placeholder="请选择题目类型" @change="onChange">
          <el-option v-for="i in item.options" :key="i.value" :label="i.label" :value="i.value" />
        </el-select>
      </template>
      <template #options>
        <!-- 生成选择项 -->
        <div class="options">
          <div v-for="(item, index) in form.options" class="options-item">
            <el-input v-model="item.value" placeholder="输入值">
              <template #prefix>
                <div style="width: 10px">{{ item.type }}</div>
              </template>
            </el-input>
            <el-icon class="el-icon-circle">
              <svg-icon iconName="icon-add" @click="add(index)" />
            </el-icon>
            <el-icon class="el-icon-circle" v-if="index !== 0">
              <svg-icon iconName="icon-remove" @click="remove(index)" />
            </el-icon>
          </div>
        </div>
      </template>
      <template #answer>
        <!-- 选择题 1点选 2多选 -->
        <el-radio-group v-model="form.answer" :min="1" :max="1" v-if="form.type == 'single_choice'">
          <el-radio v-for="item in form.options" :label="item.type" :value="item.type"></el-radio>
        </el-radio-group>
        <!-- 多选 -->
        <el-checkbox-group v-model="form.answer" v-else-if="form.type == 'multiple_choice'">
          <el-checkbox v-for="item in form.options" :label="item.type" :value="item.type" />
        </el-checkbox-group>
        <!-- 简答题 1简答 2填空 -->
        <RichText v-else v-model="form.answer"></RichText>
      </template>
    </Form>
  </Outlet>
</template>

<script lang="ts" setup>
import { addInterview, updateInterview, Interview, detailInterview } from '@/api'
import { useElementUI } from '@/hooks/useMessage'
const { showMessage } = useElementUI()
const columns = reactive([
  { label: '题目类型', prop: 'type', type: 'solt', dict: 'interview_type', rules: 'must' },
  { label: '题目描述', prop: 'stem', rules: 'must' },
  { label: '知识点标签', prop: 'tags', type: 'select', dict: 'interview_tags', props: { multiple: true }, rules: 'must' },
  { label: '题目难度', prop: 'level', type: 'rate', rules: 'int-1' },
  { label: '题目分值', prop: 'score', type: 'input-number' },
  {
    label: '题目选项',
    prop: 'options',
    type: 'solt',
    mate: [
      {
        prop: 'type',
        conditions: [
          { op: '==', value: 'single_choice', among: true },
          { op: '==', value: 'multiple_choice' },
        ],
      },
    ],
  },
  { label: '正确答案', prop: 'answer', rules: 'must', type: 'slot' },
  { label: '答案解析', prop: 'analysis', type: 'rich-text' },
])
const form = ref<Interview>({
  type: '',
  stem: '',
  tags: [],
  level: 0,
  score: 0,
  options: [{ type: 'A', value: '' }],
  answer: '',
})
const formRef = ref(null as any)
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const onBack = () => router.back()
const outlet = reactive({
  finish: async () => {
    const res = await formRef.value.validateForm()
    if (!res) return
    if (form.value.type == 'multiple_choice') {
      form.value.answer = form.value.answer.join(',')
    }
    try {
      loading.value = true
      if (route.query.id) {
        await updateInterview({ ...form.value })
      } else {
        await addInterview({ ...form.value })
      }
      showMessage('操作成功')
      onBack()
    } catch (error: any) {
      showMessage(error, 'error')
    } finally {
      loading.value = false
    }
  },
})
const add = (index: number) => {
  ;(form.value.options || []).splice(index + 1, 0, { type: '', value: '' })
  sortType()
}
const remove = (index: number) => {
  ;(form.value.options || []).splice(index, 1)
  sortType()
}
// 删除添加重新排序type
const sortType = () => {
  ;(form.value.options || []).forEach((item, index) => {
    item.type = String.fromCharCode(65 + index)
  })
}
const onChange = (e: string) => {
  form.value.answer = e == 'multiple_choice' ? [] : ''
}
onMounted(() => {
  getDatail()
})
const getDatail = async () => {
  if (route.query.id) {
    const res = await detailInterview({ id: route.query.id })
    form.value = res.data
    if (form.value.type == 'multiple_choice') {
      form.value.answer = form.value.answer.split(',')
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 60%;
}
.el-icon-circle {
  border: 1px solid #ccc;
  margin-left: 10px;
  border-radius: 50%;
}
.options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5px;
  .options-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
  }
}
</style>
