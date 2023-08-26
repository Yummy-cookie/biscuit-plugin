import fetch from 'node-fetch';
import { plugin } from '../../../lib/plugins/plugin.js';

export class ExamplePlugin extends plugin {
  constructor() {
    super({
      name: '查询IP信息',
      dsc: '查询IP信息',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#查(IP|ip)(.*)$',
          fnc: 'ymcx'
        }
      ]
    });
  }

  async ymcx(e) {
    const str = e.msg.match(/#查IP(.+)/);
    const regex = /\d+\.\d+\.\d+\.\d+/;
    const match = regex.exec(str[1]);
    const ip = match[0];
    const url = `https://api.vvhan.com/api/getIpInfo?ip=${ip}`;
    const response = await fetch(url).catch((err) => logger.error(err));
    if (!response) {
      return await this.reply('接口请求失败');
    }
    const res = await response.json();
    const res2 = res.info;
    const msg = [
      "IP：", res.ip, "\n",
      "国：", res2.country, "\n",
      "省：", res2.prov, "\n",
      "城：", res2.city, "\n",
      "运营商：", res2.lsp
    ];
    await e.reply(msg);
  }
}