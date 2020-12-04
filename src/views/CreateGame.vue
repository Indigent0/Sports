<template>
  <div>
        <van-nav-bar
        title="标题"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-cell-group>
            <van-field v-model="titleName" label="活动名称" placeholder="请输入文字" @input="titleChange"/>
        </van-cell-group>
        <!-- 场馆类型 -->
        <van-cell :value="typeName" is-link @click="showTypeList">
            <template #title>
                <span class="custom-title">活动类型</span>
            </template>
        </van-cell>
        <!-- 场馆地址 -->
        <van-cell :value="venueName" is-link @click="selVenue">
            <template #title>
                <span class="custom-title">活动场地</span>
            </template>
        </van-cell>
        <!-- 预定时间 -->
        <van-cell :value="venueTime" is-link @click="selTime">
            <template #title>
                <span class="custom-title">活动时间</span>
            </template>
        </van-cell>
        <!-- 预定人数 -->
        <van-cell>
            <van-stepper v-model="num" @change="numChange"/>
            <template #title>
                <span class="custom-title">活动人数</span>
            </template>
        </van-cell>
        <!-- 活动描述 -->
        <van-cell>
            <template #title>
                <span class="custom-title">活动描述</span>
            </template>
        </van-cell>
        <van-field v-model="message" placeholder="请输入活动描述" @input="msgChange"/>

        <van-button type="primary" @click="saveAct">保存活动</van-button>


        <van-action-sheet v-model="showTypes" :actions="types" @select="onSelect" />
        <van-popup v-model="showTimes" position="bottom" :style="{ height: '30%' }" >
            <van-datetime-picker
                v-model="currentDate"
                title="选择时间"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="getTime"
                />
        </van-popup>
        
  </div>
</template>

<script>
export default {
    name: 'CreateGame',
    data(){
        return {
            game:{
                datetime: 0,
                des: '',
                number: 0,
                title: '',
                venue_id: 0,
                type_id: 0
            },
            showTypes: false,
            showTimes: false,
            types: [],
            titleName:'',
            typeName: '请选择类型',
            venueName: '请选择场馆',
            venueTime: '请选择时间',
            message:'',
            currentDate: new Date(),
            minDate: new Date(2020,1,1),
            maxDate: new Date(2025,11,10),
            num: 1
        }
    },
    methods:{
        
        //保存活动
        async saveAct(){
            let {data: res} = await this.$http.post('game/save', this.game)
            if(res.code !== 200) {
                this.$toast(res.msg)
            }else{ 
                this.$toast(res.msg) 
                this.$router.push('/my_game')
                }

        },
        //活动描述信息
        msgChange(val){
            this.game.des = val
        },
        //得到人数
        numChange(num){
            this.game.number = num
        },
        //保存标题
        titleChange(val){
            this.game.title = val
        },
        //得到时间
        getTime(value){
            this.showTimes = false
            this.venueTime = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate() + ' ' + value.getHours() + ':' + value.getMinutes() 
            this.game.datetime = this.venueTime
            console.log(value)
        },
        //选择时间
        selTime(){
            this.showTimes = true
        },
        //返回
        onClickLeft(){
            this.$router.back()
        },
        //得到运动类型
        async getTypes(){
            let {data: res} = await this.$http.get('venue/types')
            // console.log(res)
            this.types = res
        },
        //点击显示所有运动类型
        showTypeList(){
            this.showTypes = true
        },
        //点击获取当前类型
        onSelect(type, index){
            this.typeName = type.name
            this.game.type_id = type.id
            this.showTypes = false 
            this.venueName = '请选择场馆'
            this.game.venue_id = 0
            // console.log(type)
        },
        //点击选择场馆
        selVenue(){
            if(this.game.type_id === 0) return this.$toast('请先选择类型')
            let type_id = this.game.type_id
            this.$router.push({
                name: 'SelVenue',
                params: {
                    type_id
                }
            })
        }
    },

    created(){
        this.getTypes()
    },


    //组件钩子函数
    beforeRouteEnter(to, from, next){
        if(from.name === 'SelVenue'){
            next(vm =>{
                let selectVenue = vm.$route.params.selectVenue
                vm.game.venue_id = selectVenue.id
                vm.venueName = selectVenue.name
            })
        }else{
            next()
        }
    },

    beforeRouteLeave(to, from, next) {
        if (to.name != "SelVenue") {
            this.$store.commit("nokeepAlive", "CreateGame");
        }
        next();
    }
}
</script>

<style>

</style>