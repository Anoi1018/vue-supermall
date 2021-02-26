<template>
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backHome">
        <img src="@/assets/img/common/back.jpg" alt=''>
      </div>
      <div slot="center" class="center">
<!--        -->
        <div v-for="(item,index) in titles"
             @click="itemClick(index)"
             :class="{active: currentIndex === index}"
             class="centerItem"
        >
          {{item}}
        </div>
      </div>
    </nav-bar>
</template>

<script>
    import NavBar from "../../../components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
      components: {
          NavBar
      },
      data(){
          return {
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
          }
      },
      methods: {
          itemClick(index){
            this.currentIndex = index;

            //发射index给detail 实现tab与页面滚动的联动
            this.$emit('tabIndex',index);
          },
        backHome(){
            // this.$router.go(-1);
            this.$router.back();
        }
      },
    }
</script>

<style scoped>
  .back {
    margin-top: 14%;
  }
  .back img {
    width:30px;
    height: 30px;
  }
  .center {
    display: flex;
    font-size: 14px;
  }
  .centerItem {
    flex:1;
  }
  .nav-bar {
    position: relative;
    z-index:10;
    background-color: white;
  }
.active {
  color: var(--color-tint);
}
</style>
