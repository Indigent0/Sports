<template>
  <div>
        <van-nav-bar
            title="活动中心"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        <div class="body">
            <van-tabs v-model="activeName">
                <van-tab title="我的活动" name="a">
                    <div v-for="game in createGames" :key="game.id" class="create">
                        <p>{{game.title}}</p>
                        <van-tag type="primary" size="medium">编辑</van-tag>
                        <van-tag type="danger" size="medium">删除</van-tag>
                    </div>
                </van-tab>
                <van-tab title="参加活动" name="b">
                    <div v-for="game in joinGames" :key="game.id">
                        <p>{{game.title}}</p>
                        <span @click="viewDetail(game.id)">查看详情</span>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            activeName:'a',
            createGames: [],
            joinGames: [],
        }
    },
    methods:{
        //我的活动
        async getMyAct(){
            let {data: res} = await this.$http.get('user/my_games')
            console.log(res)
            this.createGames = res.create_games
            this.joinGames = res.join_games
        },
        //返回
        onClickLeft(){
            this.$router.back()
        },
        //查看详情
        viewDetail(gameId){
            this.$router.push({
                path: '/game/detail',
                query: {gameId}
            })
        }
    },
    created(){
        this.getMyAct()
    }
}
</script>

<style lang="less">
.create{
    display: flex;
    font-size: 26px;
    color: black;
    background-color: #fff;
    margin: 20px 0;
    height: 100px;
    a{
        color: #5a73f2;
    }
    .van-tag--medium{
        height: 20px;
    }
}

</style>