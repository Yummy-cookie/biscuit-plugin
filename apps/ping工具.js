import plugin from '../../../lib/plugins/plugin.js';
import fetch from 'node-fetch';

export class PingPlugin extends plugin {
    constructor() {
        super({
            name: 'Ping Plugin',
            dsc: 'Ping a domain or IP address',
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
    
        const url = `https://api.gumengya.com/Api/Ping?format=json&ip=${encodeURIComponent(input)}&type=ipv4`;
        
        try {
            const response = await fetch(url);
            const result = await response.json();
    
            if (result.code === 200) {
                const { data } = result;
                const reply = `
    饼干Ping 结果:
    IP: ${data.ip}
    节点: ${data.node}
    主机: ${data.host}
    PING 信息: ${data.domain_ip}
    最小延迟: ${data.ping_min}
    平均延迟: ${data.ping_avg}
    最大延迟: ${data.ping_max}
    位置: ${data.location}
    `;
                await this.e.reply(reply);
            } else {
                await this.e.reply(`错误: ${result.msg}`);
            }
        } catch (error) {
            console.error(error);
            await this.e.reply('请求失败，请稍后再试。');
        }
    }
    