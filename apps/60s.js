import plugin from '../../../lib/plugins/plugin.js';
import fetch from 'node-fetch';
import fs from 'fs';

export class DailyImagePlugin extends plugin {
    constructor() {
        super({
            name: '每日图片插件',
            dsc: '发送早安图片',
            event: 'message',
            priority: 2000,
            rule: [
                {
                    reg: '^#?看60s$',
                    fnc: 'sendImage'
                }
            ]
        });
    }

    async sendImage() {
        try {
            const imageUrl = await this.fetchImage();
            await this.sendGroupImage(imageUrl);
        } catch (error) {
            console.error(error);
            await this.e.reply('发送图片失败，请稍后再试。');
        }
    }

    async fetchImage() {
        const response = await fetch('https://api.ahfi.cn/api/MorningNews');
        if (!response.ok) {
            throw new Error('网络错误');
        }
        const data = await response.json();
        return data.data;
    }

    async sendGroupImage(imageUrl) {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('无法获取图片');
        }

        const imageBuffer = await response.buffer();
        await this.e.reply({ type: 'group', file: imageBuffer });
    }
}
