<template>
  <div>
      <van-nav-bar
        left-text="返回"
        right-text="发表"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onSubmit"
        />
        <div class="body">
            <van-field v-model="message" label="文本" placeholder="请输入用户名" />
            <van-uploader v-model="fileList" multiple :after-read="afterRead" class="img"/>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            message:'',
            fileList:[],
            form:new FormData()
        }
    },
    methods:{
        //发表动态
        async onSubmit(){
            this.form.append('message', this.message)
            let {data: res} = await this.$http.post('user/send_friend_msg', this.form)
            if(res.code !== 200) {
                this.$toast('发表失败')
                }
            else{ 
                this.$toast(res.msg)
                this.$router.push('/find')
                }
            console.log(res)
        },
        //上传图片
        afterRead(e){

            if(e.constructor === Object){
                this.form.append('myfile[]',e.file);
            }else{
                e.forEach(item => {
                    this.form.append('myfile[]',item.file);
                });
            }
        },
        //返回
        onClickLeft(){
            this.$router.back()
        },
        onClickRight(){

        }
    }
}
</script>

<style lang="less" scoped>
.body{
    padding: 0 10px;
    .img{
        margin-top: 20px;
    }
}
</style>