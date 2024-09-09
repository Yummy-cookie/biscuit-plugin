export const style = {
  // 主文字颜色
  fontColor: '#ffcc00', // 明亮的金色

  // 主文字阴影：横向距离 垂直距离 阴影大小 阴影颜色
  fontShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)', // 更明显的阴影

  // 描述文字颜色
  descColor: '#ffffff', // 亮白色

  /* 面板整体底色，使用互换后的 slategray 渐变，透明度 35% */
  contBgColor: 'linear-gradient(135deg, rgba(47, 79, 79, 0.35), rgba(112, 128, 144, 0.35))',

  // 面板底图毛玻璃效果，数字越大越模糊，0-10，可为小数
  contBgBlur: 5, // 增加模糊效果

  // 板块标题栏底色，使用渐变
  headerBgColor: 'linear-gradient(135deg, rgba(34, 193, 195, 0.8), rgba(0, 0, 0, 0.8))',

  // 帮助奇数行底色，使用透明度
  rowBgColor1: 'rgba(255, 255, 255, 0.1)', // 半透明白色

  // 帮助偶数行底色，使用稍深的颜色
  rowBgColor2: 'rgba(255, 255, 255, 0.2)', // 更深的半透明白色
}
