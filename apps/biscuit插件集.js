import plugin from '../../../lib/plugins/plugin.js';
import { segment } from 'oicq';

export class example extends plugin {
	constructor() {
		super({
			name: 'biscuit插件集',
			dsc: 'biscuit插件集',
			event: 'message',
			priority: 5000,
			rule: [
				{
					reg: '^#ping (.+)$',
					fnc: 'pingUrl'
				},
				{
					reg: '^#?每日新闻.*$',
					fnc: 'dailynews'
				},
				{
					reg: '#每日沙雕新闻',
					fnc: 'ynews'
				}
			]
		});
	}

	async pingUrl(e) {
		try {
			const match = e.msg.match(/^#ping\s+(.+)/);

			if (!match) {
				await e.reply('请输入要 ping 的域名');
				return;
			}

			const url = match[1];
			const apiUrl = `https://api.gumengya.com/Api/Ping?format=json&ip=${url}&type=ipv4`;

			const response = await fetch(apiUrl);
			const responseData = await response.json();

			if (responseData.code !== 200 || !responseData.data) {
				await e.reply('无法查到这个域名的信息哦');
				return;
			}

			const { host, ip, location, ping_avg } = responseData.data;

			const msg = [
				`饼干查询域名：${url}\n`,
				'查询域名ip:',
				segment.text(ip),
				'\n',
				'服务器位置:',
				segment.text(location),
				'\n',
				'平均速度:',
				segment.text(ping_avg),
			];

			await e.reply(msg);
		} catch (error) {
			console.error(error);
			await e.reply('ping错误');
		}
	}

	async dailynews(e) {
		this.e.reply(segment.image('https://api.avdgw.com/api/mr60s?key=VCr6xhxtDgNtd1fV7UOIKj15yi'));
		return true;
	}

	async ynews(e) {
		try {
			const match = e.msg.match(/#每日沙雕新闻/);

			if (!match) {
				await e.reply('请求失败');
				return;
			}

			const url = match[1];
			const apiUrl = `https://api.pearktrue.cn/api/shadiao/`;

			const response = await fetch(apiUrl);
			const responseData = await response.json();

			const { title, content } = responseData.data;

			const msg = [segment.text(title), '\n', segment.text(content)];

			await e.reply(msg);
		} catch (error) {
			console.error(error);
			await e.reply('请求失败');
		}
	}
}
