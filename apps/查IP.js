import plugin from '../../../lib/plugins/plugin.js';
import { segment } from 'oicq';

export class IPInfoPlugin extends plugin {
  constructor() {
    super({
      name: '查询IP信息',
      description: '查询IP信息',
      event: 'message',
      priority: 5000,
      rules: [
        {
          reg: /^#查(IP|ip)(.*)$/,
          fnc: this.queryIPInfo.bind(this)
        }
      ]
    });
  }

  async queryIPInfo(event) {
    const message = event.msg;
    const match = message.match(/^#查(IP|ip)(.+)/);
    if (!match) {
      return; // 不匹配格式，不执行
    }

    const ip = match[1].trim();
    const url = `https://api.vvhan.com/api/getIpInfo?ip=${ip}`;
    
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      const res2 = responseData.info;

      const msg = [
        "IP：", segment.text(responseData.ip), "\n",
        "国：", segment.text(res2.country), "\n",
        "省：", segment.text(res2.prov), "\n",
        "城：", segment.text(res2.city), "\n",
        "运营商：", segment.text(res2.lsp)
      ];

      await event.reply(msg);
    } catch (error) {
      console.error(error);
      await event.reply('接口请求失败');
    }
  }
}