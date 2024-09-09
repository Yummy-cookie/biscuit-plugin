import plugin from '../../../lib/plugins/plugin.js';
import fetch from 'node-fetch';
import { segment } from 'oicq'; 

export class DailyImagePlugin extends plugin {
    constructor() {
        super({
            name: '每日图片插件',
            dsc: '发送每日早安图片',
            event: 'message',
            priority: 2000,
            rule: [
                {
                    reg: '^#?看早安$',
                    fnc: 'sendImage'
                }
            ]
        });
    }

    async sendImage() {
        try {
            const imageUrl = 'https://api.ahfi.cn/api/MorningNews';
            const imageMessage = await this.getImageMessage(imageUrl);
            await this.e.reply(imageMessage);
        } catch (error) {
            console.error(error);
            await this.e.reply('发送图片失败，请稍后再试。');
        }
    }

    async getImageMessage(imageUrl) {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('无法获取图片');
        }

        const imageBuffer = await response.buffer(); 
        return segment.image(imageBuffer);
    }
}
