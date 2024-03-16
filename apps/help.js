import Help from './help/Help.js'
import { App } from '../components/index.js'

let app = App.init({
  id: 'help',
  name: '饼干帮助',
  desc: '饼干帮助'
})

app.reg({
  help: {
    rule: /^#?(饼干)?(命令|帮助|菜单|help|说明|功能|指令|使用说明)$/,
    fn: biscuit.render,
    desc: '【#帮助】 #饼干帮助'
  },
  version: {
    rule: /^#?饼干版本$/,
    fn: biscuit.version,
    desc: '【#帮助】 饼干版本介绍'
  }
})

export default app
