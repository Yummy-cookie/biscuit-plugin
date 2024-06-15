import plugin from '../../../lib/plugins/plugin.js';
import { segment } from 'oicq';
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
            // 发送请求获取图片数据
            let response = await fetch('https://image.anosu.top/pixiv/json');
            let data = await response.json();
            let imageData = data[0];

            // 解析数据
            let title = imageData.title;
            let tags = imageData.tags.join(', ');
            let imageUrl = imageData.url;

            // 创建消息
            let message = [
                segment.text(`Title: ${title}\nTags: ${tags}\n`),
                segment.image(imageUrl)
            ];

            // 发送消息
            await e.reply(message);
        } catch (error) {
            // 错误处理
            console.error('Error fetching or sending image:', error);
            await e.reply('获取图片时出现错误，请稍后再试。');
        }
    }
}
