import plugin from '../../../lib/plugins/plugin.js';
import fetch from 'node-fetch';
import fs from 'fs';
import YAML from 'yaml';

const CONFIG_PATH = '../config/60s.yaml';

export class DailyImagePlugin extends plugin {
    constructor() {
        super({
            name: '每日图片插件',
            dsc: '每天定时发送图片到指定QQ群',
            event: 'message',
            priority: 2000,
            rule: [
                {
                    reg: '^#?(设置群号) (\\d+)$',
                    fnc: 'setGroupId'
                },
                {
                    reg: '^#?看60s$',
                    fnc: 'sendImage'
                }
            ]
        });

        this.ensureConfigFile();
        this.groupId = this.loadGroupId(); 
        this.startDailyImageTask(); 
    }

    ensureConfigFile() {
        if (!fs.existsSync(CONFIG_PATH)) {
            const defaultConfig = { groupId: null };
            fs.writeFileSync(CONFIG_PATH, YAML.stringify(defaultConfig), 'utf8');
        }
    }

    loadGroupId() {
        const file = fs.readFileSync(CONFIG_PATH, 'utf8');
        const config = YAML.parse(file);
        return config.groupId || null; 
    }

    saveGroupId(groupId) {
        let config = {};
        const file = fs.readFileSync(CONFIG_PATH, 'utf8');
        config = YAML.parse(file);
        config.groupId = groupId; 
        fs.writeFileSync(CONFIG_PATH, YAML.stringify(config), 'utf8'); 
    }

    async setGroupId() {
        const input = this.e.msg.replace(/^#?(设置群号) /, '').trim();
        const groupId = input;

        if (!groupId || isNaN(groupId)) {
            return await this.e.reply('请输入有效的群号。');
        }

        this.groupId = groupId;
        this.saveGroupId(groupId); 
        await this.e.reply(`群号已设置为: ${this.groupId}`);
    }

    async sendImage() {
        if (!this.groupId) {
            return await this.e.reply('群号未设置，无法发送图片。请先设置群号。');
        }

        try {
            const imageUrl = await this.fetchImage();
            await this.sendGroupImage(this.groupId, imageUrl);
        } catch (error) {
            console.error(error);
            await this.e.reply('获取图片失败，请稍后再试。');
        }
    }

    async fetchImage() {
        const response = await fetch('https://api.jun.la/60s.php?format=image');
        if (!response.ok) {
            throw new Error('网络错误');
        }
        const data = await response.json();
        return data.url; 
    }

    startDailyImageTask() {
        const sendDailyImage = async () => {
            if (!this.groupId) return; 
            const imageUrl = await this.fetchImage();
            await this.sendGroupImage(this.groupId, imageUrl);
        };

        const hour = 6;
        const minute = 0;

        const now = new Date();
        const firstSendTime = new Date();
        firstSendTime.setHours(hour);
        firstSendTime.setMinutes(minute);
        firstSendTime.setSeconds(0);

        if (firstSendTime < now) {
            firstSendTime.setDate(firstSendTime.getDate() + 1);
        }

        const timeUntilFirstSend = firstSendTime - now;
        setTimeout(() => {
            sendDailyImage();
            setInterval(sendDailyImage, 24 * 60 * 60 * 1000); 
        }, timeUntilFirstSend);
    }

    async sendGroupImage(groupId, imageUrl) {
        await this.e.reply({ type: 'group', groupId: groupId, image: imageUrl });
    }
}
