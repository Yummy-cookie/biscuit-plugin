import plugin from '../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
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
    })
  }
  
  async tqcx(e) {
  const region = e.msg.match(/^#查天气(.+)$/)[1];
  const url = `https://api.vvhan.com/api/weather?city=${region}`;
  const response = await fetch(url).catch((err) => logger.error(err));
  if (!response) {
      logger.error('接口请求失败')
      return await this.reply('接口请求失败')
  };
  let res = await response.json();
  let error = res.success
  if ( error !== true ) {
      await e.reply('查询出错');
      return
  };
  let msg = [
        "城市：", segment.text(res.city), "\n",
        "时间：", segment.text(res.info.date), "\n",
        "天气状态：", segment.text(res.info.type), "\n",
        "最高温：", segment.text(res.info.high), "\n",
        "最低温：", segment.text(res.info.low), "\n",
        "风向：", segment.text(res.info.fengxiang), "\n",
        "风级：", segment.text(res.info.fengli), "\n",
        "tip：",segment.text(res.info.tip)
     ];
  await e.reply(msg);
  }
 
}
  
  
 