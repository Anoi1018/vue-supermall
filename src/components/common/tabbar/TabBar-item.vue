<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
    export default {
        name: "Tab-bar-item",
        props: {
           path: String,
           activeColor: {
             type: String,
             default: 'red'
           }
        },
        // data(){
        //   return {
        //     //isActive:true
        //   }
        // },
      computed: {
          isActive(){
            //  /home -> item1(/home) = true
            //  /home -> item2(/category) = false
            //  /home -> item3(/cart) = false
            //  /home -> item4(/profile) = false
            //string1.indexOf(string2) string2在string1中的位置
            return this.$route.path.indexOf(this.path) !== -1
          },
          activeStyle(){
            return this.isActive? { color:this.activeColor } : {}
          }
      },
        methods:{
          itemClick(){
            this.$router.replace(this.path)
          }
        }
    }
</script>

<style scoped>
  .tab-bar-item {
    /*均等分*/
    flex: 1;
    text-align: center;
    /*移动端tabbar高度一般是49px*/
    height: 49px;
    margin-top: 8px;
  }
  .tab-bar-item img{
    width:24px;
    height: 24px;
    /*解决img图片底部默认3px*/
    vertical-align: middle;
    margin-bottom: 3px;
  }


</style>
