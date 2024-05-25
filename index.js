import fs from 'node:fs';
import chalk from 'chalk';
import { Version } from './components/index.js';

let ret = []

const files = fs
  .readdirSync('./plugins/biscuit-plugin/apps')
  .filter((file) => file.endsWith('.js'))

files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}

logger.info(chalk.blue('----------\(≧▽≦)/---------'))
logger.info(chalk.blue(`饼干插件${Version.version}载入成功`))
logger.info(chalk.blue(`发帮助解锁更多内容`))
logger.info(chalk.blue(`---------------------`));
export { apps }
