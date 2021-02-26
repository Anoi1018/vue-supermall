<template>
  <div class="goods">
    <goods-list-item v-for="item in goodsList" :goods-list-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
    export default {
        name: "GoodsList",
      props: {
          goodsList: {
            type:Array,
            default(){
              return [];
            }
          }
      },
      components: {
          GoodsListItem
      }
    }
</script>

<style scoped>
.goods {
  display: flex;
/*flex-wrap: wrap 不把东西往一行塞 在子元素里设置宽度 */
flex-wrap: wrap;
  /*设置均分*/
justify-content: space-around;
/*  微调均分 缩小中间空隙*/
  padding:2px;

}
</style>
