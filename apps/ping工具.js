import axios from 'axios';

export default class PingPlugin {
  constructor({
    name = "ping",
    dsc = "Ping IP 地址",
    event = "message",
    priority = 5000,
    rule = [{ reg: /^#ping\s+(\S+)/, fnc: "handlePing" }]
  }) {
    this.name = name;
    this.dsc = dsc;
    this.event = event;
    this.priority = priority;
    this.rule = rule;
  }

  // 假设 this.e 和 this.reply 是在外部上下文中定义的
  setContext(e, reply) {
    this.e = e;
    this.reply = reply;
  }

  async handlePing() {
    const match = this.e.msg.match(this.rule[0].reg);
    
    if (!match || match.length < 2) {
      return this.reply("请提供一个有效的 IP 地址或域名。");
    }
  
    const ipOrHost = match[1];
  
    try {
      const response = await axios.get(`https://api.gumengya.com/Api/Ping?format=json&ip=${ipOrHost}&type=ipv4`);
      const data = response.data;
  
      if (response.status === 200) {
        if (data && data.code === 200) {
          const result = `
            Ping 结果:
            - IP: ${data.data.ip}
            - 节点: ${data.data.node}
            - 主机: ${data.data.host}
            - 域名 IP: ${data.data.domain_ip}
            - 最小延迟: ${data.data.ping_min}
            - 平均延迟: ${data.data.ping_avg}
            - 最大延迟: ${data.data.ping_max}
            - 位置: ${data.data.location}
          `;
          this.reply(result);
        } else {
          // 返回 API 错误消息
          this.reply(`Ping 失败: ${data.msg || '请检查 IP 地址或域名。'}`);
        }
      } else {
        this.reply('发生未知错误，请稍后再试。');
      }
    } catch (error) {
      console.error(error);
      // 捕获网络错误或其他错误
      this.reply('在尝试 ping IP 地址或域名时发生错误，请稍后再试。');
    }
  }
}
