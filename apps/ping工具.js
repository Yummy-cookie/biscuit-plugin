import plugin from '../../../lib/plugins/plugin.js';
import fetch from 'node-fetch';

export class PingPlugin extends plugin {
    constructor() {
        super({
            name: 'Ping',
            dsc: '饼干ping',
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
        const url = `https://api.pearktrue.cn/api/website/ping.php?url=${encodeURIComponent(ip)}`;
        
        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.code === 200) {
                const { data } = result;
                const reply = `
Ping 结果:
主机: ${data.host}
IP: ${data.ip}
位置: ${data.location}
最小延迟: ${data.min}
平均延迟: ${data.average}
最大延迟: ${data.max}
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
