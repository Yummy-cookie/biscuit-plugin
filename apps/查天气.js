import plugin from '../../../lib/plugins/plugin.js';

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

    const res = await response.json();
    const error = res.success;
    if (error !== true) {
      await event.reply('查询出错');
      return;
    }

    const weatherInfo = `
      城市：${res.city}
      时间：${res.info.date}
      天气状态：${res.info.type}
    `;

    await event.reply(weatherInfo);
  }
}