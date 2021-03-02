import {
  ADD_COUNTER,
  ADD_KIND
} from './mutation-types'

export default {
  //mutations唯一的目的就是修改state中的状态
  //mutations中的每个方法尽可能完成的事件比较单一一点
  //注意方括号[]
  [ADD_COUNTER](state,payload){
    payload.count +=1;
  },
  [ADD_KIND](state,payload){
    payload.checked = true;
    state.cartList.push(payload);
  }
}
