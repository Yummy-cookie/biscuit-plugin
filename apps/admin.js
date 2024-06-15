import fs from 'node:fs';
import lodash from 'lodash';
import { Cfg, Common, Version, App } from '../components/index.js';

let keys = lodash.map(Cfg.getCfgSchemaMap(), 'key');
let app = App.init({
  id: 'biscuitadmin',
  name: '饼干设置',
  desc: '饼干设置'
});

let sysCfgReg = new RegExp(`^#饼干设置\\s*(${keys.join('|')})?\\s*(.*)$`);

app.reg({
  sysCfg: {
    rule: sysCfgReg,
    fn: sysCfg,
    desc: '【#管理】系统设置'
  }
});

export default app;

const _path = process.cwd();
const resPath = `${_path}/plugins/biscuit-plugin/resources/`;
const plusPath = `${resPath}/miao-res-plus/`;

/**
 * 检查是否有权限执行命令
 * @param {object} e - 消息事件对象
 * @returns {boolean} - 是否有权限
 */
const checkAuth = async function (e) {
  if (!e.isMaster) {
    await e.reply(`只有主人才能命令饼干哦~\n(*/ω＼*)`);
    return false;
  }
  return true;
};

/**
 * 处理系统设置命令
 * @param {object} e - 消息事件对象
 * @returns {boolean}
 */
async function sysCfg(e) {
  if (!await checkAuth(e)) {
    return true;
  }

  let regRet = sysCfgReg.exec(e.msg);
  if (!regRet) {
    return true;
  }

  if (regRet[1]) {
    let val = regRet[2] || '';
    let cfgSchema = Cfg.getCfgSchemaMap()[regRet[1]];

    val = parseValue(cfgSchema, val);
    Cfg.set(cfgSchema.cfgKey, val);
  }

  let schema = Cfg.getCfgSchema();
  let cfg = Cfg.getCfg();
  let imgPlus = fs.existsSync(plusPath);

  // 渲染图像
  return await Common.render('admin/index', {
    schema,
    cfg,
    imgPlus,
    isMiao: Version.isMiao
  }, { e, scale: 1.4 });
}

/**
 * 解析配置值
 * @param {object} cfgSchema - 配置架构对象
 * @param {string} val - 输入值
 * @returns {string|number|boolean} - 解析后的值
 */
function parseValue(cfgSchema, val) {
  if (cfgSchema.input) {
    return cfgSchema.input(val);
  } else if (cfgSchema.type === 'str') {
    return (val || cfgSchema.def) + '';
  } else {
    return cfgSchema.type === 'num' ? (val * 1 || cfgSchema.def) : !/关闭/.test(val);
  }
}
