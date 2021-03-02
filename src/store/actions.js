import {
  ADD_COUNTER,
  ADD_KIND
} from './mutation-types'
export default {
  addCart(context, payload) {
    return new Promise((resolve,reject)=>{
      //1 判断是否是原数组中存在的商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      //2.执行不同操作
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);//注意传入的payload是oldproduct
        resolve('当前的商品数量加一')
      } else {
        payload.count = 1;
        context.commit(ADD_KIND, payload);
        resolve('添加了新的商品')
      }
    });
  }
}
