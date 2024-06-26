<template>
  <!-- 原生上传组件 -->
  <div class="upload">
    <div class="upload-card" v-if="mode === 'card'">
      <div class="upload-card--item" v-for="(item, index) in showFlieList" :key="index">
        <fileIcon :data="item.url" :width="100" :height="100"></fileIcon>
        <div class="modal">
          <el-icon @click="onDownload(item)"><Download /></el-icon>
          <el-icon @click="onRemove(item)"><Delete /></el-icon>
        </div>
      </div>
      <div class="upload-card--btn upload-btn" @click="onUpload">
        <input type="file" hidden @change="onChange" :multiple="multiple" ref="fileRef" />
        <svg-icon iconName="icon-add" />
      </div>
    </div>
    <div class="upload-list" v-if="mode === 'list'">
      <div class="upload-list--btn upload-btn" @click="onUpload">
        <input type="file" hidden @change="onChange" :multiple="multiple" ref="fileRef" />
        <svg-icon iconName="icon-add" color="var(--primary)" />
        <span>上传</span>
      </div>
      <ul>
        <li class="upload-list--item" :style="`--progress: ${item.progress}%`" v-for="(item, index) in showFlieList" :key="index">
          <div class="name" v-expandText="{ maxLines: 1, maxWidth: '200px' }">{{ item.name }}</div>
          <div class="tool">
            <el-button type="primary" link>删除</el-button>
            <el-button type="primary" link>下载</el-button>
            <el-button type="primary" link>预览</el-button>
            {{ item.progress }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { upload } from '@/api/utils'
import { ElMessage } from 'element-plus'
import fileIcon from '@/components/FormItem/fileIcon.vue'
import request from '@/utils/request'
interface File {
  url: string
  name: string
}
interface FileListItem {
  file: File | null
  name: string
  url: string
  progress: number
  isUpload: boolean
}

const props = defineProps({
  modelValue: { type: Array }, // 绑定值
  multiple: { type: Boolean, default: false }, // 是否多选
  limit: { type: Number, default: 9 }, // 最大上传数量
  beforeUpload: { type: Function }, // 上传前的钩子
  returnAttributes: { type: Array, default: () => ['url', 'name'] }, // 返回那几个属性
  mode: { type: String, default: 'list' }, // 显示模式 card | list
  chunkSize: { type: Number, default: 1024 * 1024 * 2 }, // 上传文件大于多少开启分片上传
})
const emits = defineEmits(['update:modelValue'])

const showFlieList = computed(() => {
  if (!fileList.value) return []
  return fileList.value.filter(item => item.isUpload)
})
const fileList = ref<FileListItem[]>([]) // 文件列表
const fileRef = ref<any>(null)
const onUpload = () => {
  fileRef.value.click()
  fileRef.value.value = null // 防止相同文件上传的问题
}
// 在组件中定义 curFile
const curFile = ref<FileListItem>({ file: null, isUpload: true, url: '', progress: 0, name: '' })
const onChange = async (e: any) => {
  let files = e.target.files
  if (props.limit <= showFlieList.value.length) return ElMessage.warning('超出最大上传数量')
  if (props.beforeUpload && !props.beforeUpload(files)) return // 上传前的钩子
  try {
    for (const file of files) {
      curFile.value = { file, isUpload: true, url: '', progress: 0, name: file.name }
      if (props.limit > 1) {
        fileList.value.push(curFile.value)
      } else {
        fileList.value = [curFile.value]
      }
      const formData = new FormData()
      formData.append('file', file)
      request
        .post('/utils/uploads', formData, {
          onUploadProgress: function (progressEvent: ProgressEvent) {
            curFile.value.progress = ((progressEvent.loaded / progressEvent.total) * 100) | 0
          },
        })
        .then(res => {
          curFile.value.isUpload = true
          curFile.value.url = res.data.url
          updateModelValue()
          ElMessage.success('上传成功')
        })
        .catch(err => {
          curFile.value.isUpload = false
        })
    }
  } catch (error: any) {
    ElMessage.error(error)
  }
}
const onDownload = (item: File) => {}
const onRemove = (item: File) => {
  fileList.value = fileList.value.filter((row: File) => row.url != item.url)
  updateModelValue()
}
// 更新v-model值
const updateModelValue = () => {
  // returnAttributes =》 ['url', 'name']
  const list = fileList.value.map(item => {
    return props.returnAttributes.reduce((obj: any, key: string) => {
      obj[key] = item[key]
      return obj
    }, {})
  })
  emits('update:modelValue', list)
}
</script>

<style lang="scss" scoped>
.upload {
  &-btn {
    cursor: pointer;
  }
  &-card {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    &--item {
      position: relative;
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
      &:hover {
        .modal {
          opacity: 1;
        }
      }
      .modal {
        /*里层绝对位置：为了让盒子位置重叠*/
        position: absolute;
        z-index: 2;
        top: 0;
        /*宽高：撑开鼠标悬停后的盒子*/
        width: 100%;
        height: 100%;
        border-radius: 4px;
        /*样式：鼠标悬停前*/
        opacity: 0;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        text-align: center;
        cursor: pointer;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    &--btn {
      position: relative;
      width: 100px;
      height: 100px;
      line-height: 100px;
      border-radius: 4px;
      text-align: center;
      border: 1px dashed #ccc;
      &:hover {
        border-color: #409eff;
      }
      .svg-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
      }
    }
  }
  &-list {
    ul {
      padding-bottom: 5px;
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        justify-content: space-between;
        max-width: 400px;
        margin-top: 10px;
        padding: 10px;
        border: 1px solid var(--light-8);
        border-radius: 4px;
        // background-color: var(--light-6);
        // background-size: 30%;
        background: linear-gradient(90deg, var(--light-9), var(--light-6), var(--progress), transparent 0);
        transition: 0.3s --progress;
      }
      @property --progress {
        syntax: '<percentage>';
        inherits: false;
        initial-value: 0%;
      }
    }
    &--btn {
      display: inline-block;
      width: 160px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      border: 1px dashed var(--primary);
      background-color: #fbfdff;
      border-radius: 6px;
      margin-right: 10px;
      color: var(--primary);
      font-size: 14px;
    }
  }
}
</style>
