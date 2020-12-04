<template>
  <div>
    <van-nav-bar
      title="活动中心"
      right-text="+"
      @click-right="onClickRight"
      />
    <div class="body">
      <div v-for="item in games" :key="item.id" class="evAct" @click="gameDetail(item.id)">
        <p>活动标题：{{item.title}}</p>
        <p>用户：{{item.user.name}}</p>
        <p>类型：{{item.type_name}}</p>
        <p>创建时间：{{item.created_at}}</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      games: []
    }
  },
  methods:{
    //活动列表
    async getActList(){
      let {data: res} = await this.$http.get('game/list')
      this.games = res
      console.log(res)
    },
    //跳转活动详情页
    gameDetail(gameId){
      this.$router.push({
        path:'/game_detail',
        query:{
          gameId
        }
      })
    },
    //添加我的活动
    onClickRight(){
      this.$router.push('/create_game')
    },
  },
  created(){
    this.getActList()
  }
}
</script>

<style lang="less">
.body{
  background-color: #eee;
}
.evAct{
  margin: 20px auto ;
  background-color: #fff;
  height: 200px;
  width: 680px;
  border-bottom: 2px #eee solid;
  padding: 20px;
  p{
    font-size: 24px;
    line-height: 50px;
  }
}
</style>