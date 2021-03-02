<template>
    <div class="toast" v-show="isShow">
      {{message}}
    </div>
</template>

<script>
    export default {
        name: "Toast",
      // props: {
      //     message: {
      //       type:String,
      //       default:''
      //     },
      //   show: {
      //       type:Boolean,
      //       default: false
      //   }
      // }
      data(){
          return {
            isShow:false,
            message:''
          }
      },
      methods: {
          show(message='默认文字',duration=2000){
            this.isShow = true;
            this.message = message;

            setTimeout(()=>{
              this.isShow = false;
              this.message = '';
            },duration);
          }
      }
    }
</script>

<style scoped>
.toast {
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,.7);
  color:white;
  margin:8px 10px;
  width:150px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  z-index:999;
}
</style>
