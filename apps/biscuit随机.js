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

    sendPixivImage(e) {
        fetch('https://image.anosu.top/pixiv/json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let imageData = data[0];
                let title = imageData.title;
                let tags = imageData.tags.join(', ');
                let imageUrl = imageData.url;

                let message = [
                    segment.text(`Title: ${title}\nTags: ${tags}\n`),
                    segment.image(imageUrl)
                ];

                e.reply(message, (err) => {
                    if (err) {
                        console.error('Error sending message:', err);
                        e.reply('发送图片时出现错误，请稍后再试。');
                    }
                });
            })
    .catch(error => {
                console.error('Error fetching image:', error);
                e.reply('获取图片时出现错误，请稍后再试。');
            });
    }
}
