<template>
    <div>
        <div class="search">
            <van-search v-model="value" 
                        placeholder="请输入搜索关键词" 
                        background="#71D0B2" 
                        ref="input" 
                        show-action 
                        @cancel="onCancel" 
                        @search="onSearch"/>
        </div>
        <div class="contect2">
            <Venue :venue="venue"/>
        </div>
    </div>
    
</template>

<script>
import Venue from '../components/Venue'
export default {
    data(){
        return {
            value: '',
            venue: []
        }
    },
    mounted(){
        let search = this.$refs.input
        let newSearch = search.getElementsByTagName('input')
        newSearch[0].focus()
    },
    methods:{
        //搜索页面点击取消后返回Home
        onCancel(){
            this.$router.push('/home')
        },
        //搜索后获取数据
        onSearch(value){
            this.value = value
            this.getSearch()
        },
        //更新搜索后的数据
        async getSearch(){
            let {data: res} = await this.$http.post('venue/search',{
                words: this.value
            })
            console.log(res)
            this.venue = res.data
        },
        //滚动事件
        // scroll(){
        //     let ele = document.documentElement
        //     let clientH = ele.clientHeight
        //     let scrollH = ele.scrollHeight
        //     let res = scrollH - clientH
        //     let top = ele.scrollTop
        //     if(top > res - 60){
        //         this.getMore()
        //     }
        // },
    },
    components:{
        Venue
    }
}
</script>

<style lang="less" scope>
.search{
    position: fixed;
    width: 750px;
}
.van-search__action{
    color: white !important
}
.contect2{
    padding-top: 100px;
}
</style>