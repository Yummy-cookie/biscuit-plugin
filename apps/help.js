import Help from './help/Help.js'
import { App } from '../components/index.js'

let app = App.init({
  id: 'help',
  name: '饼干帮助',
  desc: '饼干帮助'
})

app.reg({
  help: {
    rule: '^#?(biscuit|饼干)(插件)?帮助$',
    fn: Help.render,
    desc: '【#帮助】 #饼干帮助'
  },
  version: {
    rule: '^#?饼干版本$',
    fn: Help.version,
    desc: '【#帮助】 饼干版本介绍'
  }
})

export default app
