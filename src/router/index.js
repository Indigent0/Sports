import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Activity from '../views/Activity.vue'
import Find from '../views/Find.vue'
import Mine from '../views/Mine.vue'
import Search from '../views/Search.vue'
import Detail from '../views/Detail.vue'
import Order from '../views/Order.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import MyOrder from '../views/MyOrder.vue'
import CreateGame from '../views/CreateGame.vue'
import SelVenue from '../views/SelVenue.vue'
import MyGame from '../components/MyGame.vue'
import GameDetail from '../views/GameDetail.vue'
import CreateMsg from '../views/CreateMsg.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity
  },
  {
    path: '/game_detail',
    name: 'GameDetail',
    component: GameDetail,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/find',
    name: 'Find',
    component: Find
  },
  {
    path: '/create_msg',
    name: 'CreateMsg',
    component: CreateMsg,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/my_order',
    name: 'MyOrder',
    component: MyOrder,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/create_game',
    name: 'CreateGame',
    component: CreateGame,
    meta:{
      requireAuth: true,
      keepAlive: true,
    }
  },
  {
    path: '/my_game',
    name: 'MyGame',
    component: MyGame,
    meta:{
      requireAuth: true,
    }
  },
  {
    path: '/sel_venue',
    name: 'SelVenue',
    component: SelVenue,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  routes
})

export default router
