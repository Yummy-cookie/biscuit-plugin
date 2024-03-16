import { Data, Version } from '../components/index.js'
import fs from 'node:fs'

let relpyPrivate = async function () {
}
let common = await Data.importModule('lib/common/common.js', 'root')
if (common && common.default && common.default.relpyPrivate) {
  relpyPrivate = common.default.relpyPrivate
}

const Index = {

  // 发启动消息
  async startMsg () {
    let msgStr = await redis.get('miao:restart-msg')
    if (msgStr) {
      let msg = JSON.parse(msgStr)
      await relpyPrivate(msg.qq, msg.msg)
      await redis.del('miao:restart-msg')
      let msgs = [`当前饼干版本: ${Version.version}`, '您可使用 #饼干版本 命令查看更新信息']
      await relpyPrivate(msg.qq, msgs.join('\n'))
    }
  },

  // 检查版本
  async checkVersion () {
    if (!Version.isV3 && !Version.isAlemonjs) {
      console.log('警告：biscuit-plugin需要V3 Yunzai，请升级至最新版Miao-Yunzai以使用biscuit-plugin')
    }
    if (!fs.existsSync(process.cwd() + '/lib/plugins/runtime.js')) {
      let msg = '警告：未检测到runtime，biscuit-plugin可能无法正常工作。请升级至最新版Miao-Yunzai以使用biscuit-plugin'
      if (!await redis.get('miao:runtime-warning')) {
        await relpyPrivate(msg.qq, msg)
        await redis.set('miao:runtime-warning', 'true', { EX: 3600 * 24 })
      } else {
        console.log(msg)
      }
    }
  }
}
export default Index
