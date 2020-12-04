<template>
    <div>
        <van-nav-bar
            title="活动详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        <div class="body">
            <div class="contect">
                <p>活动时间：{{venue.title}}</p>
                <p>活动时间：{{venue.datetime}}</p>
                <p>活动地点：{{venue.venue_name}}</p>
                <p>活动类型：{{venue.type_name}}</p>
                <p>组织者：{{venue.user_name}}</p>
                <p>报名用户：{{venue.users_count}}/{{venue.number}}</p>
            </div>
            <div class="explain">
                <p>活动说明：{{venue.des}}</p>
            </div>

            <van-button v-if="venue.is_full" type="primary" class="btn" style="background:gray">参加人数已满</van-button>

            <van-button v-else-if="venue.is_join" type="primary" class="btn" style="background:gray">已参加</van-button>

            <van-button v-else type="primary" class="btn" @click="joinGame(venue.id)">报名参加</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            venue: {}
        }
    },
    created(){
        let gameId = this.$route.query.gameId
        this.getActDetail(gameId)
    },
    methods:{
        //返回
        onClickLeft(){
            this.$router.back()
        },
        //
        async getActDetail(id){
            let {data: res} = await this.$http.get('game/detail/'+ id)
            this.venue = res
            console.log(res)
        },
        //加入
        async joinGame(id){
            let {data: res} = await this.$http.get('game/join/' + id)
            if(res.status !== 200){
                this.$toast('报名失败')
            }else{ 
                this.$toast(res.msg)  
                this.getActDetail(id)
                }
            console.log(res)
        }
    }
}
</script>

<style lang="less" scoped>

.body{
    padding-top: 20px;
    .contect{
        line-height: 80px;
        font-size: 26px;
        padding: 0 20px;
        background-color: #fff;
        p:last-child{
            border-top: 2px solid #eee;
            line-height: 100px;
        }
    }
    .explain{
        background-color: #fff;
        margin-top: 30px;
        font-size: 26px;
        padding: 20px;
        height: 200px;
    }
    .btn{
        background-color: #5a73f2;
        border: #5a73f2;
        border-radius: 44px;
        margin: 0 auto;
        position: fixed;
        bottom: 20px;
        left: 50%;
        margin-left: -345px;
    }
}
</style>