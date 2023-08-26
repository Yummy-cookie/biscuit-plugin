import plugin from '../../../lib/plugins/plugin.js';
import { segment } from 'oicq';
import axios from 'axios'; 

class ExamplePlugin extends plugin {
  constructor() {
    super({
      name: 'Ping网址',
      description: 'Ping网址功能',
      event: 'message',
      priority: 5000,
      rules: [
        {
          reg: /^#ping (.+)$/,
          fnc: this.pingUrl.bind(this)
        }
      ]
    });
  }

  async pingUrl(e) {
    const url = e.msg.match(/^#ping (.+)$/)[1];
    const apiUrl = `https://api.qingvps.cn/API/ping.php?url=${encodeURIComponent(url)}`;

    try {
      const response = await axios.get(apiUrl); 
      const responseData = response.data;
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