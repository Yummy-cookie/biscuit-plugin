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
                    reg: '^#随机涩图',
                    func: 'sendPixivImage'
                }
            ]
        });
    }


    async sendPixivImage(e) {
        let response = await fetch('https://image.anosu.top/pixiv/json');
        let data = await response.json();
        let imageData = data[0];


        let title = imageData.title;
        let tags = imageData.tags.join(', ');
        let imageUrl = imageData.url;


        let message = [
            segment.text(`Title: ${title}\nTags: ${tags}\n`),
            segment.image(imageUrl)
        ];

        await e.reply(message);
    }
}
