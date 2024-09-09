import plugin from '../../../lib/plugins/plugin.js';
import fetch from 'node-fetch';

export class PingPlugin extends plugin {
    constructor() {
        super({
            name: 'Ping',
            dsc: 'Ping',
            event: 'message',
            priority: 2000,
            rule: [
                {
                    reg: '^#?(ping|PING) (.+)$',
                    fnc: 'ping'
                }
            ]
        });
    }

    async ping() {
        const input = this.e.msg.replace(/^#?(ping|PING) /, '').trim();
        if (!input) {
            return await this.e.reply('请输入要 ping 的域名或 IP 地址。');
        }

        const ip = input; 
        const url = `https://api.ahfi.cn/api/ping?target=${ip}`;
        
        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.code === 200) {
                const { data } = result;
                const reply = `
Ping 结果:
主机: ${data.host}
IP: ${data.ip}
位置: ${data.Location}
最小延迟: ${data.Delay.MinimumDelay}
平均延迟: ${data.Delay.AverageDelay}
最大延迟: ${data.Delay.MaximumDelay}
                `.trim();
                await this.e.reply(reply);
            } else {
                await this.e.reply(`错误: ${result.msg}`);
            }
        } catch (error) {
            console.error(error);
            await this.e.reply('请求失败，请稍后再试。');
        }
    }
}
