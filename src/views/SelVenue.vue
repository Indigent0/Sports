<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="body">
        <van-address-list
            v-model="chosenAddressId"
            :list="venue"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
            add-button-text="确认地址"
            />
    </div>
  </div>
  
</template>

<script>
export default {
  data(){
    return{
        type_id: this.$route.params.type_id,
        chosenAddressId: 0,
        venue: [],
        selectVenue: {}
    }
  },
  methods:{
    //返回
    onClickLeft(){
      this.$router.back()
    },
    //获取对应类型场馆
    async getVenueList(){
        let {type_id} = this
        let {data: res} = await this.$http.get('venue/list', {params:{type_id}})
        this.venue = res.data
        this.chosenAddressId = res.data[1].id
        this.selectVenue = res.data[1]
        console.log(res)
    },
    //切换选中地址得到当前地址信息
    onSelect(venue, index){
        this.selectVenue = venue
    },
    //确认地址
    onAdd(){
        this.$router.push({
            name: 'CreateGame',
            params: {
                selectVenue: this.selectVenue
            }
        })
    },
    //编辑地址
    onEdit(){

    }
  },
  created(){
      this.getVenueList()
  }
}
</script>

<style>

</style>