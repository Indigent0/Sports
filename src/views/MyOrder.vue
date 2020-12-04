<template>
  <div>
        我的订单
  </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        async getOrder(){
            let {data: res} = await this.$http.get('user/my_orders')
            console.log(res)
        },
    },
    created(){
        this.getOrder()
    }
}
</script>

<style>

</style>