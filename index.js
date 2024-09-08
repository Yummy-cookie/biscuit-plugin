import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appsDir = path.join(__dirname, 'apps');

let successCount = 0;
let failureCount = 0;

const startTime = Date.now();
let apps = {};

logger.info(`\t${chalk.cyan('「饼干插件载入中···(cmc)」')}`);

try {
    const files = (await fs.readdir(appsDir)).filter(file => file.endsWith('.js'));

    const loadModules = files.map(async file => {
        const filePath = pathToFileURL(path.join(appsDir, file)).href;
        try {
            const moduleExports = await import(filePath);
            const defaultExport = moduleExports?.default || moduleExports[Object.keys(moduleExports)[0]];
            const name = path.basename(file, '.js');
            apps[name] = defaultExport;
            logger.info(`饼干插件成功载入：${chalk.green(name)}`);
            successCount++;
        } catch (error) {
            const name = path.basename(file, '.js');
            logger.error(`饼干插件载入错误：${chalk.red(name)}`);
            logger.error(error);
            failureCount++;
        }
    });

    await Promise.all(loadModules);

} catch (error) {
    logger.error(`读取文件时出错：${chalk.red(error.message)}`);
}

const endTime = Date.now();
const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);

logger.info(`${chalk.cyan('-------------------')}`);
logger.info(`${chalk.green('饼干插件载入完成')}`);
logger.info(`成功加载：${chalk.green(successCount)} 个`);
logger.info(`加载失败：${chalk.red(failureCount)} 个`);
logger.info(`总耗时：${chalk.yellow(elapsedTime)} 秒`);
logger.info(`${chalk.cyan('-------------------')}`);

export { apps };
