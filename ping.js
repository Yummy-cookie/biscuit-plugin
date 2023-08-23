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
    const apiUrl = `https://api.qingvps.cn/API/ping.php?url=${encodeURIComponent(url)}`;

    try {
      const response = await fetch(apiUrl, { method: 'GET' });
      if (!response.ok) {
        throw new Error('接口请求失败');
      }

      const responseData = await response.text(); 

      const msg = `查询链接：${url} ${responseData}`;

      await e.reply(msg);
    } catch (error) {
      console.error(error);
      await e.reply('发生错误，请稍后重试');
    }
  }
}