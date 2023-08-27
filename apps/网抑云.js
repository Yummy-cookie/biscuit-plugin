import plugin from '../../../lib/plugins/plugin.js'
import {segment} from 'icqq'


export class example extends plugin {
	constructor() {
		super({
			/** 功能名称 */
			name: '网抑云',
			/** 功能描述 */
			dsc: '网抑云',
			/** https://oicqjs.github.io/oicq/#events */
			event: 'message',
			/** 优先级，数字越小等级越高 */
			priority: 5000,
			rule: [{
					/** 命令正则匹配 */
					reg: '^#?网抑云.*$',
					/** 执行方法 */
					fnc: 'Music'
				}
			]
		})
	}

	async Music(e) {
		e.reply(segment.record('https://api.lolimi.cn/api/djwyy/wyy?key=IBVWYwYGKEgdG4dErUL1SwXdmO'))
	}
}