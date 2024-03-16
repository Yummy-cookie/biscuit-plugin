import { Cfg, Common, Data, Version } from '../../components/index.js'
import fs from 'node:fs'
import lodash from 'lodash'

const _path = process.cwd()
const helpPath = `${_path}/plugins/biscuit-plugin/resources/help`

const Help = {
  async version (e) {
    return await Common.render('help/version-info', {
      currentVersion: Version.version,
      changelogs: Version.changelogs,
      elem: 'cryo'
    }, { e, scale: 1.2 })
  }
}
export default Help
