import fetch from 'node-fetch';

class ExamplePlugin {
  constructor() {
    this.name = 'Ping网址';
    this.description = 'Ping网址功能';
    this.event = 'message';
    this.priority = 5000;
    this.rules = [
      {
        reg: /^#ping (.+)$/,
        fnc: this.pingUrl.bind(this)
      }
    ];
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
      const pingData = responseData.split('\n').filter(line => line.trim() !== '');

      const msg = pingData.join('\n');

      await e.reply(msg);
    } catch (error) {
      console.error(error);
      await e.reply('发生错误，请稍后重试');
    }
  }
}

export default ExamplePlugin;