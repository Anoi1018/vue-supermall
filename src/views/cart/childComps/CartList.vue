<template>
    <div class="cart-list">
      <scroll class="content" ref="scroll">
       <cart-list-item v-for="(item,index) in list" :key="index" :product="item"/>
      </scroll>
    </div>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";


  import {mapGetters} from 'vuex'
    export default {
        name: "CartList",
      computed: {
          ...mapGetters({
            list:"cartList"
          }),
      },
      components: {
        CartListItem,
          Scroll,
      },
      activated() {
          this.$refs.scroll.refresh();
      }
    }
</script>

<style scoped>
   .cart-list {
     height: calc(100vh - 44px - 49px - 40px);
   }
  .content {
    height: 100%;
    overflow:hidden;
  }
</style>
