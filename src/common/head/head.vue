<template>
     <!-- head -->
        <div class="head">
            <span v-on:click="back" v-show="url" class="iconfont call_icon">&#xe8b5;</span>
            <span class="call_t">{{title}}</span>
        </div>
    <!-- end head -->
</template>

<style lang="stylus" scoped>
@import '~styles/gloabl.styl'
    .head
      width: 100%
      height: .88rem
      line-height: .88rem
      flex-direction: row
      border-bottom: 1px solid #e9e9e9
      padding-left: .24rem
      background-color :$bgColor
      color:white
      .call_icon
        width: .48rem
        height: .48rem
      .call_t
        margin-left: .12rem
        font-size: .32rem
        color:white
</style>

<script>
export default{
    name:'CommonHead',
    data(){
       return {
           
       }
    },
    props:{ //小道具
        title:{
            type:String,
        },
        url:{
            type:String,
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        }
    }
}
</script>
