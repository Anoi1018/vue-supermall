<template>
  <div class="goods-item" @click="detailTo">
<!--    <img :src="showImage" alt="" @load="imageLoad">-->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsListItem.title}}</p>
      <span class="price">￥{{goodsListItem.price}}</span>
      <span class="collect">{{goodsListItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
    export default {
      name: "GoodsListItem",
      props: {
        goodsListItem:{
          type:Object,
          default(){
            return {};
          }
        }
      },
      computed: {
        showImage(){
          //要保证this.goodsListItem.show.img在后 因为 this.goodsListItem.show为undefined取不到img会报错
          return this.goodsListItem.image || this.goodsListItem.show.img
        }
      },
      methods: {
        imageLoad(){
          this.$bus.$emit('itemImageLoad');
        },
        //跳转到详情页
        detailTo(){
          this.$router.push('/detail/'+this.goodsListItem.iid);
          // this.$router.push({
          //   path:'/detail',
          //   query: {
          //     id:this.goodsListItem.iid
          //   }
          // });
        }
      }
    }
</script>

<style scoped>
.goods-item {
  /*??为什么通过position这里预留的40px可以用来放下面文字部分的div*/
  /*设置为absolute的子元素 自动填充上来 随着父元素移动*/
  padding-bottom: 40px;
  width:48%;

  position:relative;
}
  .goods-item img{
    width:100%;
    height: 100%;
    border-radius: 5px;
  }
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.goods-info p {
  overflow: hidden;
  /*实现以省略号展现超出部分*/
  text-overflow: ellipsis;
  /*规定段落中的文本不进行换行：*/
  white-space: nowrap;
  margin-bottom:  3px;
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
/*通过伪元素::before来实现五角星这样一个小图标*/
.goods-info .collect::before{
  content: '';
  /*小图标设置为absolute 随着父元素collect移动变化*/
  position: absolute;
  left: -18px;
  top: -1px;
  width: 14px;
  height: 14px;
  /*background:bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;*/
  /*0 0/14px 14px  position(left top)/size(width height)*/
  background: url("../../.././assets/img/common/collect.jpg") 0 0/14px 14px;
}
</style>

