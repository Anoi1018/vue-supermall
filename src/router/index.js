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
    component:Home,
    meta:{showTabbar:true},
  },
  {
    path:'/category',
    component:Category,
    meta:{showTabbar:true},
  },
  {
    path:'/cart',
    component:Cart,
    meta:{showTabbar:true},
  },
  {
    path:'/profile',
    component:Profile,
    meta:{showTabbar:true},
  },
  {
    path:'/detail/:id',
    // path:'/detail',
    component:Details,
    meta:{showTabbar:true},
  }

]
//2.创建router
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
