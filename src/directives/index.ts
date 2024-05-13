import { App } from 'vue'
import auth from './modules/auth'
import copy from './modules/copy'

const directivesList: any = {
  auth,
  copy,
}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key])
    })
  },
}

export default directives
