import plugin from '../../../lib/plugins/plugin.js'
import { segment } from 'oicq'


export class example extends plugin {
	constructor() {
		super({
			name: '随机网易云',
			dsc: '随机网易云',
			event: 'message',
			priority: 5000,
			rule: [{
					reg: '^#?随机网易云.*$',
					fnc: 'biscuit-music'
				}
			]
		})
	}

	async biscuit-music(e) {
		this.e. reply(uploadRecord('https://api.uomg.com/api/rand.music?sort=%E7%83%AD%E6%AD%8C%E6%A6%9C&format=mp3'))
		return true
	}
}