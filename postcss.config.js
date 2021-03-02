module.exports = {
  plugins: {
    //autoprefixer-浏览器前缀处理工具-解析css文件并且添加浏览器前缀到css规则里
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗的宽度，对应的是我们设计稿的宽度（750）retina-高清屏-一面积点上两个像素点
      //设计稿：iphone6（750 * 1334）
      viewportHeight: 667,//视窗的高度，对应的是我们设计稿的高度（也可以不配置）
      unitPrecision: 5, //指定‘px’转化为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', //指定需要转化成的视窗单位 建议使用vw
      selectorBlackList: ['ignore','tab-bar'],//指定不需要转化的类 这里[‘tab-bar’]是以字符串表达的正则表达式 包含了tab-bar-item
      //可以给不需要转化的类后面添加ignore类 class='tab-bar ignore'
      minPixelValue: 1, //小于或等于“1px”不转化为视窗单位
      mediaQuery: false, //允许在媒体查询中转换‘px’
      exclude:[/TabBar/] //可以用exclude来排除不要转化的类 必须正则表达式
    },
  }
}
