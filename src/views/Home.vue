<template>
  <div class="home" :onScroll="scroll">
    <div class="search">
      <van-search v-model="value" placeholder="请输入搜索关键词" background="#71D0B2" @focus="onSearch"/>
      <van-dropdown-menu>
        <van-dropdown-item v-model="typesId" :options="types" @change="changeType"/>
        <van-dropdown-item v-model="sortId" :options="option2" />
      </van-dropdown-menu>
    </div>
    <div class="contect1">
      <Venue :venue="venue"/>
    </div>
    <van-loading type="spinner" v-if="loading" :vertical="true"/>
    <div v-if="finished" class="loading">已经划到底啦</div>
  </div>
</template>

<script>
import Venue from '../components/Venue'
export default {
  data(){
    return {
      venue: [],
      typesId: 0,
      sortId: 'a',
      types: [{ text: '全部商品', value: 0 }],
      value: '',
      loading: false,
      finished: false,
      page: 1,
      option2: [
        { text: '距离排序', value: 'a' },
        { text: '热度排序', value: 'b' },
        { text: '价格排序', value: 'c' },
      ],
    }
  },
  mounted(){
    document.addEventListener('scroll',this.scroll)  
  },
  components:{
    Venue
  },
  methods: {
    //点击搜索跳转搜索界面
    onSearch(){
      this.$router.push('/search')
    },
    //改变商品类型后显示的列表
    changeType(value){
      this.loading = false
      this.finished = false
      this.venue = []
      this.page = 1
      this.getVenue()
    },
    //页面滚动事件
    scroll(){
      let ele = document.documentElement
      let clientH = ele.clientHeight
      let scrollH = ele.scrollHeight
      let res = scrollH - clientH
      let top = ele.scrollTop
      if(top > res - 60){
        this.getMore()
      }
    },
    //加载更多
    getMore(){
      if( this.finished || this.loading) return false
      this.page++
      this.getVenue()
    },
    //获取商品数据(滚动)
    async getVenue(){
      this.loading = true
      let {data: res} = await this.$http.get('venue/list?page='+this.page , {params:{
        type_id: this.typesId
      }})
      // console.log(res)
      this.loading = false
      if(this.page === 1){
        this.venue = res.data
      }else{
        this.venue = this.venue.concat(res.data)
      }
      if(this.page === res.last_page){
        this.finished = true
      }
    },
    //获得商品类型标签
    async getTypes(){
      let {data: res} = await this.$http.get('venue/types');
      let types = [];
      res.forEach(item =>{
        types.push({text: item.name, value: item.id})
      })
      this.types = this.types.concat(types);
    },
  },
  created() {
    this.getVenue()
    this.getTypes()
  }
}
</script>

<style lang="less" scope>
  *{
    margin: 0;
    padding: 0;
  }
  .home{
    padding-bottom: 100px;
  }
  .contect1{
    padding-top: 200px;
  }
  .search{
    position: fixed;
    width: 750px;
  }
  .loading{
    font-size: 20px;
    color: gray;
    text-align: center;
    line-height: 50px;
  }
</style>