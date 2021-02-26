
// module.exports = {
//   //先写一个configureWebpack 表示你准备配置webpageconfig
//   configureWebpack: {
//     //配置路径相关的时候用resolve 可以解决路径相关的问题
//     resolve: {
//       //别名ps：.vue等相关的其实已经写了，这里只需要写我们自己需要的
//       alias: {
//         //默认有@  他指向的是：src
//         'assets': '@/assets',
//         'common': '@/common',
//         'components': '@/components',
//         'network': '@/network',
//         'views': '@/views',
//         //router 一般情况下不用配置，因为只有在main.js中引用一次，如果有需要也可以在这里配置
//         // 'router': '@/router'
//       }
//     }
//   }
// }
//用于配置文件别名 方便路径的寻找
const path = require('path');//引入path模块
function resolve(dir){
  return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports={
  chainWebpack:(config)=>{
    config.resolve.alias
      .set('@',resolve('./src'))
      .set('components',resolve('./src/components'))
      .set('assets',resolve('./src/assets'))
      .set('common',resolve('./src/common'))
      .set('network',resolve('./src/network'))
      .set('views',resolve('./src/views'))
    //set第一个参数：设置的别名，第二个参数：设置的路径

  }
}
