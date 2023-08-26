import plugin from '../../lib/plugins/plugin.js'
import fetch from 'node-fetch'

export class example extends plugin {
  constructor () {
    super({
      /** 功能名称 */
      name: '查询IP信息',
      /** 功能描述 */
      dsc: '查询IP信息',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 5000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^#查(IP|ip)(.*)$',
          /** 执行方法 */
          fnc: 'ymcx'
        }
      ]
    })
  }

  async ymcx (e) {
    logger.info('[用户命令]', e.msg)
    const str = e.msg.match(/#查IP(.+)/);
    //await e.reply(str);
    const regex = /\d+\.\d+\.\d+\.\d+/;
    const match = regex.exec(str);
    const ip = match[0];
    //await e.reply(ip);
    let url = `https://api.vvhan.com/api/getIpInfo?ip=${ip}`;
    let response = await fetch(url).catch((err) => logger.error(err))
    if (!response) {
      logger.error('接口请求失败')
      return await this.reply('接口请求失败')
    }
    let res = await response.json();
    //await e.reply(res.id);
    let res2 = res.info
    let msg = [
        "IP：", segment.text(res.ip), "\n",
        "国：", segment.text(res2.country), "\n",
        "省：", segment.text(res2.prov), "\n",
        "城：", segment.text(res2.city), "\n",
        "运营商：",segment.text(res2.lsp)
      ];
    await e.reply(msg);
  }
}
//"运营商：", segment.text(res.wl)