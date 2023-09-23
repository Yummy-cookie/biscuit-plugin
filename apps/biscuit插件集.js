import plugin from '../../../lib/plugins/plugin.js'
import { segment } from 'oicq'


export class example extends plugin {
	constructor() {
		super({
			name: 'biscuit插件集',
			dsc: 'biscuit插件集',
			event: 'message',
			priority: 5000,
			rule: [{
					reg: '^#ping (.+)$',
                    fnc: 'pingUrl'
				}
			]
		})
	}
	
async pingUrl(e) {
  try {
    const match = e.msg.match(/^#ping\s+(.+)/);
    
    if (!match) {
      await e.reply('请输入要 ping 的域名');
      return;
    }
    
    const url = match[1];
    const apiUrl = `https://api.lolimi.cn/API/ping/?url=${url}`;
    
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    
    const { IP, address, small, max, average, Times } = responseData.data;
    
    const msg = [
      `饼干查询域名：\n${url}\n`,
      '查询域名ip：  ', segment.text(IP), '\n',
      '服务器位置：   ', segment.text(address), '\n',
      '平均速度：   ', segment.text(average), `ms`, '\n',
      '域名地址：   ', segment.text(url)
    ];
    
    await e.reply(msg);
  } catch (error) {
    console.error(error);
    await e.reply('发生错误，请稍后重试');
  }
}

}