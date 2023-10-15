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
					fnc: 'biscuitmusic'
				},{
				reg: '^#?随机动漫音乐.*$',
					fnc: 'biscuitmusic1'
					}
			]
		})
	}

	async biscuitmusic(e) {
		this.e.reply(segment.record('https://api.cenguigui.cn/api/netease/?&type=mp3'))
	}
	
	async biscuitmusic1(e) {
		this.e.reply(segment.record('https://api.paugram.com/acgm/?list=1&play=true'))
	}
}