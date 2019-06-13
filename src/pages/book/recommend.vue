<!-- 推荐列表 -->
<template>
<div>
    <index-head :app="app" :current="3"></index-head>
    <div class="content">
        <!-- nav -->
        <template>
            <div class="nav">
                <ul>
                    <li @click="duration = 'all'" :class="{'nav-active':condi=='all'}">
                        全部
                        </li>
                    <li @click="duration = 'last-seven-days'" :class="{'nav-active':condi=='last-seven-days'}">
                        7日最热
                        </li>
                    <li @click="sort = 'created'" :class="{'nav-active':condi=='created'}">
                        最新创建
                        </li>
                    <li @click="sort = 'collectorCount'" :class="{'nav-active':condi=='collectorCount'}">
                        最多收藏
                        </li>
                </ul>
            </div>
        </template>
        <!-- end nav -->

        <!-- tag -->
        <template>
            <div class="tag">
                <ul>
                    <li class="tag-active">
                        <Tag type="border" color="primary">全部</Tag>
                        </li>
                    <li>
                        <Tag type="border">历史</Tag>
                        </li>
                    <li>
                        <Tag type="border">武侠</Tag>
                        </li>
                    <li>
                        <Tag type="border">都市</Tag>
                        </li>
                    <li>
                        <Tag type="border">无限</Tag>
                        </li>
                    <li>
                        <Tag type="border">恐怖</Tag>
                        </li>
                    <li>
                        <Tag type="border">玄幻</Tag>
                        </li>
                    <li>
                        <Tag type="border">仙侠</Tag>
                        </li>
                </ul>
            </div>
        </template>
        <!-- end tag -->

        <!-- list -->
        <template>
            <div class="list">
                <div  v-for="(item,index) in bookList" :key="index" class="items">
                    <div class="item-info">
                        <div @click="jumpBookList('/book_list/'+item._id)" class="item-title">
                            <b>{{item.title}}</b>
                        </div>
                        <div class="item-tag">
                            <p>{{item.bookCount}}本|{{item.collectorCount}}收藏</p>
                        </div>
                        <div class="item-desc">
                            {{item.desc}}
                        </div>
                    </div>
                    <div class="item-cover">
                        <img :onerror="errorImg" @click="jumpBookList('/book_list/'+item._id)" class="item-cover-img" :src="handle_cover_url(item.cover)">
                    </div>
                </div>
                
            </div>
        </template>
        <!-- end list -->
        <template>
                <BackTop :bottom="60"></BackTop>
        </template>
    </div>
</div>
</template>

<style scoped>
    ul{
        list-style: none;
    }
    ul li{
        float: left;
    }
    .content{
        padding-left:.24rem;
        padding-right: .24rem; 
        text-align: left;
    }
    .list{
        width: 100%;
        margin-top: .24rem;
        height: 100%;
    }
    .nav{
        width: 100%;
        height: .88rem;
    }
    .nav ul{
        height: .88rem;
       
    }
    .nav ul li{
        padding-left:.24rem;
        padding-right: .24rem; 
        height: .88rem;
        line-height: .88rem;
        text-align: center;
    }
    .nav-active{
        color: #2d8cf0;
        border-bottom:.04rem solid #2d8cf0;
    }
    .tag{
        width: 100%;
        height:1.72rem;
        margin-top: .24rem;
    }
    .tag ul li{
        height: .88rem;
        line-height: .88rem;
    }
    
    .items{
        margin-bottom: .12rem;
        padding-top: .12rem;
        padding-bottom: .12rem;
        height: 2.2rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        border-bottom: .02rem solid #e9e9e9;
    }
    .item-info{
        flex-direction: column;
        width: 65%;
    }
    .item-title{
        width: 100%;
        height: .48rem;
        line-height: .48rem;
        font-size: .32rem;
        overflow:hidden;/*超出长度的文字隐藏*/
        text-overflow:ellipsis;/*文字隐藏以后添加省略号*/
        white-space:nowrap;/*强制不换行*/
    }
    .item-tag{
        margin-top: .22rem;
        height: .28rem;
        line-height: .28rem;
        width: 100%;
    }
    .item-tag p{
        font-size: .16rem;
    }
    .item-desc{
        margin-top: .22rem;
        width: 100%;
        font-size: .24rem;
        overflow:hidden;/*超出长度的文字隐藏*/
        text-overflow:ellipsis;/*文字隐藏以后添加省略号*/
        white-space:nowrap;/*强制不换行*/
    }
    .item-cover{
        margin-left: 10%;
        width: 25%;
        height: 1.88rem;
    }
    .item-cover-img{
        width: 100%;
        height: 1.78rem;
        object-fit:cover
    }
</style>

<script>
import IndexHead   from "@/pages/index/components/head.vue"
import axios from 'axios'
import CommonHead from 'common/head/head.vue' 
import {getZhuishuStaticPic,getZhuishuRecommendList} from '@/api/api.js'
export default {
    name: 'BookRecommend',
    components:{
        CommonHead,
        IndexHead
    },
	data() {
		return {
            heads:{
                title:'书单列表',
                url:'http://www.baidu.com'
            },
			sort : '',//排序方式
	        duration : 'all',//获得日期
	        start:0,//起始页
            bookList:[],
            app:Object,
            condi:'all',
            errorImg:"this.src='https://front.erciyuan.club/Focus/20161119/focus/20161119095008704cc9b40a55486bbbc94a3d57dded70.jpg'"
		}
	},
    methods: {
        show: function () {
            this.visible = true;
        },
        //获得推荐列表
        get_list:function(){
            this.$Spin.show();
            getZhuishuRecommendList(this.sort,this.duration,this.start).then(this.success).catch((err)=>{
                this.$Spin.hide();
            });
        },
        success:function(res){
            this.$Spin.hide();
            var data = res.data;
            if(data.ok==true)
            {
                if(this.start==0){
                    this.bookList=  data.bookLists;
                } else {
                    this.bookList.push.apply(this.bookList,data.bookLists);
                }
                
            }
        },
        //处理追书神器图片资源路由
        handle_cover_url:function(url){
           return getZhuishuStaticPic(url);
        },
        //跳转android  activity
        jumpBookList(url){
            this.app.jumpBookRecommendDetail(url);
        },
    },
    mounted:function(){
        this.get_list();
        //java js 对象
        this.app = $App;
    },
    watch:{
        sort:function(){
            this.duration = '';
            this.condi = this.sort;
            this.start = 0;
            this.get_list();
        },
        duration:function(){
            this.sort = '';
            this.condi = this.duration;
            this.start = 0;
            this.get_list();
        }
    },
    created(){
      var _this = this;
      window.onscroll = function(){
     		//变量scrollTop是滚动条滚动时，距离顶部的距离
     		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
     		//变量windowHeight是可视区的高度
     		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
     		//变量scrollHeight是滚动条的总高度
     		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
          //滚动条到底部的条件
          if(scrollTop+windowHeight==scrollHeight){
               //写后台加载数据的函数
              _this.start++;
           	 _this.get_list();
          }   
       }
  }
}
</script>