/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */
export const helpCfg = {
  title: '饼干帮助',
  subTitle: 'Yunzai-Bot && biscuit-Plugin',
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
  }
}

export const helpList = [
{
  group: '饼干插件功能',
  list: [{
    icon: 72,
    title: '#ping (域名或IP)',
    desc: 'ping一下你的服务器吧'
    },{
        icon: 75,
    title: '#每日新闻',
    desc: '看看今天的新闻吧'
    },{
        icon: 90,
    title: '#每日沙雕新闻',
    desc: '看看今天的沙雕新闻(你脑子呢？)'
    },{
        icon: 76,
    title: '#随机网易云',
    desc: '听听音乐吧'
    },{
        icon: 74,
    title: '#随机动漫音乐',
    desc: '回忆一下之前看过动漫的音乐吧'
    },{
        icon: 79,
    title: '#查询命令 (命令)',
    desc: '给你的脑子长长知识吧'
   }]
  }, { 
    group: '管理命令，仅管理员可用', 
    auth: 'master', 
    list: [{ 
    icon: 35, 
    title: '#饼干更新', 
    desc: '更新饼干插件' 
}]
}]
export const isSys = true