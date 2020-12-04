<template>
  <div>
    <div class="user">
      <input type="file" ref="inputer" @change="addImg" value="上传图片">
      <div class="img">
        <img :src="user.icon" alt="" @click="imgClick"/>
        <p class="username">{{user.name}}</p>
      </div>
    </div>
    <van-cell title="路由跳转" is-link to="index" />
    <van-cell title="路由跳转" is-link to="index" />
    <van-cell title="路由跳转" is-link to="index" />
    <van-cell title="路由跳转" is-link to="index" />
    <van-button type="danger" @click="outline">退出登录</van-button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name: '',
      user: {
        icon: require('../assets/img_sc/img_01.jpg'),
        name: ''
      }
    }
  },
  methods:{
    //更改图片
    async addImg(e){
      let file = e.target.files[0]
      let form  = new FormData()
      form.append('icon', file)
      let {data: res} = await this.$http.post('user/upload', form)
      this.user = res.user
      let user = JSON.stringify(this.user)
      sessionStorage.setItem('user', user)
    },
    //点击图片
    imgClick(){
      let inputer = this.$refs.inputer
      inputer.click()
    },
    //退出登录
    outline(){
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      this.$router.push('/login')
    }
  },
  created(){
    let user = sessionStorage.getItem('user')
    let newUser = JSON.parse(user)
    this.user = newUser
  }
}
</script>

<style lang="less">
.user{
  height: 330px;
  background-color: #3298ed;
  widows: 750px;
  position: relative;
  text-align: center;
  input{
    display: none;
  }
  .img{
    background-color: #fff;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    img{
      border-radius: 50%;
      width: 120px;
      height: 120px;
    }
  }
}
</style>