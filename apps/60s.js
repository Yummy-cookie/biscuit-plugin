import plugin from '../../../lib/plugins/plugin.js';

export class example extends plugin {
	constructor() {
		super({
			name: 'biscuit插件集',
			dsc: 'biscuit插件集',
			event: 'message',
			priority: 5000,
			rule: [
				{
					reg: '^#?看60s.*$',
					fnc: 'dailynews'
				}
			]
		});
	}

	async dailynews(e) {
		this.e.reply(segment.image('https://api.ahfi.cn/api/MorningNews'));
		return true;
	}

}
