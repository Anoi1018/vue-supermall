<template>
    <div v-if="Object.keys(goodInfo).length!==0" class="base-info">
      <div class="info-title">{{goodInfo.title}}</div>
      <div class="info-price">
        <span class="n-price">{{goodInfo.newPrice}}</span>
        <span class="o-price">{{goodInfo.oldPrice}}</span>
        <span class="discount" v-if="goodInfo.discount" :style="{backgroundColor:goodInfo.discountBgColor}"><p>{{goodInfo.discount}}</p></span>
      </div>
      <div class="info-other">
        <div>{{goodInfo.columns[0]}}</div>
        <div>{{goodInfo.columns[1]}}</div>
        <div>{{goodInfo.services[goodInfo.services.length-1].name}}</div>
      </div>
      <div class="info-service">
        <span v-for="index in goodInfo.services.length-1" class="info-service-item" :key="index">
          <img :src="goodInfo.services[index-1].icon">
          <span>{{goodInfo.services[index-1].name}}</span>
        </span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "DetailGoodInfo",
      props:{
          goodInfo: {
            type:Object,
            default(){
              return {};
            }
          }
      }
    }
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999999;
  border-bottom: 5px solid #f2f5f8;
}
  .info-title {
    color:black;
    margin: 10px 5px;
  }

  .info-price span{
    display: inline-block;
  }
  .n-price{
    color:#666666;
    font-size:20px;
    font-weight: bold;
    margin: 10px;
  }
  .o-price {
    text-decoration: line-through;
  }
  .discount {
    border-radius: 15%;
    /*background-color: #ff5777;*/
    color: white;
    padding:5px;
    font-size:12px;
    font-weight: bold;
    /*!*  让元素上浮一些：使用相对定位即可*!*/
    /*position: relative;*/
    /*top:-8px;*/
    transform: translateY(-10px);
    margin-left: 10px;
    /*以下可以增加span内文字间距-->不生效*/
    /*display:block;*/
    /*word-spacing:-5px;*/
    text-align: center;
  }
  .discount p{
    letter-spacing:2px;
  }

  .info-other {
    line-height: 30px;
    display: flex;
    text-align: center;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }
  .info-other div {
    flex: 1;
  }

  .info-service {
    display:flex;
    font-size: 14px;
    color:black;
    margin: 20px 5px;
    flex-wrap: wrap;
    justify-content: space-between;
  }
.info-service-item span {
    flex:1;
    display: inline-block;
    overflow: hidden;
    font-size: 12px;
  color: #333333;
  }
.info-service-item img {
    width: 14px;
    height:14px;
    transform: translateY(1px);
    margin-right:2px;
  }

</style>
