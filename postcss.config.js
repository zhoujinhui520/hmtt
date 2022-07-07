module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // 表示vant和github-markdown-css字体要除以37.5 我们自己的要除75,因为我们的设计稿是750
        return (file.indexOf('vant') !== -1 || file.indexOf('github-markdown-css') !== -1) ? 37.5 : 75
      },
      // propList设置的又那些样式属性名,比如width,hirth可以转换
      propList: ['*']
    }
  }
}
