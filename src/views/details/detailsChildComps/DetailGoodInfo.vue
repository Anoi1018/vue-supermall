<template>
    <div v-if="Object.keys(goodInfo).length!==0" class="goods-info">
      <div class="info-desc clear-fix">
        <div class="start"></div>
        <div class="desc">{{goodInfo.desc}}</div>
        <div class="end"></div>
      </div>
      <div class="info-key">{{goodInfo.detailImage[0].key}}</div>
      <div class="info-list">
        <img v-for="(item,index) in goodInfo.detailImage[0].list"  alt=""
             :key="index"
             :src="item"
             @load="goodImageLoad"
        >
      </div>
    </div>
</template>

<script>
    export default {
        name: "DetailGoodInfo",
      data(){
          return {
            count:0,
            imageLength:0
          }
      },
      props: {
          goodInfo: {
            type:Object,
            default(){
              return {};
            }
          }
      },
      methods: {
        goodImageLoad(){
          if(++this.count ===this.imageLength){
            this.$emit('goodImageLoad');
          }
        }
      },
      //监听 获取detailInfo对象的变化 从空对象变得有key 再计算图片的长度
      //注意 watch是对象形式 被监听的对象是函数形式
      watch: {
        goodInfo(){
            this.imageLength = this.goodInfo.detailImage[0].list.length;
          }
      }
    }
</script>

<style scoped>
  .goods-info {
    padding:20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc {
    padding: 0 15px;
  }
  .info-key {
    font-size:20px ;
    font-weight: bold;
    margin:10px 0 10px 15px;
    color: #333333;
  }
  .info-list img{
    width:100%;
    padding:0 10px;
  }

/*  难点：实现小方块加横线效果*/
  .info-desc .start ,.info-desc .end{
    /*实现横线--div*/
    width:90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .info-desc .start {
    float: left;
  }
  .info-desc .end {
    float:right;
  }
  .info-desc .start::before,.info-desc .end::after {
    content:'';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333333;
    bottom: 0;
  }
  .info-desc .end::after{
    right: 0;
  }
  .info-desc .desc{
    padding:15px 0;
    font-size: 16px;
  }

</style>
