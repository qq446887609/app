<template>
    <div>
    <common-head :title="heads.title" :url="heads.url"></common-head>
        <div class="content">
        <!-- list -->
            <div v-for="(item,index) in bookList" v-bind:key="index" class="item">
                <div class="item-cover">
                    <img :src="item.cover_url">
                </div>
                <div class="item-info">
                    <p class="title"><b>{{item.book_name}}</b></p>
                    <p class="update-info">第125章 大院F4(求推荐票)</p>
                    <div class="up_tag"><Tag color="red">有更新</Tag></div>
                    <p class="update-time"><span class="iconfont up_icon">&#xe7eb;</span> 2019/09/02</p>
                </div>
            </div>
        <!-- end list -->
        </div>
    </div>
</template>

<style lang="stylus" scoped>
    .content
      padding-left:.24rem
      padding-right: .24rem
      margin-top .24rem
      .item
        width :100%
        height :2rem
        padding-top:.06rem
        padding bottom 0.06rem
        margin-bottom :.12rem
        .item-cover
          width :20%
          height:1.75rem
          float :left
        .item-cover img
          width :100%
          height:1.75rem
          object-fit:cover
        .item-info
          padding-left:.24rem
          width:75%
          height:1.75rem
          float: left
          flex-direction:column
          .title
            font-size:.28rem
          .update-info
            margin-top :.16rem
            color :#c0c0c0
          .up_tag
            position:relative
            float:right
            left :.12rem
          .update-time
            margin-top :.16rem
            color :#c0c0c0
            .up_icon
              font-size:.24rem
</style>

<script>
import CommonHead from 'common/head/head.vue'
import {getBookshelf} from '@/api/api.js'
export default {
    name: 'BookShelf',
    components:{
        CommonHead
    },
	data() {
		return {
            heads:{
                title:'我的书架',
                url:''
            },
            bookList:""
        }
    },
    methods:{
        //获得用户书架
        //这里需要注意用户token过期处理 todu
        getUserBookshelf(){
            getBookshelf().then(res=>{
                if(res.data){
                    this.bookList = res.data.data;
                }
                this.$Spin.hide();
            }).catch(error=>{
                this.$Spin.hide();
            });
        }
    },
    mounted(){
        this.getUserBookshelf();
    }
}
</script>