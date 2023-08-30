import plugin from '../../../lib/plugins/plugin.js'
import {segment} from 'icqq'


export class example extends plugin {
	constructor() {
		super({
			name: '网抑云',
			dsc: '网抑云',
			event: 'message',
			priority: 5000,
			rule: [{
					reg: '^#?网抑云.*$',
					fnc: 'Music'
				}
			]
		})
	}

	async Music(e) {
		await this.e.reply(segment.record('https://api.lolimi.cn/api/djwyy/wyy?key=aAoDRHcDe9a4fll8sPgrovNC1h'))
	}
}