import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

export const imageListenerMixin = {
  data(){
    return {
      itemImageListener:null,
      refresh:null
    }
  },
  mounted(){
    this.refresh = debounce(this.$refs.scroll.refresh,500);
    this.itemImageListener = ()=>{this.refresh()};
    this.$bus.$on('itemImageLoad',this.itemImageListener);
    // console.log('我是混入中的监听');
  }
}

export const backTopMix ={
  data(){
    return {
      isShowBackTop:false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500);
    },
    showBacktop(position){
      this.isShowBackTop = (-position.y) > 1000;
    },
  }
}

