import  Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
//1.安装插件
Vue.use(Vuex)

//2.创建vuex中的store对象

//注意！！！state = ({}) 是往原括号里面加入对象{}
const state = ({
  //存放一个个商品product对象的数组 [product1,product2...]
  cartList:[],
})

const store = new Vuex.Store({
  state,
  mutations,
  //在actions中将商品是增加种类还是增加数目 进行区分 使得mutations中对于商品的操作单一化 便于不同操作的跟踪
  //context上下文 对象可以解构为{state,commit}
  actions,
  getters

})

export default store
