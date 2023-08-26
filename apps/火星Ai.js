import { segment } from 'oicq';
import fetch from 'node-fetch';

export class ExamplePlugin extends plugin {
  constructor() {
    super({
      name: '火星AI交互',
      dsc: '与火星AI进行交互的功能',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#火星ai(.+)$',
          fnc: 'interactWithMarsAI'
        }
      ]
    });
  }

  async interactWithMarsAI(e) {
    const message = e.msg.match(/^#火星ai(.+)$/)[1];
    const apiKey = 'IBVWYwYGKEgdG4dErUL1SwXdmO';
    const apiUrl = `https://api.lolimi.cn/api/ai/hx?key=${apiKey}&message=${encodeURIComponent(message)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('接口请求失败');
      }

      const responseData = await response.json();
      const aiMessage = responseData.message;
      const aiAnswer = responseData.answer;

      const msg = `${aiAnswer}`;
      await e.reply(msg);
    } catch (error) {
      console.error(error);
      await e.reply('发生错误，请稍后重试');
    }
  }
}