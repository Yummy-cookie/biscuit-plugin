import fetch from 'node-fetch';

export class ExamplePlugin {
  constructor() {
    this.name = '火星AI';
    this.dsc = '火星AI功能';
    this.event = 'message';
    this.priority = 5000;
    this.rule = [
      {
        reg: '^#火星 (.+)$',
        fnc: 'sendMessageToMarsAI'
      }
    ];
  }

  async sendMessageToMarsAI(e) {
    const message = e.msg.match(/^#火星 (.+)$/)[1];
    const apiUrl = `https://api.lolimi.cn/api/ai/hx?key=IBVWYwYGKEgdG4dErUL1SwXdmO&message=${encodeURIComponent(message)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('接口请求失败');
      }

      const responseData = await response.json(); 
      const aiAnswer = responseData.answer;

      await e.replyText(aiAnswer); 
    } catch (error) {
      console.error(error);
      await e.reply('发生错误，请稍后重试');
    }
  }
}