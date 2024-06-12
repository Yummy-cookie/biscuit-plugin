import fs from 'node:fs'
import lodash from 'lodash'
import { exec } from 'child_process'
import { Cfg, Common, Data, Version, App } from '../components/index.js'
import makemsg from "../../../lib/common/common.js"
import { execSync } from "child_process";
import fetch from 'node-fetch'

let keys = lodash.map(Cfg.getCfgSchemaMap(), (i) => i.key)
let app = App.init({
  id: 'biscuitadmin',
  name: '饼干设置',
  desc: '饼干设置'
})

let sysCfgReg = new RegExp(`^#饼干设置\\s*(${keys.join('|')})?\\s*(.*)$`)

app.reg({
  sysCfg: {
    rule: sysCfgReg,
    fn: sysCfg,
    desc: '【#管理】系统设置'
  }
})

export default app

const _path = process.cwd()
const resPath = `${_path}/plugins/biscuit-plugin/resources/`
const plusPath = `${resPath}/miao-res-plus/`

const checkAuth = async function (e) {
  if (!e.isMaster) {
    e.reply(`只有主人才能命令饼干哦~
    (*/ω＼*)`)
    return false
  }
  return true
}

async function sysCfg(e) {
  if (!await checkAuth(e)) {
    return true
  }

  let cfgReg = sysCfgReg
  let regRet = cfgReg.exec(e.msg)
  let cfgSchemaMap = Cfg.getCfgSchemaMap()

  if (!regRet) {
    return true
  }

  if (regRet[1]) {
    // 设置模式
    let val = regRet[2] || ''

    let cfgSchema = cfgSchemaMap[regRet[1]]
    if (cfgSchema.input) {
      val = cfgSchema.input(val)
    } else if (cfgSchema.type === 'str') {
      val = (val || cfgSchema.def) + ''
    } else {
      val = cfgSchema.type === 'num' ? (val * 1 || cfgSchema.def) : !/关闭/.test(val)
    }
    Cfg.set(cfgSchema.cfgKey, val)
  }

  let schema = Cfg.getCfgSchema()
  let cfg = Cfg.getCfg()
  let imgPlus = fs.existsSync(plusPath)

  // 渲染图像
  return await Common.render('admin/index', {
    schema,
    cfg,
    imgPlus,
    isMiao: Version.isMiao
  }, { e, scale: 1.4 })
}