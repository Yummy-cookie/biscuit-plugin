import fetch from 'node-fetch';

export class DailyNewsPlugin extends plugin {
    constructor() {
        super({
            name: '每日早报插件',
            dsc: '发送每日早报图片',
            event: 'message',
            priority: 2000,
            rule: [
                {
                    reg: '^#?看早报$',
                    fnc: 'sendNewsImage'
                }
            ]
        });
    }

    async sendNewsImage(e) {
        try {
            const imageUrl = 'https://api.ahfi.cn/api/MorningNews'; 
            const imageMessage = await this.getImageMessage(imageUrl);
            await this.reply(imageMessage); 
        } catch (error) {
            console.error('[每日早报插件][sendNewsImage] 发送早报时发生错误:', error);
            await this.reply('发送早报失败，请稍后再试。');
        }
    }

    async getImageMessage(imageUrl) {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('无法获取早报图片');
        }

        const imageBuffer = await response.buffer(); 
        return imageBuffer; 
    }
}
