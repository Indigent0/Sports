<template>
  <div id="app">
    <div id="nav">
      <van-tabbar v-model="active" v-show="menu">
        <van-tabbar-item icon="home-o" to="/home">场馆</van-tabbar-item>
        <van-tabbar-item icon="coupon-o" to="/activity">活动</van-tabbar-item>
        <van-tabbar-item icon="search" to="/find">发现</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/mine">我的</van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- 组件缓存 -->
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <keep-alive :include="cached">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  data(){
    return{
      active:0,
      cached: this.$store.state.catchArr
    }
  },
  computed:{
    //判断下面菜单是否在当前页面显示
    menu(){
      let whiteList = ['Home', 'Activity', 'Find', 'Mine']
      let bool = whiteList.includes(this.$route.name)
      // console.log(bool)
      return bool
    }
  },
}
</script>
<style lang="less">
dl,dt,dd,body,html,ul,li{
  margin: 0;
  padding: 0;
}

</style>
