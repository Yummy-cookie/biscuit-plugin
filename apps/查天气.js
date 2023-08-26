import plugin from '../../../lib/plugins/plugin.js';
import { segment } from 'oicq';
import { createCanvas, registerFont } from 'canvas';

export class WeatherInfoPlugin extends plugin {
  constructor() {
    super({
      name: '查询天气信息',
      description: '查询天气信息',
      event: 'message',
      priority: 1,
      rules: [
        {
          reg: /^#查天气(.*)$/,
          fnc: this.queryWeather.bind(this)
        }
      ]
    });
  }

  async queryWeather(event) {
    const region = event.msg.match(/^#查天气(.+)$/)[1];
    const url = `https://api.vvhan.com/api/weather?city=${region}`;
    const response = await fetch(url).catch((err) => logger.error(err));
    if (!response) {
      logger.error('接口请求失败');
      return await this.reply('接口请求失败');
    }
    
    const canvas = createCanvas(400, 200);
    const ctx = canvas.getContext('2d');

    const res = await response.json();
    const error = res.success;
    if (error !== true) {
      await event.reply('查询出错');
      return;
    }

    ctx.font = '16px Arial';
    ctx.fillText(`城市：${res.city}`, 10, 30);
    ctx.fillText(`时间：${res.info.date}`, 10, 60);
    ctx.fillText(`天气状态：${res.info.type}`, 10, 90);

    const image = canvas.toDataURL(); 

    await event.reply(segment.image(image)); 
  }
}