import fs from "node:fs/promises";
import chalk from 'chalk';
import path from 'path';

const logger = {
  info: (message) => console.log(chalk.cyan(message)),
  error: (message) => console.error(chalk.red(message)),
  red: chalk.red,
  yellow: chalk.yellow,
  cyan: chalk.cyan,
  magenta: chalk.magenta
};

async function loadApps() {
  try {
    const appDir = path.join(__dirname, 'apps');
    const appFiles = await fs.readdir(appDir);
    const appPromises = appFiles
      .filter((file) => file.endsWith('.js'))
      .map((file) => import(path.join(appDir, file)));

    const appResults = await Promise.all(appPromises);

    const apps = {};
    for (let i = 0; i < appResults.length; i++) {
      const name = appFiles[i].replace('.js', '');
      apps[name] = appResults[i][Object.keys(appResults[i])[0]];
    }

    return apps;
  } catch (error) {
    logger.error(`载入插件错误：${logger.red('biscuit-plugin')}`);
    logger.error(error);
    return {};
  }
}

export const apps = await loadApps();
