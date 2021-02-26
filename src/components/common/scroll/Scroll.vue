<template>
    <div class='wrapper' ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        name: "Scroll",
      data(){
          return {
            scroll:null,
          }
      },
      props: {
        probeType: {
          type:Number,
          default: 0
        },
        pullUpLoad: {
          type:Boolean,
          default:false
        }
      },
      mounted() {
        //1.实例化一个BScroll
        this.scroll = new BScroll(this.$refs.wrapper,{
          pullUpLoad:this.pullUpLoad,
          //必须设置 保证scroll内的div都正常点击
          click:true,
          probeType:this.probeType
        })
        //2.监听滚动事件
        //加判断可以使逻辑更严密 性能更好
        if(this.probeType==2 || this.probeType ==3){
          this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position);
          });
        }
        //3.监听上拉事件
        if(this.pullUpLoad === true){
          this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp');
          });
        }
      },
      methods: {
          scrollTo(x,y,time=300){
            this.scroll.scrollTo(x,y,time);
          },
          finishPullUp(){
            this.scroll.finishPullUp();
          },
          refresh(){
            // console.log('-----');
            this.scroll.refresh();
          },
        getY(){
            return this.scroll? this.scroll.y : 0;
        }
      }
    }
</script>

<style scoped>

</style>
