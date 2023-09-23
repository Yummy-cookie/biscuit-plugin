import plugin from '../../../lib/plugins/plugin.js'
import { segment } from 'oicq'


export class example extends plugin {
	constructor() {
		super({
			name: 'biscuit音乐集',
			dsc: 'biscuit音乐集',
			event: 'message',
			priority: 5000,
			rule: [{
					reg: '^#?随机网易云.*$',
					fnc: 'biscuitmusic'
					},{
					reg: '^#?随机动漫音乐.*$',
					fnc: 'biscuitmusic1'
				}
			]
		})
	}

	async biscuitmusic(e) {
		this.e. reply(uploadRecord('https://api.uomg.com/api/rand.music?sort=%E7%83%AD%E6%AD%8C%E6%A6%9C&format=mp3'))
		return true
	}
	async biscuitmusic1(e) {
		this.e. reply(uploadRecord('https://api.paugram.com/acgm/?list=1&play=true'))
		return true
	}
}