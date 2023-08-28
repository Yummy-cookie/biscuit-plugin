import { segment } from 'oicq';
import fetch from 'node-fetch';

const FIXED_PASSWORD = '\u0062\u0069\u0073\u0063\u0075\u0069\u0074\u002d\u0070\u006c\u0075\u0067\u0069\u006e';
let isAuthorized = false;

export class ExamplePlugin extends plugin {
  constructor() {
    super({
      name: 'Mid Journey',
      dsc: 'Mid Journey',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#biscuit设置密码(.+)$',
          fnc: 'setPassword'
        },
        {
          reg: '^#mid绘图(.+)$',
          fnc: 'interactWithMarsAI',
          auth: true
        }
      ]
    });
  }

  async setPassword(e) {
    const receivedPassword = e.msg.match(/^#biscuit设置密码(.+)$/)[1];
    if (receivedPassword === FIXED_PASSWORD) {
      isAuthorized = true;
      await e.reply('密码设置成功，你现在可以使用插件发送 #mid绘图 命令');
    } else {
      isAuthorized = false;
      await e.reply('密码设置失败，只有正确的密码才能设置');
    }
  }

  async interactWithMarsAI(e) {
    if (!isAuthorized) {
      await e.reply('请先设置正确的密码以获取授权');
      return;
    }

    const message = e.msg.match(/^#mid绘图(.+)$/)[1];

    const apiKey = 'IBVWYwYGKEgdG4dErUL1SwXdmO';
    const mj1Url = `https://api.lolimi.cn/api/ai/mj1?key=${apiKey}&msg=${encodeURIComponent(message)}`;

    try {
      const mj1Response = await fetch(mj1Url);
      if (!mj1Response.ok) {
        throw new Error('mj1 接口请求失败');
      }
      const mj1Data = await mj1Response.json();
      const drawingId = mj1Data.data;

      const mj2Url = `https://api.lolimi.cn/api/ai/mj2?key=${apiKey}&id=${drawingId}`;
      let drawingComplete = false;
      let imageUrl = '';

      while (!drawingComplete) {
        const mj2Response = await fetch(mj2Url);
        if (!mj2Response.ok) {
          throw new Error('mj2 接口请求失败');
        }
        const mj2Data = await mj2Response.json();
        drawingComplete = mj2Data.data === '100%';
        imageUrl = mj2Data.imageurl;

        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const msg = segment.image(imageUrl);
      await e.reply(msg);
    } catch (error) {
      console.error(error);
      await e.reply('发生错误，请稍后重试');
    }
  }
}