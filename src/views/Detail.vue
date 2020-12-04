<template>
    <div>
        <div class="head"> <van-icon name="arrow-left" @click="onClickLeft"/> <span>{{details.name}}</span></div>
        <div class="body">
            <div class="message">
                <div class="contect">
                    <img :src="details.cover_url" alt="">
                    <div class="middle">
                        <div>
                            <h6>{{details.name}}</h6>
                            <p>{{details.address}}</p>
                            <p>营业时间:9:00 ~ 22:00</p>
                        </div>
                    </div>
                    
                    <div class="icon">
                        <van-icon name="location-o" />
                    </div>
                </div>
                <div class="tel">
                    <p>{{details.phone}}</p>
                    <div class="icon"><van-icon name="phone-o" /></div>
                    
                </div>
            </div>

            <div class="types">
                <div class="title"><p>{{details.type_name}}</p></div>
                <div class="types_outer">
                    <div class="types_contect">
                        <div class="type" v-for="(item, index) in details.date_weeks" :key="index" @click="order(index)">
                            <p>{{item.week}}</p>
                            <p>{{item.date | dateFormat}}</p>
                            <p>充足</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="facilities">
                <div>场馆设施</div>
            </div>

            <van-cell title="交通方式" is-link url="/vant/mobile.html" />
            <van-cell title="场馆介绍" is-link to="index" />
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            id: this.$route.query.id,
            details: {}
        }
    },
    methods:{
        async getDetail(){
            let {data: res} = await this.$http.get('venue/detail/'+ this.id)
            this.details = res
            // console.log(res)
        },
        order(index){
            let {date_sn_time_prices, times, date_weeks, id} = this.details
            this.$router.push({
                name: 'Order',
                params: {index, date_sn_time_prices, times, date_weeks, id }
            })

        },
        onClickLeft(){
            this.$router.back()
        }
    },
    filters:{
        dateFormat(value){
            let arr = value.split('-')
            return arr[1] + '~' + arr[2]
        }
    },
    created(){
        this.getDetail()
    }

}
</script>

<style lang="less" scope>
*{
    margin: 0;
    padding: 0;
}
.head{
    height: 100px;
    background-color: #3298ed;
    line-height: 100px;
    font-size: 28px;
    color: white;
    padding: 0 30px;
    span{
        margin: 0 auto;
    }
}
.body{
    background-color: #f8f8f8;
}
.message{
    padding: 30px 30px 0;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    margin-bottom: 20px;
    .contect{
        display: flex;
        justify-content: space-between;
        .middle{
            width: 375px;
        }
        img{
            width: 200px;
            height: 160px;
            border-radius: 10px;
        }
        h6{
            font-size: 34px;
            margin-bottom: 30px;

        }
        p{
            font-size: 26px;
            line-height: 50px;
            color: gray;
        }
        .icon{
            margin: auto  0;
        }
    }
    
    .tel{
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        p{
            font-size: 26px;
            line-height: 105px;
        }
        .icon{
            margin: auto 0;
        }
    }
}
.types{
    background-color: #fff;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    .title{
        height: 80px;
        
        p{
            width: 160px;
            text-align: center;
            color: #538add;
            font-size: 26px;
            line-height: 80px;
            border-bottom: 3px solid #538add;
        }
    }
    .types_outer{
        width: 750px;
        height: 255px;
        overflow: auto;
        margin-top: 3px;
        background-color: #f8f8f8;
        border-bottom: 1px solid #eee;
        .types_contect{
            display: flex;
            width: 1270px;
            padding: 30px 0 30px 30px;
            .type{
                background-color: #fff;
                width: 160px;
                border: 1px solid #eee;
                border-radius: 5px;
                height: 180px;
                margin-right: 20px;
                padding-bottom: 10px;
                p{
                    font-size: 24px;
                    text-align: center;
                    line-height: 50px;
                }
                p:first-child{
                    margin-top: 30px;
                }
                p:last-child{
                    color: #70a81f;
                }
            }
        }
    }
}
.facilities{
    height: 270px;
    margin-bottom: 20px;
    background-color: #fff;
}
</style>