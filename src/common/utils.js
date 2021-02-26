//1.防抖函数
export function debounce(func,delay) {
  let timer = null;
  //防抖：对func进一步封装 返回一个新函数
  //timer：定时器 如果timer还没有被执行 就又触发这防抖函数 则定时器重新开始计时 等待执行
  //delay若没有传值 默认为0 但由于事件执行机制 依然会有延迟执行 即还会有防抖效果
  return function(...args){
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>{
      func.apply(this,args);
    },delay);
  }
}

//2.时间戳格式化函数
//正则表达式 字符串匹配 利器
//将服务器返回的时间戳（距离unix元年1970的秒数）转化成date对象（ms）格式化为需要的日期字符串
export function formatDate(date,fmt) {
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+' : date.getMonth() +1,
    'd+' : date.getDate() ,
    'h+' : date.getHours() ,
    'm+' : date.getMinutes(),
    's+' : date.getSeconds(),
  };
  function padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }
  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str:padLeftZero(str));
    }
  }
  return fmt;
};

