<!-- 书单列表 -->
<template>
    <div>
        <common-head :title="heads.title" :url="heads.url"></common-head>
        <div  class="content">
            <div class="nav">
                <p class="nav-title"><b>{{bookList.title}}!</b></p>
                <p class="nav-tag">
                    <Tag color="success">编辑推荐</Tag>
                </p>
                <p class="nav-desc">{{bookList.desc}}</p>
                <p class="nav-auth">
                    <img  class="cover" :onerror="errorImg" :src="handle_cover_url(bookList.author.avatar)">
                    <span class="nickname">{{bookList.author.nickname}}</span>
                    <span class="created">创建于 {{bookList.created}}</span>
                </p>
            </div>

            <!-- list -->
            <div v-for="(item,index) in bookList.books" v-bind:key="index" class="item">
                <div class="item-frist">
                    <div class="item-cover">
                        <router-link :to="/book_detail/+item.book._id"><img  :src="handle_cover_url(item.book.cover)" /></router-link>
                    </div>
                    <div class="item-info">
                        <router-link :to="/book_detail/+item.book._id"><p class="info-title">{{item.book.title}}</p></router-link>
                        <div class="start-read"><Tag color="orange">开始阅读</Tag></div>
                        <p class="info-auth"><span class="iconfont auth">&#xe626;</span><span>{{item.book.author}}</span></p>
                        <p class="info-num"><span>{{item.book.cat}}</span><span class="num">124w字</span></p>
                    </div>
                </div>
                <div class="item-lower">
                    {{item.comment}}
                </div>
            </div>
            <!-- end list -->
            <template>
                <BackTop :bottom="60"></BackTop>
            </template>

           
        </div>
    </div>
</template>

<style lang="stylus" scoped>
    .content
      text-align: left
      background-color:#f6f7f9
      .nav
        margin-top :.12rem
        width : 100%
        height : 100%
        background-color :#fff
        padding-left:.24rem
        padding-right: .24rem
        padding-bottom:.12rem
        .nav-title
          margin-top :.12rem
          font-size:.32rem
        .nav-desc
          margin-top:.12rem
        .nav-tag
          display :block
          flex-direction :row
          margin-top .12rem
        .nav-auth
          display :block
          flex-direction :row
          margin-top .12rem
          .cover
            width :.48rem
            height:.48rem
            border-radius:50%
          .nickname
            margin-left :.12rem
            color :red
          .created
            margin-left :.12rem
            color :#c0c0c0
      .item
        margin-top .16rem
        width :100%
        background-color :#fff
        padding-left:.24rem
        padding-right: .24rem
        padding-top 0.24rem
        padding-bottom:0.24rem
        flex-direction :column
        .item-frist
          width :100%
          flex-direction :row
          height :2.3rem
          border-bottom:1px solid #e9e9e9
          .item-info
            flex-direction :column
            width:75%
            height :100%
            float left
            padding-left :.24rem
            .start-read
              position:relative
              float:right
              bottom :.46rem
            .info-title
              font-size:.32rem
            .info-auth
              color:#c0c0c0
              margin-top :.24rem
              .auth
                margin-right :.12rem
                font-size:12px
            .info-num
              color:#c0c0c0
              margin-top :.24rem
              display :block
              .num
                margin-left :.12rem
          .item-cover
            width :25%
            height :100%
            float left
          .item-cover img 
            width :100%
            height :2rem
            box-shadow:2px 2px 2px 2px #c0c0c0
            object-fit:cover
        .item-lower
          margin-top :.12rem
          width :100%
          height :100%
          padding-top:.12rem
          padding-bottom:.12rem    
</style>

<script>
import CommonHead from 'common/head/head.vue'
import {getBookRecommentDetail,getZhuishuStaticPic} from '@/api/api.js'
export default{
    name:'BookList',
    data(){
        return {
            heads:{
                title:'书单详情',
                url:"http://"
            },
            bookList:[],
            errorImg:"this.src='https://front.erciyuan.club/Focus/20161119/focus/20161119095008704cc9b40a55486bbbc94a3d57dded70.jpg'"
        }
    },
    methods:{
        getDetailList(id){
            this.$Spin.show();
            getBookRecommentDetail(id).then(res=>{
                this.$Spin.hide();
                if(res.status==200){
                    this.bookList = res.data.bookList
                }
            }).catch((res)=>{
              this.$Spin.hide();
            });
        },
        handle_cover_url(url){
           return getZhuishuStaticPic(url);
        },
    },
    mounted:function(){
        this.getDetailList(this.$route.params.id);
    },
    components:{
        CommonHead
    }
}
</script>