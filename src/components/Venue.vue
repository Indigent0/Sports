<template>
    <div>
        <div class="sports" v-for="item in venue" :key="item.id" @click="detail(item.id)">
            <img :src="item.cover_url"/>
            <div>
                <p class="name">{{item.name}}</p>
                <p class="address">{{item.address}}</p>
                <p class="time">{{item.type_name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        venue:{
            type: Array,
            default: []
        }
    },
    methods:{
        detail(id){
            console.log(id)
            this.$router.push({
                path: '/detail',
                query:{
                    id
                }
            })
        }
    }
}
</script>

<style lang="less" scope>
.sports{
    display: flex;
    padding: 30px;
    border-bottom: 1px solid #eee;
    img{
      height: 160px;
      width: 200px;
      padding-right: 30px;
    }
    .name{
      font-size: 28px;
    }
    .address{
      font-size: 20px;
      color: gray;
      line-height: 70px;
      border-bottom: 1px solid #eee;
    }
    .time{
      font-size: 20px;
      line-height: 70px;
    }
  }
</style>