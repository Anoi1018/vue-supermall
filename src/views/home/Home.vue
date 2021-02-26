<template>
 <div id="home">
   <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <tab-control :titles="['流行','新款','精选']"
                @tabClick = 'tabClick'
                ref="tabControl1"
                v-show="isTabFixed"
                class="tab1"
   />
   <scroll class="content"
           ref="scroll"
           @scroll="contentScroll"
           :probe-type="3"
           :pull-up-load="true"
           @pullingUp="loadMore">

     <home-swiper :banners='banners' @swipperImgLoad="swipperImgLoad"/>
     <recommend-view :recommends="recommends"/>
     <feature-view />
     <tab-control :titles="['流行','新款','精选']"
                  @tabClick = 'tabClick'
                  ref="tabControl2"
     />
     <goods-list :goods-list = 'showGoods'  />
   </scroll>
   <back-top @click.native="backClick" v-show="isShowBackTop"/>

 </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import { getHomeMultidata, getHomeGoods} from "../../network/home";
  import {imageListenerMixin} from "../../common/mixin";

  export default {
        name: "Home",
    components: {
        HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins:[imageListenerMixin],
    data(){
          return {
            // result:null
            banners:[],
            recommends:[],
            goods:{
              'pop':{page:0,list:[]},
              'new':{page:0,list:[]},
              'sell':{page:0,list:[]},
            },
            currentType:'pop',
            isShowBackTop:false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0,
          }
    },
    computed: {
          showGoods(){
            return this.goods[this.currentType].list;
          }
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted(){
      //1.对图片加载完成事件的监听
      //this.$refs.scroll.refresh-->函数 this.$refs.scroll.refresh()-->函数的返回值
      // const refresh = debounce(this.$refs.scroll.refresh,500);
      //refresh 承接了新函数 在func执行完毕后 不会被销毁 因为有闭包的引用指向它
      // this.$bus.$on('itemImageLoad',()=>{
      //   //此处的箭头函数形成了闭包
      //   refresh();
      // });

      //2.对tabControl滚动位置的监听
      //$el 取到组件根元素div 才有offsetTop属性
      // this.offsetTop = this.$refs.tabControl.$el.offsetTop;
      this.swipperImgLoad();
    },
    activated(){
          this.$refs.scroll.scrollTo(0,this.saveY,0);
          this.$refs.scroll.refresh();
    },
    deactivated() {
          this.saveY = this.$refs.scroll.getY();
          //取消全局监听 表示不执行监听到这个事件后的函数操作
          this.$bus.$off('itemImageLoad',this.itemImageListener);
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500);
      },
      contentScroll(position){
        this.isShowBackTop = (-position.y) > 1000;
        this.isTabFixed = (-position.y)>this.tabOffsetTop;
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.refresh();
      },
      swipperImgLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res);
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res =>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page +=1 ;

          this.$refs.scroll.finishPullUp();
        })
      }

    }
  }
</script>

<style scoped>
/*scoped:作用域 限定了样式的作用域*/
  #home {
    padding-top: 44px;
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
  /*  !*bscroll中不支持sticky 没有吸顶效果*!*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  !*z-index 设置堆叠顺序 可以实现商品展示 goodslist不覆盖tab-control*!*/
  /*  z-index:9;*/
  /*}*/

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
  /*!*margin-top:44px 实现计算好的块区域放到顶部导航栏下面*!*/
  /*}*/
.tab1 {
  position:relative;
  z-index: 9;
}
</style>
