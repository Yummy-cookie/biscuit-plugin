import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs';
import path from 'path';
import cfg from '../../../lib/config/config.js';
import axios from 'axios';

let BiscuitGroup = 691477645;
let cwd = process.cwd().replace(/\\/g, '/');
let GithubStatic = `${cwd}/plugins/biscuit-plugin/resources/Github/GithubStatic.json`;

export class MonitorTask extends plugin {
    constructor() {
        super({
            name: '监控github仓库状态',
            dsc: '监控github仓库状态',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: /^#?检测(仓库|github|fan)更新$/,
                    fnc: 'Monitor',
                },
            ],
        });
        this.task = {
            name: 'biscuit-plugin仓库更新检测',
            cron: '0 0/4 * * * ?',
            fnc: () => {
                this.MonitorTask(true);
            },
        };
    }

    async Monitor(e) {
        await this.MonitorTask(false, e);
    }

    async MonitorTask(Auto = false, e = null) {
        if (!Auto) {
            await this.SelectMonitor(e);
            return true;
        }

        const openStatus = await this.getOpenStatus();
        if (!openStatus || await this.isAlreadyNotified()) return true;

        const githubData = await this.fetchGithubCommits();
        if (!githubData) return true;

        const { sha, commit } = githubData[0];
        if (this.hasNewCommit(sha)) {
            await this.updateLocalData(githubData[0]);
            await this.sendNotifications(commit);
        }
        return true;
    }

    async getOpenStatus() {
        return JSON.parse(await redis.get('Biscuit:FunctionOFF'));
    }

    async isAlreadyNotified() {
        return await redis.get('Biscuit:Github:PushStatus');
    }

    async fetchGithubCommits() {
        try {
            const res = await axios.get('https://api.github.com/repos/Yummy-cookie/biscuit-plugin/commits');
            return res.data;
        } catch (error) {
            logger.error('获取 GitHub 提交时出错:', error);
            return null;
        }
    }

    hasNewCommit(sha) {
        const GithubStaticJson = this.readLocalData();
        return GithubStaticJson.sha !== sha;
    }

    readLocalData() {
        if (!fs.existsSync(GithubStatic)) {
            fs.writeFileSync(GithubStatic, '{}');
        }
        return JSON.parse(fs.readFileSync(GithubStatic));
    }

    async updateLocalData(commitData) {
        fs.writeFileSync(GithubStatic, JSON.stringify(commitData));
        logger.info(logger.magenta('>>>已更新GithubStatic.json'));
    }

    async sendNotifications(commit) {
        const cnTime = new Date(commit.committer.date).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false });
        const msgList = [
            `[biscuit-plugin插件更新]\nContributors：${commit.committer.name}\nDate:${cnTime}\nMessage:${commit.message}\nUrl:${commit.html_url}`,
        ];
        const acgList = [{ message: msgList, nickname: 'biscuit-plugin更新', user_id: Bot.uin }];
        let forMsg = await Bot.makeForwardMsg(acgList);

        forMsg.data = forMsg.data
            .replace(/\n/g, '')
            .replace(/<title color="#777777" size="26">(.+?)<\/title>/g, '___')
            .replace(/___+/, '<title color="#777777" size="26">biscuit-plugin插件更新</title>');

        if (Array.from(Bot.getGroupList().keys()).includes(BiscuitGroup)) {
            await Bot.pickGroup(Number(BiscuitGroup)).sendMsg(forMsg);
        }

        await this.sendToMasters(commit.message, forMsg);
    }

    async sendToMasters(commitMessage, forMsg) {
        const masterList = cfg.masterQQ;

        if (commitMessage.includes('[不推送]') || !commitMessage) {
            logger.info(logger.magenta('[biscuit-plugin]>>>检测到[不推送]标签，已跳过本次推送'));
            return true;
        }

        for (let master of masterList) {
            if (master.toString().length <= 11) {
                logger.info(logger.magenta(`Master:${master}`));
                try {
                    await Bot.pickFriend(Number(master)).sendMsg(forMsg);
                    break;
                } catch (err) {
                    logger.info(`QQ号${master}推送失败，已往下走~`);
                }
            }
        }
    }

    async SelectMonitor(e) {
        const githubData = await this.fetchGithubCommits();
        if (!githubData) return;

        const { commit } = githubData[0];
        logger.info(logger.magenta('>>>手动检测biscuit-plugin仓库最新代码'));
        const cnTime = new Date(commit.committer.date).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false });
        await e.reply(`[biscuit-plugin最近更新]\nContributors：${commit.committer.name}\nDate:${cnTime}\nMessage:${commit.message}\nUrl:${commit.html_url}`);
        return true;
    }
}
