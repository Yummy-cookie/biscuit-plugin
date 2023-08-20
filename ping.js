import plugin from '../../lib/plugins/plugin.js';
import fetch from 'node-fetch';

export class ExamplePlugin extends plugin {
  constructor() {
    super({
      name: 'Ping网址',
      dsc: 'Ping网址功能',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#ping (.+)$',
          fnc: 'pingUrl'
        }
      ]
    });
  }

  async pingUrl(e) {
    const url = e.msg.match(/^#ping (.+)$/)[1];
    const apiUrl = `https://api.gmit.vip/Api/Ping?format=json&ip=${encodeURIComponent(url)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('接口请求失败');
      }

      const responseData = await response.json(); // Parsing response as JSON
      const pingData = responseData.data;
      
      const msg = `查询链接：${pingData.ip} \n节点：${pingData.node} \n最慢：${pingData.ping_max} \n最快：${pingData.ping_min} \n平均：${pingData.ping_avg} \n位置：${pingData.location}`;

      await e.reply(msg);
    } catch (error) {
      console.error(error);
      await e.reply('发生错误，请稍后重试');
    }
  }
}