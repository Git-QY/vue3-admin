export type LayoutType = 'vertical' | 'horizontal' | 'columns'

// HistoryItem
export interface HistoryItem {
  id: string
  name: string
  [key: string]: any
}
export interface QuestionItem {
  text?: string
  files?: any
}
