import SparkMD5 from 'spark-md5';

const chunkSize: number = 1 * 1024 * 1024

/**
 * 创建文件切片
 * @param file 要切片的文件
 * @returns 返回所有切片的数组
 */
export function createFileChunk(file: File, size?: number): Blob[] {
  size = size || chunkSize
  let current: number = 0
  // 保存与返回所有切片的参数
  const chunks: Blob[] = []
  while (current < file.size) {
    // 文件进行切片
    const chunk: Blob = file.slice(current, current + size)
    chunks.push(chunk)
    current = current + size
  }
  return chunks
}

/**
 * 计算给定切片数组的 MD5 值
 * @param chunks 切片数组
 * @returns Promise，包含计算出的 MD5 值
 */
export function calculationChunksMd5(chunks: Blob[]): Promise<string> {
  return new Promise(resolve => {
    // 创建FileReader对文件进行读取
    const reader = new FileReader()
    // 创建sparkMd5的ArrayBuffer对象，进行增量计算md5值
    const spark = new SparkMD5.ArrayBuffer()
    let readIndex = 0

    function loadNext() {
      // 递归调用结束条件，当没有chunk可以读取的时候
      if (chunks[readIndex]) {
        return reader.readAsArrayBuffer(chunks[readIndex])
      }
      // 最终的md5值
      resolve(spark.end())
    }

    reader.onload = (ev: ProgressEvent<FileReader>) => {
      readIndex++
      // 获取读取到的内容，这里可以计算一下进度
      const result = ev.target?.result as ArrayBuffer
      // 将内容添加到spark中，进行计算
      spark.append(result)
      // 继续下一个文件读取
      loadNext()
    }
    // 启动计算
    loadNext()
  })
}
