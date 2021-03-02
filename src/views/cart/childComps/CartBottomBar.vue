<template>
    <div class='bottom'>
      <div class="button">
        <check-button class="check-button" :is-checked="isSelectAll" @click.native="changeState"/>
        <span>全选</span>
      </div>
      <div class="price">
        总计: {{totalPrice}}
      </div>
      <div class="number" @click="toCalc">
        去结算：{{totalNumber}}
      </div>
    </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'
    export default {
        name: "CartBottomNav",
      components: {
          CheckButton
      },
      computed: {
        ...mapGetters({
          list:"cartList",
        }),
        totalPrice(){
          return '￥'+this.list.filter(item =>item.checked).reduce((prev,cur)=>{
            return prev+cur.price * cur.count;
          },0);
        },
        totalNumber(){
          return this.list.filter(item => item.checked).length;
        },
        isSelectAll(){
          if(this.list.length === 0) return false;
          return !this.list.find(item => !item.checked);
        },
      },
      methods: {
        changeState(){
          //全部选中 变成全部不选中  实质：通过对象模型 此处是product的属性 checked来进行状态判断和最后界面的展示
          if(this.isSelectAll) this.list.forEach(item=>item.checked = false)
          else this.list.forEach(item=>item.checked = true);//没有不全部选中 就变成全部选中

          //这里不可以简化  isSelectAll和checked会相互影响
          // this.list.forEach(item => item.checked = !this.isSelectAll);
        },
        toCalc(){
          let length = this.list.filter(item=>item.checked).length;
          if(!length){
            this.$toast.show('请选择商品',2000);
          }
        }
      }
    }
</script>

<style scoped>
.bottom {
  width:100%;
  height:40px;
  position:relative;
  background-color:lightgrey;
  display: flex;
  align-items: center;
  font-size: 16px;
}
  .button {
    display:flex;
    width:80px;
    margin: 10px;
  }
  .check-button {
    margin-right: 10px;
  }
  .number {
    width:80px;
    background-color: orange;
    color: white;
    height: 100%;
    text-align: center;
    line-height: 40px;
  }
  .price {
    flex:1;
    margin-right: 10px;
  }
</style>
