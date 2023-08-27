import plugin from '../../../lib/plugins/plugin.js'
import {segment} from 'oicq'


export class example extends plugin {
	constructor() {
		super({
			/** 功能名称 */
			name: 'kun音乐',
			/** 功能描述 */
			dsc: '简单开发示例',
			/** https://oicqjs.github.io/oicq/#events */
			event: 'message',
			/** 优先级，数字越小等级越高 */
			priority: 5000,
			rule: [{
					/** 命令正则匹配 */
					reg: '^#?kun音乐.*$',
					/** 执行方法 */
					fnc: 'kunawa'
				}
			]
		})
	}

	async kunawa(e) {
		await this.e.reply(segment.record('https://api.lolimi.cn/api/kunkun/k?key=IBVWYwYGKEgdG4dErUL1SwXdmO'))
	}
}