<template>
    <div>
        <index-head :app="app" :current="1"></index-head>
        <div class="list">
            <ul>
                <li v-for="(item,index) in list" :key="index" class="item border-bottom">
                    <div class="item-info">
                        <p @click="jumpDetail('/huainan_det/'+item.tid)" class="item-title ellipsis-2">{{item.subject}}</p>
                        <p class="item-tag">
                            <span class="item-tag-span ellipsis-1">{{item.author}}</span><span class="item-tag-span ellipsis-1">{{item.replies}}</span>
                        </p>
                    </div>
                    <img v-if="item.imgs.length>=1" class="item-img" :src="item.imgs[0].attachurl">
                </li>
            </ul>
        </div>
        <template>
            <BackTop :bottom="60"></BackTop>
        </template>
    </div>
</template>

<script>
import IndexHead   from "@/pages/index/components/head.vue"
import {getHuaiNanList} from '@/api/api.js'
import jsonp from 'jsonp'
export default {
	name: 'huainan_list',
	data(){
		return {
            list:[],
            app:Object,
            page:1
		}
	},
	methods:{
        //获得淮南数据列表
		getHuaiNanList(){
            this.$Spin.show();
            getHuaiNanList(this.page).then(res=>{
                var data = res.data;
                if(this.list.length==0){
                    this.list = data.data.list.thread;
                } else {
                    this.list.push.apply(this.list,data.data.list.thread);
                }
                
                this.$Spin.hide();
            }).catch(error=>{
                this.$Spin.hide();
            });
        },
        //调用android页面
        jumpDetail(url){
           this.app.jumpChaChaDetail(url);
        }
	},
    mounted(){
        this.getHuaiNanList();
        this.app = $App;
    },
    components:{
		IndexHead,
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
                 _this.page++;
             	 _this.getHuaiNanList();
            }   
       }
    }
}
</script>


<style lang="stylus" scoped>
@import '~styles/gloabl.styl'
.list
    width:100%
    padding-left:.32rem
    padding-right:.32rem
    margin-top: .24rem
    .title
        height:.8rem
        width:100%
        text-align:left	
        background-color:#f6f7f9
        line-height:.8rem
        overflow:hidden
        text-overflow:ellipsis
        white-space:nowrap
        .iconfont-img
            margin-left:.1rem
            margin-right:.1rem
    .item
        display:flex
        overflow:hidden
        margin-bottom:.32rem
        .item-img
            width:2.8rem
            height:2rem
            padding:.1rem
            border-radius:.12rem
            object-fit:cover
        .item-info
            flex:1
            padding:.1rem
            text-align:left
            .item-title
                width:100%
                max-height:2rem
                min-height:1rem
                font-size:.32rem
            .item-tag
                margin-top:.2rem
                .item-tag-span
                    display:block
                    float:left
                    width:1.6rem
                    margin-right:.2rem
</style>