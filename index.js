import fs from 'node:fs/promises';
import chalk from 'chalk';
import path from "path"
import { Version } from './components/index.js';
let AppName = "biscuit-plugin"
const moduleCache = new Map()
let loadedFilesCount = 0
let loadedFilesCounterr = 0
let apps
const startTime = Date.now()
const { apps: loadedApps, loadedFilesCount: count, loadedFilesCounterr: counterr } = await appsOut({ AppsName: "apps" })
const endTime = Date.now()
apps = loadedApps
loadedFilesCount = count
loadedFilesCounterr = counterr
logger.info(chalk.blue('----------\(≧▽≦)/---------'))
logger.info(chalk.blue(`饼干插件${Version.version}载入成功`))
logger.info(chalk.blue(`共加载了 ${loadedFilesCount} 个插件文件 ${loadedFilesCounterr} 个失败`))
logger.info(chalk.blue(`耗时 ${endTime - startTime} 毫秒`))
logger.info(chalk.blue(`发帮助解锁更多内容`))
logger.info(chalk.blue(`---------------------`));
export { apps }
async function appsOut({ AppsName }) {
  const firstName = path.join('plugins', AppName);
  const filepath = path.resolve(firstName, AppsName);
  let loadedFilesCount = 0;
  let loadedFilesCounterr = 0;
  const apps = {};

  try {
    const jsFilePaths = await traverseDirectory(filepath);
    await Promise.all(jsFilePaths.map(async (item) => {
      try {
        const allExport = moduleCache.has(item)
          ? moduleCache.get(item)
          : await import(`file://${item}`);

        for (const key of Object.keys(allExport)) {
          if (typeof allExport[key] === 'function' && allExport[key].prototype) {
            let className = key;
            if (Object.prototype.hasOwnProperty.call(apps, className)) {
              let counter = 1;
              while (Object.prototype.hasOwnProperty.call(apps, `${className}_${counter}`)) {
                counter++;
              }
              className = `${className}_${counter}`;
              logger.info(`[biscuit-plugin] 类名 ${key} 重命名为 ${className} : ${item}`);
            }
            apps[className] = allExport[key];
            loadedFilesCount++;
          }
        }
      } catch (error) {
        logger.error(`[biscuit-plugin] 加载 ${item} 文件失败: ${error.message}`);
        loadedFilesCounterr++;
      }
    }));
  } catch (error) {
    logger.error('读取插件目录失败:', error.message);
  }

  return { apps, loadedFilesCount, loadedFilesCounterr };
}


async function traverseDirectory(dir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true })
    const jsFiles = []
    for await (const file of files) {
      const pathname = path.join(dir, file.name)
      if (file.isDirectory()) {
        jsFiles.push(...await traverseDirectory(pathname))
      } else if (file.name.endsWith(".js")) {
        jsFiles.push(pathname)
      }
    }
    return jsFiles
  } catch (error) {
    logger.error("读取插件目录失败:", error.message)
    return []
  }
}
