<template>
    <div id="detail">
      <detail-nav-bar @tabIndex="clickTab" ref="navbar"/>
     <scroll class="descroll" :probeType="3" ref="scroll" @scroll="contentScroll">
<!--       在传属性时候 :top-images 避免使用驼峰 因为标签本身不区分大小写-->
       <details-swipper :top-images='topImages'/>
       <detail-base-info :goodInfo="goodInfo" />
       <detail-shop-info :shopInfo="shopInfo"/>
       <detail-good-info :goodInfo="detailInfo" @goodImageLoad="goodImageLoad"/>
       <detail-params-info :paramInfo="paramsInfo" ref="params"/>
       <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
       <goods-list :goods-list = 'recommendInfo' ref="recommend"/>
     </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
      <detail-bottom-bar @addToCart="addToCart"/>
<!--      <toast :message="message" :show="show"/>-->
    </div>
</template>

<script>
  import {getDetail,getRecommend} from "@/network/detail";
  import {baseInfo,shopInfo,GoodsParam,commentInfo} from "../../network/detail";
  import {imageListenerMixin,backTopMix} from "../../common/mixin";
  import {mapActions} from 'vuex'

  import DetailNavBar from "./detailsChildComps/DetailNavBar";
  import DetailsSwipper from "./detailsChildComps/DetailsSwipper";
  import DetailBaseInfo from "./detailsChildComps/DetaiBaseInfo";
  import DetailShopInfo from "./detailsChildComps/DetailShopInfo";
  import DetailGoodInfo from "./detailsChildComps/DetailGoodInfo";
  import DetailParamsInfo from "./detailsChildComps/DetailParamsInfo";
  import DetailCommentInfo from "./detailsChildComps/DetailCommentInfo";

  import Scroll from '@/components/common/scroll/Scroll'
  import GoodsList from "../../components/content/goods/GoodsList";
  import {debounce} from "../../common/utils";
  import DetailBottomBar from "./detailsChildComps/DetailBottomBar";
  // import Toast from "../../components/common/toast/Toast";


  export default {
        name: "Details",
    data(){
        return {
          goodsId:null,
          topImages:[],
          goodInfo:{},
          shopInfo:{},
          detailInfo:{},
          paramsInfo:{},
          commentInfo:{},
          recommendInfo:[],
          themeTopYs:[],
          getThemeTopY:null,
          currentIndex:0,
          scrollY:0,
          // show:false,
          // message:''
        }
    },
    components: {
      // Toast,
      DetailBottomBar,
      DetailCommentInfo,
      DetailNavBar,
      DetailsSwipper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodInfo,
      DetailParamsInfo,
      Scroll,
      GoodsList,
    },
    created() {
      //保存传入的商品参数 id
      this.goodsId = this.$route.params.id;
      //1.获取详情页所有数据 res
      getDetail(this.goodsId).then(res => {
        // console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        //2.获取商品基本信息数据
        this.goodInfo = new baseInfo(data.itemInfo,data.columns,data.shopInfo.services);
        //3.获取店铺基本信息
        this.shopInfo = new shopInfo(data.shopInfo);
        //4.获取商品详情信息（多张图片）
        this.detailInfo = data.detailInfo;
        //5.获取商品参数信息（两张表格）
        this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //6.获取用户评论信息
        this.commentInfo = new commentInfo(data.rate.list[0]);
      });

      //7.获取详情页 推荐信息 在另外一个接口
      getRecommend().then(res =>{
        this.recommendInfo = res.data.list;
        // console.log(res.data.list);
      })

      //给getThemeTopY()赋值（对给this.getThemeTopY函数进行防抖）
      this.getThemeTopY = debounce(()=>{
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        //注意因为navar的存在  我们要少往上滚44px
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);

        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs);
      },1000)

    },
    mixins:[imageListenerMixin,backTopMix],
    destroyed() {
          this.$bus.$off('itemImageLoad',this.itemImageListener);
    },
    methods: {
          ...mapActions(['addCart']),
      goodImageLoad(){
        // this.$refs.scroll.refresh();
        this.refresh();
        this.getThemeTopY();
      },
      clickTab(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200);
      },
      contentScroll(position){
        this.showBacktop(position);
        this.scrollY = -position.y;
        let length = this.themeTopYs.length;
        for(let i=0;i<length-1;i++){
          if((this.currentIndex!==i) && (this.scrollY>=this.themeTopYs[i]) && (this.scrollY<this.themeTopYs[i+1])){
            // console.log(i);
            this.currentIndex = i;
            this.$refs.navbar.currentIndex = i;
          }
        }

      },
      addToCart(){
        //1.监听到底部组件加入购物车的请求后 创建一个对象 用于存储购物车中需要展示的列表项
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goodInfo.title;
        product.desc = this.goodInfo.desc;
        product.price = this.goodInfo.realPrice;
        product.iid = this.goodsId;

        //2.将对象 放入vuex中  方便同级页面购物车的存取 product作为payload传入
        // this.$store.dispatch('addCart',product);

        //3.将actions中的结果 反馈给detail详情页面 可以将vuex中的actions包装成一个promise通过resolve获取结果
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res);
        // })

        this.addCart(product).then(res=>{
          this.$toast.show(res,1000);
        })
      }
    }
  }

</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }
  .descroll {
    background-color: #ffffff;
    height: calc(100% - 44px - 49px);
  }
</style>
