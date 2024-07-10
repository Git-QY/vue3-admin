<template>
  <div class="ProjectDynamics">
    <div class="ProjectDynamics-title">项目动态</div>
    <div class="ProjectDynamics-branche">
      <div>项目分支 :</div>
      <el-select-v2 v-model="currentBranch" :options="branches" placeholder="请选择你的分支" size="large" @change="changeBranche" />
    </div>
    <el-timeline class="ProjectDynamics-contant" v-loading="loading">
      <el-timeline-item v-for="item in commitList" :timestamp="dayjs(item.commit.committer.date).format('YYYY-MM-DD HH:mm:ss')" placement="top">
        <el-card> {{ item.commit.author.name }} 提交了 {{ item.commit.message }}</el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts" setup>
import { giteeCommits, giteeBranches } from '@/api/utils'
import { dayjs } from 'element-plus'
interface CommitItem {
  commit: {
    author: {
      name: string
    }
    committer: {
      date: string
    }
    message: string
  }
}
interface BranchOption {
  label: string
  value: string
}
const commitList = ref<CommitItem[]>([])
const currentBranch = ref<string>('master')
const branches = ref<BranchOption[]>([])
const loading = ref<boolean>(false)
onMounted(async () => {
  await getCommits()
  await getBranches()
})
const getCommits = async () => {
  try {
    loading.value = true
    const res = await giteeCommits({ branch: currentBranch.value })
    commitList.value = res.data
  } catch (error) {
  } finally {
    loading.value = false
  }
}
const getBranches = async () => {
  try {
    const res = await giteeBranches({})
    branches.value = (res.data || []).map((item: { name: string }) => {
      return { label: item.name, value: item.name }
    })
  } catch (error) {}
}
const changeBranche = () => {
  getCommits()
}
</script>

<style lang="scss" scoped></style>
