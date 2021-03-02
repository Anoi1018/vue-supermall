<template>
  <div class="bottomBar">
    <div class="bar-item bar-left">
      <div>
        <img class="icon service" src="@/assets/img/detail/detail_bottom1.jpg">
        <span class="text">客服</span>
      </div>
      <div>
        <img class="icon shop" src="@/assets/img/detail/detail_bottom2.jpg">
        <span class="text">店铺</span>
      </div>
      <div>
        <img class="icon select" src="@/assets/img/detail/detail_bottom3.jpg">
        <span class="text">收藏</span>
      </div>
    </div>
    <div  class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DetailBottomBar",
      methods:{
        addToCart(){
          this.$emit('addToCart');
        }
      }
    }
</script>

<style scoped>
.bottomBar {
  height: 49px;
  width:100%;
  background-color: #ffffff;
  position: fixed;
  bottom: 0px;
  display: flex;
  text-align: center;
}

.bar-item {
  flex: 1;
  display: flex;
}
.bar-item>div{
  flex:1;
}
.bar-item .text{
  font-size: 13px;
  margin-bottom: 4px;
}

.bar-left .icon{
  display: block;
  width: 18px;
  height: 18px;
  margin: 5px auto 3px;
  /*background:url('~assets/img/detail/detail_bottom.png') 0 0/100%;*/

}
/*.bar-left .service{*/
/*  background-position: 0 -54px;*/
/*}*/
/*.bar-left .shop {*/
/*  background-position: 0 -98px;*/
/*}*/
.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 49px;
}

.bar-right .cart {
  background-color: #ffe817;
  color: #333333;
}

.bar-right .buy {
  background-color:#f69;
}
.sport-ball {
  position: absolute;
  left: 225px;
  bottom: 20px;
}

</style>
