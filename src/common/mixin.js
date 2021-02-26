import {debounce} from "./utils";

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
