<template>
    <div>
        <van-nav-bar
            title="注册"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        <div>
            <van-cell-group>
                <van-field
                    v-model="user.name"
                    required
                    label="用户名"
                    :error-message="msg.name"
                    placeholder="请输入用户名"
                    @blur="nameFormat"
                />
                <van-field
                    v-model="user.email"
                    required
                    label="Email"
                    placeholder="请输入Email"
                    :error-message="msg.email"
                    @blur="emailFormat"
                />
                <van-field
                    v-model="user.tel"
                    required
                    label="手机号"
                    placeholder="请输入手机号"
                    :error-message="msg.tel"
                    @blur="telFormat"
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
        <div class="button" @click="register">
            <van-button type="primary">注册</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            user:{
                name: '',
                email: '',
                tel: '',
                password: '',
            },
            msg:{
                name:'',
                tel:'',
                email:'',
                password: '',
            },
            bool: false,
        }
    },
    methods:{
        //返回
        onClickLeft(){
            this.$router.back()
        },
        //用户名验证
        nameFormat(){
            if(this.user.name === ''){
                this.msg.name = "用户名格式不正确"
                this.bool = false
            }else if(this.user.name.length < 6){
                this.msg.name = "用户名长度最小6位"
                this.bool = false
            }else{
                this.msg.name = ""
                this.bool = true
            }
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
        //手机验证
        telFormat(){
            var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
            if(!TEL_REGEXP.test(this.user.tel)){
                this.msg.tel = "请输入正确的手机格式"
                this.bool = false
            }else{
                this.msg.tel = ""
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
        //发送注册请求
        async register(){
            if(this.bool === false) return this.$toast('请输入完整信息')
            let {data: res} = await this.$http.post('user/reg', this.user)
            if(res.code !== 200){
                this.$toast('用户注册失败')}
            else{
                this.$toast(res.msg)
                // sessionStorage.setItem()
                this.$router.push({
                    name: "Login",
                    params: {
                        email: this.user.email
                    }
                })
            }
        }
    },
    created(){

    }
}
</script>

<style lang="less">
.button{
    text-align: center;
}
</style>