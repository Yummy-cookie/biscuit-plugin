import plugin from '../../lib/plugins/plugin.js'
import { segment } from "oicq";
import fetch from "node-fetch";
import lodash from 'lodash'

// 使用方法：#查手机号xxx
// 向日葵作

//1.定义命令规则
export class example extends plugin {
  constructor() {
    super({
      /** 功能名称 */
      name: '查手机号',
      /** 功能描述 */
      dsc: '查手机号',
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 9000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: "#查手机号(.*)$",
          /** 执行方法 */
          fnc: 'chaqbang'
        },
      ]
    })
  }
  //执行方法
  async chaqbang(e) {
      var match = e.msg.match(/#查手机号(.+)/);
      var phone = match ? match[1] : "";
      if (isNaN(phone)) {
        await e.reply('请输入正确手机号');
        return
      }
      let url = `https://api.asilu.com/phone/?phone=${phone}`;
      let response = await fetch(url).catch((err) => logger.error(err))
      let res = await response.json();
      let error = res.error;
      if ( error == "手机号码不正确" ) {
        await e.reply('请输入正确手机号');
        return
      } else if ( error == "" ) {
        await e.reply('请输入正确手机号');
        return
      }
      await e.reply(error);
      let msg = [
        `葵葵查询手机号：${phone}\n`,
        "省：", segment.text(res.province), "\n",
        "市：", segment.text(res.city), "\n",
        "服务商：", segment.text(res.sp),
      ];
      await e.reply(msg);
    }
}
