import fs from 'node:fs/promises';
import path from 'path';
import chalk from 'chalk';
import { Version } from './components/index.js';

const loadApps = async () => {
  try {
    const folderPath = './plugins/biscuit-plugin/apps';

    const files = await fs.readdir(folderPath);
    const filteredFiles = files.filter((file) => file.endsWith('.js'));

    const importPromises = filteredFiles.map(async (file) => {
      try {
        const modulePath = path.resolve(folderPath, file);
        const module = await import(modulePath);
        return { file, module };
      } catch (error) {
        return { file, error };
      }
    });

    const results = await Promise.allSettled(importPromises);

    const apps = {};
    results.forEach((result) => {
      const name = result.value.file.replace('.js', '');
      if (result.status === 'fulfilled') {
        apps[name] = result.value.module[Object.keys(result.value.module)[0]];
      } else {
        logger.error(`载入插件错误：${logger.red(name)}`);
        logger.error(result.reason);
      }
    });

    logger.info(chalk.blue('----------\(≧▽≦)/---------'));
    logger.info(chalk.blue(`饼干插件${Version.version}载入成功`));
    logger.info(chalk.blue(`发帮助解锁更多内容`));
    logger.info(chalk.blue(`---------------------`));

    return apps;
  } catch (error) {
    logger.error('无法读取插件文件夹:', error);
    return {};
  }
};

export default loadApps;
