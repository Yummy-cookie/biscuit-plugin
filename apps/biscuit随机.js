import plugin from '../../../lib/plugins/plugin.js';
import fetch from 'node-fetch';

export class PixivPlugin extends plugin {
    constructor() {
        super({
            name: 'PixivPlugin',
            description: '发送包含图片和文字的聊天记录',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^#来份涩图',
                    func: 'sendPixivImage'
                }
            ]
        });
    }

    async sendPixivImage(e) {
        try {
            const response = await fetch('https://image.anosu.top/pixiv/json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            const imageData = data[0];
            const title = imageData.title;
            const tags = imageData.tags.join(', ');
            const imageUrl = imageData.url;

            const message = `Title: ${title}\nTags: ${tags}\n${imageUrl}`;

            await e.reply(message);
        } catch (error) {
            console.error('Error fetching or sending image:', error);
            await e.reply('获取或发送图片时出现错误，请稍后再试。');
        }
    }
}
