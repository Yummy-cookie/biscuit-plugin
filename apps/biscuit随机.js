import plugin from '../../../lib/plugins/plugin.js';
import fetch from 'node-fetch';


export class example extends plugin {
    constructor() {
        super({
            name: 'Pixiv',
            dsc: 'example',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^#来份涩图',
                    fnc: 'fetchPixivImage'
                }
            ]
        });
    }

    async fetchPixivImage(e) {
        try {
            const match = e.msg.match(/^#来份涩图/);

            const keyword = match[1];
            const apiUrl = `https://image.anosu.top/pixiv/json`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            const { title, tags, url } = data[0];

            const textMsg = `${title}\nTags: ${tags.join(', ')}`;
            await e.reply(textMsg);

            await e.sendImage(url);
        } catch (error) {
            console.error(error);
            await e.reply('获取Pixiv图片信息失败');
        }
    }
}
