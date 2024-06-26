import { ElMessage, ElMessageBox } from 'element-plus'

// 获取assets静态图片
export const getAssetsImge = (url: string) => {
  return new URL(`../assets/${url}`, import.meta.url).href
}
// 深拷贝
export const deepClone = (value: any, weakMap = new WeakMap()): any => {
  // 检查值是否为函数，并根据情况进行浅拷贝或深拷贝处理
  if (typeof value === 'function') {
    if (/^function/.test(value.toString()) || /^\(\)/.test(value.toString())) {
      return new Function('return ' + value.toString())()
    }
    return new Function('return function ' + value.toString())()
  }

  // 处理日期对象的克隆
  if (value instanceof Date) {
    return new Date(value.valueOf())
  }

  // 处理符号对象的克隆
  if (typeof value === 'symbol') {
    return Symbol(value.description)
  }

  // 处理集合对象（Set）的克隆
  if (value instanceof Set) {
    const newSet = new Set()
    for (const item of value) {
      newSet.add(deepClone(item, weakMap))
    }
    return newSet
  }

  // 处理映射对象（Map）的克隆
  if (value instanceof Map) {
    const newMap = new Map()
    for (const [key, val] of value) {
      newMap.set(deepClone(key, weakMap), deepClone(val, weakMap))
    }
    return newMap
  }

  // 检查值是否已使用 weakMap 克隆
  if (weakMap.has(value)) {
    return weakMap.get(value)
  }

  // 处理数组的克隆
  if (Array.isArray(value)) {
    const newArray: any[] = []
    for (let i = 0; i < value.length; i++) {
      newArray[i] = deepClone(value[i], weakMap)
    }
    return newArray
  }

  // 处理对象的克隆
  if (typeof value === 'object' && value !== null) {
    const newObj: any = Array.isArray(value) ? [] : {}
    weakMap.set(value, newObj)
    for (const key in value) {
      newObj[key] = deepClone(value[key], weakMap)
    }
    // 处理符号键的克隆
    const symbolKeys = Object.getOwnPropertySymbols(value)
    for (const sKey of symbolKeys) {
      newObj[sKey] = deepClone(value[sKey], weakMap)
    }
    return newObj
  }

  // 对于原始类型直接返回值
  return value
}

/**
 * 从小到大
 * @param property 以某个字段排序
 * @returns 排序函数
 */
export function compare<T>(property: keyof T) {
  return function (a: T, b: T) {
    var value1 = a[property] as number
    var value2 = b[property] as number
    return value1 - value2
  }
}
/**
 * 将列表转换为树形结构
 *
 * @param children 子集的字段名称
 * @param data 全部的数据
 * @returns 转换后的树形结构
 */
function toMap(arr: any[]) {
  const result = arr.reduce((acc, current) => {
    acc[current.id] = current
    return acc
  }, {})
  return result
}
export function listToTree(data: any[]) {
  const root: any[] = []
  data.sort(compare('sort')) // 排序
  const nodeMap: { [key: string]: any } = toMap(data)
  data.forEach(it => {
    const { parentId } = it
    if (nodeMap[parentId]) {
      nodeMap[parentId].children ??= []
      nodeMap[parentId].children.push(it)
    } else {
      root.push(it)
    }
  })
  return root
}
export function getLabel(data: { value: any; label: string }[], value: any, isItem = false): any {
  try {
    // 使用 Array.prototype.find() 方法在数组 data 中查找匹配 value 的对象，并返回该对象的 label 属性值
    const item = data.find(item => item.value == value)
    return isItem ? item : item!.label
  } catch (error) {
    // 如果出现错误（例如 data 为 null 或 undefined），则返回 value 的字符串表示
    return value && value.toString()
  }
}

/**
 * @description 操作单条数据信息 (二次确认【删除、禁用、启用、重置密码】)
 * @param {Function} api 操作数据接口的api方法 (必传)
 * @param {Object} params 携带的操作数据参数 {id,params} (必传)
 * @param {String} message 提示信息 (必传)
 * @returns {Promise}
 */
export const useHandleData = (api: (params: any) => Promise<any>, params: any = {}, message: string) => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(`是否${message}?`, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
      .then(async () => {
        const res = await api(params)
        if (!res) return reject(false)
        ElMessage({
          type: 'success',
          message: `${message}成功!`,
        })
        resolve(true)
      })
      .catch(() => {
        console.log('取消操作')
      })
  })
}

/**
 *  节流函数
 * @param fn    函数
 * @param delay  延迟时间
 * @returns
 */
export function throttle(fn: Function, delay: number) {
  let timer: any = null
  return function (this: any, ...args: any[]) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
/**
 *  防抖函数
 * @param fn    函数
 * @param delay  延迟时间
 * @returns
 */
export function debounce(fn: Function, delay: number) {
  let timer: any = null
  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 动态加载js
export function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.onload = () => resolve()
    script.onerror = error => reject(error)
    document.body.appendChild(script)
  })
}
