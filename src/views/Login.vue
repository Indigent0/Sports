<template>
  <div>
    <van-nav-bar
        title="登陆"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
    <div>
        <van-cell-group>
            <van-field
                v-model="user.email"
                required
                label="Email"
                placeholder="请输入Email"
                :error-message="msg.email"
                @blur="emailFormat"
            />
            <van-field
                v-model="user.password"
                required
                label="密码"
                placeholder="请输入密码"
                :error-message="msg.password"
                @blur="passwordFormat"
            />
        </van-cell-group>
    </div>
    <div class="button" @click="login">
        <van-button type="primary">登陆</van-button>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            user:{
                email: this.$route.params.email,
                password: '',
            },
            msg:{
                email:'',
                password: '',
            },
            bool: false,
        }
    },
    methods:{
        //登陆
        async login(){
            let {data: res} = await this.$http.post('user/login', this.user)
            if( res.code !== 200) return this.$toast('登陆失败')
            this.$toast(res.msg)
            sessionStorage.setItem('token', res.user.api_token)
            let user = JSON.stringify(res.user)
            sessionStorage.setItem('user', user)
            this.$router.push('/home')
        },
        //返回
        onClickLeft(){
            this.$router.back()
        },
        //邮箱验证
        emailFormat(){
            var TEL_REGEXP = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(!TEL_REGEXP.test(this.user.email)){
                this.msg.email = "请输入正确的邮箱格式"
                this.bool = false
            }else{
                this.msg.email = ""
                this.bool = true
            }
        },
        //密码验证
        passwordFormat(){
            if(this.user.password === ''){
                this.msg.password = "密码格式不正确"
                this.bool = false
            }else if(this.user.password.length < 6){
                this.msg.password = "密码长度最小6位"
                this.bool = false
            }else{
                this.msg.password = ""
                this.bool = true
            }
        },
    },
    created(){
        console.log(this.email)
    }
}
</script>

<style>

</style>