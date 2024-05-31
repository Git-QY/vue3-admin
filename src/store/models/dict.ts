import { defineStore } from 'pinia'
import { listDictItem } from '@/api'

interface DictState {
  dictData: Record<string, any[]>
}

export const useDictStore = defineStore('dict', {
  state: (): DictState => {
    return { dictData: {} }
  },
  getters: {
    dictDataGetter: state => state.dictData,
  },
  actions: {
    setDict(key: string, list: any[]): void {
      this.dictData[key] = list
    },
    // 获取单个字典
    async getDict(key: string) {
      // key可以是string和Array 怎么修改
      if (this.dictData[key]) {
        return this.dictData[key]
      } else {
        const data = (await listDictItem({ dictType: key })).data
        const list = data.map((item: Record<string, any[]>) => ({ value: item.value, label: item.label }))
        this.setDict(key, list)
        return list
      }
    },
    // 获取多个字典
    async getDicts(keys: string[]) {
      const lists = await Promise.all(keys.map(key => this.getDict(key)))
      return lists
    },
  },
  // persist: true,
})
