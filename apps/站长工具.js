import fetch from 'node-fetch';
import plugin from '../../../lib/plugins/plugin.js';

export class CombinedPlugin extends plugin {
  constructor() {
    super({
      name: '站长工具',
      dsc: '包含查询IP信息、查询天气信息和Ping网址功能',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#查(IP|ip)(.*)$',
          fnc: 'handleQueryIpInfo'
        },
        {
          reg: '^#查天气(.*)$',
          fnc: 'handleQueryWeather'
        },
        {
          reg: '^#ping (.+)$',
          fnc: 'handlePingUrl'
        }
      ]
    });
  }

  async handleQueryIpInfo(e) {
    const str = e.msg.match(/^#查(IP|ip)(.*)$/); 
    if (!str) {
      return await this.reply('命令格式不正确'); 
    }
    const ip = str[2].trim(); 
    const url = `https://api.vvhan.com/api/getIpInfo?ip=${ip}`;
    
    try {
      const response = await fetch(url);
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
    } catch (err) {
      console.error(err); 
      return await this.reply('查询失败'); 
    }
  }

  async handleQueryWeather(e) {
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

  async handlePingUrl(e) {
    const url = e.msg.match(/^#ping (.+)$/)[1];
    const apiKey = 'IBVWYwYGKEgdG4dErUL1SwXdmO';
    const apiUrl = `https://api.lolimi.cn/api/zzgj/ping?key=${apiKey}&url=${encodeURIComponent(url)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('接口请求失败');
      }

      const responseData = await response.json(); 
      const pingData = responseData.data;
      
      const msg = `饼干查询链接：${pingData.url} \nIP地址：${pingData.IP} \n位置：${pingData.address} \n平均响应时间：${pingData.average} ms \n响应次数：${pingData.num} \n丢包率：${pingData.abandon}`;

      await e.reply(msg);
    } catch (error) {
      console.error(error);
      await e.reply('发生错误，请稍后重试');
    }
  }
}