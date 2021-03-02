<template>
  <div class="cart">
    <nav-bar><div slot="center">购物车({{length}})</div></nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
   import NavBar from "../../components/common/navbar/NavBar";
   import CartList from "./childComps/CartList";

   import {mapGetters} from 'vuex';
   import CartBottomBar from "./childComps/CartBottomBar";
  export default {
        name: "Cart",
      computed: {
          // cartListLength(){
          //   // return this.$store.state.cartList.length;
          // }
        // ...mapGetters(['cartListLength']),
        ...mapGetters({
          length:'cartListLength',
        })
      },
      components:{
        CartBottomBar,
          NavBar,
          CartList
      },

}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
.nav-bar{
  background-color:var(--color-tint) ;
  color:#ffffff;
  /*font-weight: 700;*/

}
</style>
