<template>
  <div class="chat-history">
    <!-- 搜索框 -->
    <div class="chat-history-search">
      <el-input placeholder="搜索历史记录" v-model="searchText" suffix-icon="el-icon-search"></el-input>
    </div>
    <div v-loading="historyLoading">
      <!-- 历史记录列表 -->
      <div class="chat-history-list" v-if="!historyLoading">
        <div class="chat-history-item" :selected="currentId === item.id" v-for="item in historyList" :key="item.id" @click="switchChat(item)">
          <div class="chat-history-item-label">{{ item.name }}</div>
          <div class="chat-history-item-handle">
            <el-popover popper-class="chat-history-popover" width="132px" placement="right-start" :visible-arrow="false">
              <div class="handle-list">
                <div class="handle-list-item" @click="operate.rename(item)">
                  <img :src="history_rename" width="16px" height="16px" />
                  <span>重命名</span>
                </div>
                <div class="handle-list-item" @click="operate.share(item)">
                  <img :src="history_share" width="16px" height="16px" />
                  <span>分享此对话</span>
                </div>
                <div class="handle-list-item" @click="operate.delete(item)">
                  <img :src="history_del" width="16px" height="16px" />
                  <span style="color: #e63224">删除</span>
                </div>
              </div>
              <template #reference>
                <el-icon><More /></el-icon>
              </template>
            </el-popover>
          </div>
        </div>
      </div>
      <!-- 无数据状态 -->
      <div class="chat-history-empty" v-if="!historyList.length">
        <img :src="empty" width="100px" height="100px" />
        <div>暂无数据</div>
      </div>
    </div>
    <!-- 重命名 -->
  </div>
</template>

<script lang="ts" setup>
import { HistoryItem } from '@/types' // 假设你有一个类型定义文件
import { deleteAiRoom } from '@/api'
import { useMessage } from '@/hooks/useMessage'
const { showMessage, showMessageBox } = useMessage()
// iamges
import empty from '@/views/module/ai/images/empty.png'
import history_share from '@/views/module/ai/images/history_share.png'
import history_del from '@/views/module/ai/images/history_del.png'
import history_rename from '@/views/module/ai/images/history_rename.png'

// 注入依赖
const getHistoryList = inject<() => HistoryItem[]>('getHistoryList')!
const getCurrentId = inject<() => string>('getCurrentId')!
const switchChat = inject<(item: HistoryItem) => void>('switchChat')!
const getHistoryLoading = inject<() => boolean>('getHistoryLoading')!
const createNewChat = inject<() => boolean>('createNewChat')!

// 响应式数据
const searchText = ref<string>('')

// 计算属性
const historyList = computed(() => getHistoryList())
const currentId = computed(() => getCurrentId())
const historyLoading = computed(() => getHistoryLoading())

// 方法 操作
const operate = {
  // 重命名
  rename: (_item: HistoryItem) => {
    console.log('重命名')
    // await updateAiRoom({ id: item.id, name: searchText.value })
  },
  // 分享
  share: (_item: HistoryItem) => {
    console.log('分享')
  },
  // 删除
  delete: async (item: HistoryItem) => {
    try {
      const result = await showMessageBox('确定删除吗？', '提示')
      if (!result) return
      await deleteAiRoom({ id: item.id })
      await createNewChat()
      showMessage('删除成功')
    } catch (error) {
      showMessage((error as resError).message, 'error')
    }
  },
}
</script>

<style lang="scss">
.chat-history-popover {
  min-width: 100px;
  padding: 8px;
  .handle-list-item {
    display: flex;
    height: 36px;
    align-items: center;
    font-size: 14px;
    color: #333;
    padding: 0 8px;
    cursor: pointer;
    img {
      margin-right: 8px;
    }
    &:hover {
      background: #f1f2f3;
    }
  }
}
.chat-history {
  .chat-history-empty {
    margin-top: 30vh;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    color: #959698;
    line-height: 22px;
  }
  .chat-history-search {
    margin-bottom: 24px;
  }
  .chat-history-item {
    display: flex;
    height: 36px;
    align-items: center;
    font-size: 14px;
    color: #333;
    border-radius: 4px;
    padding: 0 15px;
    cursor: pointer;
    &[selected='true'] {
      background: var(--light-8);
      color: var(--primary);
    }
  }
  .chat-history-item-label {
    flex: 1;
    overflow: hidden;
  }
  .chat-history-item-handle {
    width: 16px;
    flex-shrink: 0;
  }
}
</style>
