import PageTable from './Table/index.vue'
import Page from './Page/index.vue'
import Outlet from './Page/outlet.vue'
import SvgIcon from './Icon/svgIcon.vue'
import Icon from './Icon/index.vue'
import Upload from './FormItem/upload.vue'
import Region from './FormItem/region.vue'
import RichText from './FormItem/richText.vue'
import Form from './Form/index.vue'
import Dialog from './Dialog/index.vue'
import Echarts from './Echarts/index.vue'

import type { App, Component } from 'vue'
// 对外暴露插件对象，注册全局组件
const components: { [name: string]: Component } = {
  PageTable,
  Page,
  Outlet,
  SvgIcon,
  Upload,
  Region,
  RichText,
  Form,
  Dialog,
  Icon,
  Echarts,
}
export default {
  // install方法， Object.keys()得到对象所有的key
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}

// {
//     label: '题目选项',
//     prop: 'options',
//     type: 'solt',
//     mate: [
//       // 满足条件隐藏 条件和条件之间 || 还是 &&  默认是&&  如果前一个条件指明 among=true 那就是 ||
//       //
//       // 1 字段 2 条件 == 值1 || > 值2
//       {
//         prop: 'type',
//         conditions: [
//           { op: '==', value: 'single_choice', among: true },
//           { op: '==', value: 'multiple_choice' },
//         ],
//         among: true,
//       },
//       // 2 字段 3 条件 == 值1 || > 值2
//       {
//         prop: 'stem',
//         conditions: [{ op: '==', value: 'multiple_choice' }],
//       },
//     ],
//   },// 条件运算符类型
type Operator = '==' | '>' | '<' | '>=' | '<='

// 条件接口
interface Condition {
  op: Operator
  value: any
  among?: boolean // 使用 || 运算符的标记
}

// mate 条件接口
interface MateCondition {
  prop: string
  conditions: Condition[]
  among?: boolean // 使用 || 运算符的标记
}

export const evaluateConditions = (mate: MateCondition[], form: any): boolean => {
  // 帮助函数：将条件列表转换为逻辑表达式
  // const conditionsToExpression = (conditions: Condition[], prop: string): string => {
  //   if (conditions.length === 0) {
  //     return ''
  //   }
  //   const expressions = conditions.map((item: Condition, index) => {
  //     const { op, value, among } = item
  //     if (index === conditions.length - 1) {
  //       return `${form[prop] || ''} ${op} ${value}`
  //     }
  //     return `${form[prop] || ''} ${op} ${value}${among ? '||' : '&&'}`
  //   })
  //   return expressions.join('')
  // }

  // const data = mate
  //   .map((item: MateCondition, index) => {
  //     if (index == mate.length - 1) {
  //       return conditionsToExpression(item.conditions, item.prop)
  //     }
  //     return `(${conditionsToExpression(item.conditions, item.prop)})${item.among ? '||' : '&&'}`
  //   })
  //   .join('')
  // console.log('🚀 ~ evaluateConditions ~ data:', data)
  // return data
  const judgment = (item: Condition, prop: string) => {
    switch (item.op) {
      case '==':
        return form[prop] === item.value
      case '>':
        return form[prop] > item.value
      case '<':
        return form[prop] < item.value
      case '>=':
        return form[prop] >= item.value
      case '<=':
        return form[prop] <= item.value
      default:
        return false
    }
  }

  const conditionsToExpression = (conditions: Condition[], prop: string) => {
    return conditions
      .map((item: Condition, index) => {
        if (index === conditions.length - 1) {
          return judgment(item, prop)
        }
        return `${judgment(item, prop)}${item.among ? '||' : '&&'}`
      })
      .join('')
  }
  const expression = mate
    .map((item: MateCondition, index) => {
      if (index == mate.length - 1) {
        return conditionsToExpression(item.conditions, item.prop)
      }
      return `(${conditionsToExpression(item.conditions, item.prop)})${item.among ? '||' : '&&'}`
    })
    .join('')
  return new Function('return ' + expression)()
}
