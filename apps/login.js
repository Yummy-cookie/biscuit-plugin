import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'your-smtp-host', // stmp服务器
  port: 587, // stmp端口
  secure: false, // false是tls,true是ssl
  auth: {
    user: 'your-email@example.com', // stmp账号
    pass: 'your-email-password', // stmp账号的密码
  },
});

const emailRecipient = 'your-email@example.com'; // 接收人的邮箱

function sendNotificationEmail() {
  const mailOptions = {
    from: 'your-email@example.com', // 发送的邮件账户
    to: emailRecipient,
    subject: 'QQ机器人已掉线提醒',
    text: 'QQ机器人已掉线，请检查并重新运行。',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('邮件发送失败:', error);
    } else {
      console.log('邮件发送成功:', info.response);
    }
  });
}

const isQQOnline = () => {
};

if (!isQQOnline()) {
  sendNotificationEmail();
}
