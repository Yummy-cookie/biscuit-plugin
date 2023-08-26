/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */
export const helpCfg = {
  title: '饼干帮助',
  subTitle: 'biscuit-bot && biscuit-Plugin',
  columnCount: 3,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
  style: {
    fontColor: '#ceb78b',
    descColor: '#eee',
    contBgColor: 'rgba(6, 21, 31, .5)',
    contBgBlur: 4,
    headerBgColor: 'rgba(6, 21, 31, .4)',
    rowBgColor1: 'rgba(6, 21, 31, .2)',
    rowBgColor2: 'rgba(6, 21, 31, .35)'
  },
  bgBlur: false
}

export const helpList = [
{
  group: '饼干插件功能',
  list: [{
    icon: 37,
    title: '#查天气＋地区',
    desc: '查看某地的天气哦！'
  }, {
    icon: 38,
    title: '#ping 域名/IP',
    desc: '看看你服务器的状况吧'
  }, {
    icon: 39,
    title: '#查IP+IP',
    desc: '看看你好兄弟的位置'
  }, {
    icon: 40,
    title: '#火星ai+文字',
    desc: '问AI一些问题'  
  }, {
    icon: 41,
    title: '#kun音乐',
    desc: '小黑子，看你呢'
  }]
  }, { 
    group: '管理命令，仅管理员可用', 
    auth: 'master', 
    list: [{ 
    icon: 35, 
    title: '#biscuit更新', 
    desc: '更新饼干插件' 
}]
}]
export const isSys = true