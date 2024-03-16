import Help from './help/Help.js'
import { App } from '../components/index.js'

let app = App.init({
  id: 'help',
  name: '饼干版本',
  desc: '饼干版本'
})

app.reg({
  version: {
    rule: '^#?饼干版本$',
    fn: Help.version,
    desc: '饼干版本'
  }
})

export default app
