<template>
	<div>
		<index-head :app="app" :current="2"></index-head>
		<index-swiper :list="swiper"></index-swiper>
		<index-search v-on:searchKey="searchKey"></index-search>
		<index-icons :jumpType="jumpType"  v-on:jumpArticleList="jumpArticleList"></index-icons>
		<template v-if="!spinShow">
		<new-list :app="app"  :list="newArticles"></new-list>
		</template>
		<template v-else>
			  <Spin>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载最新动画中...</div>
            </Spin>
		</template>
		<template>
        <BackTop :bottom="60"></BackTop>
		</template>
	</div>
</template>

<script>
import IndexHead   from "./components/head.vue"
import IndexSwiper from "./components/swiper.vue"
import IndexSearch from "./components/search.vue"
import IndexIcons  from "./components/icons.vue"
import NewList     from "./components/new_list.vue"
import {getBanner,getArticles} from "@/api/api.js"
import axios from 'axios'
export default {
	name: 'index',
	components:{
		IndexHead,
		IndexSwiper,
		IndexSearch,
		IndexIcons,
		NewList,
	},
	data () {
		return {
			swiper:[],
			newArticles:[],
			spinShow: true, //文章加载
			token:"",
			app:Object, //安卓js方法对象
			jumpType:'index'
		}
	},
	methods:{
		//获得swiper
		getSwiper(){
			this.$Spin.show();
			getBanner().then((res)=>{
				this.$Spin.hide();
				if (res.data) {
					let data = res.data;
					this.swiper = data.data;
				}
			});
		},
		//获得最新文章
		getNewArticle(){
			getArticles().then((res)=>{
				this.spinShow = false;
				if (res.data) {
					let data = res.data;
					this.newArticles = data.data
				}
			});
		},
		//获得android返回登录用户token 并存储起来
		getUser(token){
			this.token = token;
			if(!indow.localStorage.getItem("user_token")){
				window.localStorage.setItem("user_token",this.token);
			}
		},
		//子组件传递搜索条件 用户关键字搜索
    searchKey(key){
			//跳转文章列表 这里执行安卓接口 跳转到文章列表fragment
			let url = '/art_list/0/'+key;
			this.app.jumpArticleListFragment(url);
		},
		//子组件传递搜索条件 用户tag搜索
		jumpArticleList(tag){
			let url = '/art_list/'+tag;
			//跳转文章列表 这里执行安卓接口 跳转到文章列表fragment
			this.app.jumpArticleListFragment(url);
		}
	},
	mounted(){
		this.getSwiper();
		this.getNewArticle();
		//android 传值给js
		window.getUser=this.getUser;

		//执行java方法
		//$App.showToast();
		this.app = $App;
	}
}
</script>

<style>
	.ivu-tabs-nav{
		width:33%
	}
	.token{
	  width:100%;
	  height:100%;
	  padding-left:.36rem;
	  padding-right:.36rem;
	} 
</style>