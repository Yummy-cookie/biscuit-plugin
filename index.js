import fs from "node:fs";
import chalk from 'chalk'
import path from 'path'

try {
  await import('axios')
} catch (error) {
  if (error.stack?.includes('Cannot find package')) {
    logger.warn('--------biscuit依赖缺失--------')
    logger.warn(`biscuit-plugin 缺少依赖将无法使用 ${logger.yellow('AI绘图')}`)
    logger.warn(`如需使用请运行：${logger.red('pnpm add axios -w')}`)
    logger.warn('---------------------------')
    logger.debug(decodeURI(error.stack))
  } else {
    logger.error(`biscuit载入依赖错误：${logger.red('axios')}`)
    logger.error(decodeURI(error.stack))
}
}
logger.info(chalk.cyan('----------\(≧▽≦)/---------'))
logger.info(chalk.yellow(`biscuit-plugin初始化~`))
logger.info(chalk.yellow(`发送饼干帮助解锁功能哦~`))
logger.info(chalk.magenta('-------------------------'))

const files = fs

  .readdirSync("./plugins/biscuit-plugin/apps")
  .filter((file) => file.endsWith(".js"));

let ret = [];

files.forEach((file) => {
  ret.push(import(`./apps/${file}`));
});

ret = await Promise.allSettled(ret);

let apps = {};

for (let i in files) {
  let name = files[i].replace(".js", "");

  if (ret[i].status != "fulfilled") {
    logger.error(`载入插件错误：${logger.red(name)}`);
    logger.error(ret[i].reason);
    continue;
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]];
}
export { apps };
