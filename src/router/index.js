import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = ()=> import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = ()=> import('../views/cart/Cart')
const Profile = ()=> import('../views/profile/Profile')
const Details = () => import('../views/details/Details')
//1.安装插件
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    //注意 redirect '/home' 而不是 Home
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    // path:'/detail/:iid',
    path:'/detail',
    component:Details
  }

]
//2.创建router
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router