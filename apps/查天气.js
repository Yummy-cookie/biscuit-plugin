import fetch from 'node-fetch';
import plugin from "../../../lib/plugins/plugin.js";

export class ExamplePlugin extends plugin {
  constructor() {
    super({
      name: '查询天气信息',
      dsc: '查询天气信息',
      event: 'message',
      priority: 1,
      rule: [
        {
          reg: '^#查天气(.*)$',
          fnc: 'tqcx'
        }
      ]
    });
  }

  async tqcx(e) {
    const region = e.msg.match(/^#查天气(.+)$/)[1];
    const url = `https://api.vvhan.com/api/weather?city=${region}`;
    const response = await fetch(url).catch((err) => logger.error(err));
    if (!response) {
      return await this.reply('接口请求失败');
    }
    const res = await response.json();
    const error = res.success;
    if (error !== true) {
      await e.reply('查询出错');
      return;
    }
    const msg = [
      "城市：", res.city, "\n",
      "时间：", res.info.date, "\n",
      "天气状态：", res.info.type, "\n",
      "最高温：", res.info.high, "\n",
      "最低温：", res.info.low, "\n",
      "风向：", res.info.fengxiang, "\n",
      "风级：", res.info.fengli, "\n",
      "tip：", res.info.tip
    ];
    await e.reply(msg);
  }
}