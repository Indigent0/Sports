<template>
  <div>
    <div>
        <van-nav-bar
            title="标题"
            left-text="返回"
            right-text="按钮"
            left-arrow
            @click-left="onClickLeft"
            />
    </div>
    <div>
        <van-tabs v-model="acIndex"  @change="getIndex">
            <van-tab v-for="item in date_weeks" :key="item.date">
                <dl slot="title">
                    <dt>{{item.date | dateFormat}}</dt>
                    <dt>{{item.week}}</dt>
                </dl>
            </van-tab>
        </van-tabs>
    </div>
        <div class="sn_time_prices" v-for="(sn_time_prices, date, index) in date_sn_time_prices" :key="index" v-show="index === acIndex">
            <ul class="times">
                <li class="time" v-for="time in times" :key="time">{{time + ':00'}}</li>
            </ul>
            <div class="price">
                <dl v-for="(time_prices, sn) in sn_time_prices" :key="sn">
                    <dt>{{sn + '号场'}}</dt>
                    <template v-for="(prices, time) in time_prices" >
                        <dd :key="time" v-if="prices.is_ordered" class="ordered"></dd>
                        <dd :key="time" @click="select($event, sn, time, prices.price)" v-else>{{'￥' + prices.price}}</dd>
                    </template>
                </dl>
            </div>
        </div>
    <div class="choose">
        <div v-if="choose" class="ground">
            <div class="every" v-for="item in selected.items" :key="item.sn">
                <div class="time">{{item.time + ':00'}}-{{(parseInt(item.time) + 1) + ':00'}}</div>
                <p class="num">{{item.sn}}号场</p>
            </div>
        </div>
        <div class="default" v-else>
            <div class="color">
                <div class="blue"></div>
                <p>预定场地</p>
            </div>
            <div class="color">
                <div class="gray"></div>
                <p>已定场地</p>
            </div>
            <div class="color">
                <div class="white"></div>
                <p>未定场地</p>
            </div>
        </div>
    </div>
    <div class="btn">   
        <p>￥{{allPrice}}</p>
        <van-button type="info" size="small" @click="submit">提交订单</van-button>
    </div>
    
  </div>
</template>

<script>
export default {
    data(){
        return {
            index: this.$route.params.index,
            times: this.$route.params.times,
            date_weeks: this.$route.params.date_weeks,
            date_sn_time_prices: this.$route.params.date_sn_time_prices,
            acIndex: 0,
            selected: {
                venue_id: '',
                order_date: '',
                items: []
            },
            allPrice: 0,
            choose: false
        }
    },
    methods:{
        //goback事件
        onClickLeft(){
            this.$router.back()
        },
        //提交订单
        async submit(){
            let {data: res} = await this.$http.post('order/save', this.selected)
            this.$router.push('/my_order')
            console.log(res)
        },
        //得到当前日期对应场地
        getIndex(index){
            this.selected.order_date = this.date_weeks[index].date
            //console.log(this.selected.venue_id, this.selected.order_date)
        },
        //点击选择预定信息
        select(e, sn, time, price){
            if(e.target.className === 'select'){
                e.target.className = ''
                let index = this.selected.items.findIndex(item =>{
                    return item.sn === sn && item.time === time
                })
                this.selected.items.splice(index, 1)
                this.allPrice -= price
                if(this.selected.items.length === 0 ) this.choose = false
            }else{
                if(this.selected.items.length >= 4){
                    return this.$toast('您最多选择4场')
                }
                this.allPrice += price
                e.target.className = 'select'
                this.selected.items.push({sn, time})
                this.choose = true
            }

            //console.log(this.selected.items)
        }

    },
    created(){
        this.acIndex = this.index
        this.selected.venue_id = this.$route.params.id
        this.selected.order_date = this.date_weeks[this.acIndex].date
        console.log(this.date_sn_time_prices)
    },
    filters:{
        //过滤日期
        dateFormat(value){
            let arr = value.split('-')
            return arr[1] + '月' + arr[2] + '日'
        }
    }
}
</script>

<style lang="less">
.choose{
    height: 150px;
    width: 750px;
    position: fixed;
    bottom: 100px;
    left: 0;
    background-color: white;
    .ground{
        display: flex;
        justify-content: space-around;
        height: 150px;
        align-items: center;
        .every{
            border: 3px solid #3399ee;
            border-radius: 10px;
            height: 125px;
            width: 165px;
            text-align: center;
            .time{
                background-color: #3399ee;
                color: white;
                line-height: 50px;
                font-size: 24px;
            }
            .num{
                color: #3399ee;
                font-size: 26px;
                line-height: 75px;
            }
        }
    }
    .default{
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 26px;
        text-align: center;
        height: 150px;
        .color{
            display: flex;
            p{
                margin-left: 10px;
            }
        }
        .blue{
            width: 50px;
            height: 40px;
            background-color: #3399ee;
            border-radius: 10px;
        }
        .gray{
            width: 50px;
            height: 40px;
            border-radius: 10px;
            background-color: #eee;
        }
        .white{
            width: 50px;
            height: 40px;
            border-radius: 10px;
            background-color: white;
        }
    }
}
.ordered{
    background-color: #eee;
}
.btn{
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100px;
    width: 690px;
    background-color: #fff;
    align-items: center;
    padding: 0 20px;
    p{
        font-size: 28px;
        color: #3399ee;
    }
}

.sn_time_prices{
    display: flex;
    .times{
        padding-top: 80px;
    }
    .time{
        width: 110px;
        font-size: 24px;
        height: 80px;
        color: gray;
        text-align: center;
        line-height: 80px;
    }
    .price{
        width: 640px;
        display: flex;
        border-top: 1px solid #eee;
        border-left: 1px solid #eee;
        dl{
            width: 100px;
            dt,dd{
                width: 100px;
                height: 78px;
                border-bottom:1px solid #eee ;
                border-right:1px solid #eee ;
                font-size: 24px;
                color: gray;
                text-align: center;
                line-height: 78px;
            }
            .select{
                background-color: #3399ee;
                color: white;
            }
        }
    }
}



.van-nav-bar{
    background-color: #3399ee !important;
    i,span{
        color: white;
    }
    .van-nav-bar__title{
        color: white;
    }
    .van-icon-arrow-left::before{
        color: white;
    }
    .van-tabs__line{
        background-color: #3399ee !important;
        z-index: 100;
    }
}

.van-tabs--line .van-tabs__wrap{
    height: 60px !important;
    .van-tabs__line{
        background-color: #3399ee;
        width: 80px;
    }
}
.van-tabs__wrap--scrollable .van-tabs__nav--complete{
    text-align: center;
}

</style>