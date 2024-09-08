/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */

export const helpCfg = {
  title: '饼干帮助',
  subTitle: 'Yunzai-Bot & biscuit-plugin',
  columnCount: 3,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
  style: {
    fontColor: '#ceb78b',
    descColor: '#eee',
    contBgColor: 'rgba(6, 21, 31, .5)',
    contBgBlur: 3,
    headerBgColor: 'rgba(6, 21, 31, .4)',
    rowBgColor1: 'rgba(6, 21, 31, .2)',
    rowBgColor2: 'rgba(6, 21, 31, .35)'
  },
  bgBlur: false
}

export const helpList = [
{
  group: '饼干插件功能',
  list: []
},{
  group: '其他查询指令',
  list: [{
    icon: 79,
    title: '#饼干版本 #饼干更新日志',
    desc: '其他命令'
  }]
}, {
  group: '管理命令，仅管理员可用',
  auth: 'master',
  list: [{
    icon: 35,
    title: '#饼干更新 #饼干强制更新',
    desc: '更新饼干插件'
  }]
}]

export const isSys = true
