<template>
 <div id="home">
   <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <home-swiper :banners='banners' />
   <recommend-view :recommends="recommends"/>
 </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";

  import {getHomeMultidata} from "../../network/home";

  export default {
        name: "Home",
    components: {
        NavBar,
        HomeSwiper,
      RecommendView
    },
    data(){
          return {
            // result:null
            banners:[],
            recommends:[]
          }
    },
    created() {
          //1.请求多个数据
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
/*scoped:作用域 限定了样式的作用域*/
  #home {
    /*padding-top: 44px;*/
    /*padding-top: 44px;*/
    height: 100vh;
  /*  vh:view height 视高  100%看到的页面视图高度*/
    position: relative;
  }
 .home-nav {
   background-color: var(--color-tint);
   color: white;

   /*只有原生滚动才需要固定导航栏防止一起滚动
   bscroll中实现了局部区域滚动 就不需要设置了
   z-index是对有position属性的元素生效
   position：relative 可以保持原来位置*/
   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   z-index: 9;
 }
  /*.tab-control {*/
  /*  !*position:sticky 实现了原生滚动中的吸顶的效果*/
  /*  在没有top为44px的时候 是随滚动条走的*/
  /*  达到距离顶部44px的时候 自动将属性修改为fixed 将位置固定 有的浏览器不支持该属性*/
  /*  移动端基本支持*!*/
  /*  !*bscroll中不hi吃sticky 没有吸顶效果*!*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  !*z-index 设置堆叠顺序 可以实现商品展示 goodslist不覆盖tab-control*!*/
  /*  z-index: 9 ;*/
  /*}*/
  .tab-control {
    position: relative;
    z-index:9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*margin-top:44px 实现计算好的块区域放到顶部导航栏下面*/
  /*}*/

</style>
