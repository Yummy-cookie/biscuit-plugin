import fs from "node:fs/promises";
import chalk from 'chalk';
import path from 'path';

logger.info(chalk.cyan('----------\(≧▽≦)/---------'));
logger.info(chalk.yellow(`biscuit-plugin初始化~`));
logger.info(chalk.yellow(`发送饼干帮助解锁功能哦~`));
logger.info(chalk.magenta('-------------------------'));

async function loadApps() {
  try {
    const appFiles = await fs.readdir('./plugins/biscuit-plugin/apps');
    const appPromises = appFiles
      .filter((file) => file.endsWith('.js'))
      .map((file) => import(`./apps/${file}`));

    const appResults = await Promise.all(appPromises);

    const apps = {};
    for (let i = 0; i < appResults.length; i++) {
      const name = appFiles[i].replace('.js', '');
      apps[name] = appResults[i][Object.keys(appResults[i])[0]];
    }

    return apps;
  } catch (error) {
    logger.error(`载入插件错误：${logger.red(name)}`);
    logger.error(error);
    return {};
  }
}

export const apps = await loadApps();
