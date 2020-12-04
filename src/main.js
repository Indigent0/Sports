import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "amfe-flexible";
import Vant from 'vant';
import 'vant/lib/index.css';

import axios from 'axios'
Vue.prototype.$http = axios
Vue.prototype.$store = store

Vue.use(Vant);
Vue.config.productionTip = false

//后端路由拦截器
axios.interceptors.request.use(
  config => {
     let token = sessionStorage.getItem("token");
      if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.Authorization = 'Bearer '+token;
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  });

//前端路由拦截器
router.beforeEach((to, from, next) =>{
  let token = sessionStorage.getItem('token')
  console.log(from)
  if(to.meta.requireAuth && !token){
    if(from.name !== 'login'){
      next('/login')
    }
  }

  else if(to.name=='CreateGame'){
    store.commit('iskeepAlive', to.name);
  }

  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
