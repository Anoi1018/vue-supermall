import {request} from "./request";
//一、通过iid 得到的详情页数据部分
export function getDetail(iid) {
  //不能写id 会500错误
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

//1.轮播图下商品基本信息封装类
export class baseInfo {
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price;
    this.realPrice = itemInfo.lowNowPrice;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = services;
  }
}

//2.商家信息封装类
export class shopInfo{
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.goodsCount = shopInfo.cGoods;
    this.score = shopInfo.score;
  }
}
//3.商品参数信息封装类
export class GoodsParam {
  constructor(info,rule) {
    //注：images可能没有值 （某些商品有值 某些没有值）
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
//4.用户评论信息封装类
export class  commentInfo {
  constructor(list) {
    this.avatar = list.user.avatar;
    this.name = list.user.uname;
    this.content = list.content;
    this.time = list.created;
    this.style = list.style;
    this.images = list.images;
  }
}

//二、通过recommend 得到的详情页推荐信息
export function getRecommend() {
  return request({
    url:'/recommend'
  })
}





