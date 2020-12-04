<template>
  <div @scroll="onScroll" >
    <van-nav-bar title="标题" right-arrow @click-right="createMsg">
      <template #right>
        <van-icon name="plus" size="18" />
      </template>
    </van-nav-bar>
    <div class="body">
      <div v-for="items in msgList.data" :key="items.id" class="dynamic">
        <div class="img">
          <img :src="items.user.icon" alt=""> 
        </div>
        <div class="usermsg">
          <p class="username">{{items.user.name}}</p>
          <p class="usermsgs">{{items.message}}</p>
          <div>
            <img v-for="item in items.imgs" :key="item" :src="item" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      msgList: {},
      page: 1,
      isLoading: false,
      isFinished: false
    }
  },
  methods:{
    //滚动加载
    onScroll(){
      let ele = document.documentElement
      let scrollTop  = ele.scrollTop
      let clientHeight = ele.clientHeight 
      let scrollHeight = ele.scrollHeight
      if(scrollHeight - clientHeight - 50 < scrollTop){
        this.getMore()
      }
    },
    getMore(){
      if(this.isLoading || this.isFinished) return false
      this.page ++ 
      this.getMsg()

    },
    //获得朋友圈动态
    async getMsg(){
      this.isLoading = true
      let {data: res} = await this.$http.get('user/friend_msgs?page=' + this.page)
      this.isLoading = false
      console.log(res)
      if(this.page === 1){
        this.msgList = res
      }else{
        this.msgList.data = this.msgList.data.concat(res.data)
      }
      if(this.page === res.last_page){
        this.isFinished = true
      }
    },
    createMsg(){
      this.$router.push('/create_msg')
    }
  },
  mounted(){
    document.addEventListener('scroll',this.onScroll)
  },
  created(){
    this.getMsg()
  },
  beforeDestroy(){
    document.removeEventListener('scroll',this.onScroll)
  } 
}
</script>

<style lang="less" scoped>
.body{
  margin-top: 15px;
  padding-bottom: 100px;
}
.dynamic{
  padding: 35px;
  display: flex;
  border-top: 2px #eee solid;
  .img{
    img{
      width: 80px;
      height: 80px;
      border-radius: 5px;
    }
    margin-right: 20px;
  }
  .usermsg{
    .username{
      color: #636e82;
      font-size: 30px;
      font-weight: 550;
    }
    .usermsgs{
      margin:  20px 0;
    }
    p{
      font-size: 28px;

    }
    img{
      width: 155px;
      height: 155px;
      margin-right: 13px;
    }
    
  }
}
.van-nav-bar .van-icon{
  color: white;
}

</style>