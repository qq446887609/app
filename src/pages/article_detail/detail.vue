<template>
	<div>
		<det-header :article="article"></det-header>
		<det-top></det-top>
		<div class="content">
			<p class="title" v-if="article"><b>{{article.title}}</b></p>
			<p v-if="article" class="tags">
				<template >
					<Tag  v-for="(item,index) in article.tag" :key="index">{{item}}</Tag>
				</template>
			</p>
			<p v-if="article" class="info" v-html="article.content"></p>
		</div>
		<!-- 学习使用递归组件 当前组件调用当前组件自己 需要用到组件 name -->
		 <template>
					<BackTop :bottom="60"></BackTop>
			</template>
	</div>
</template>


<script>
import DetHeader from "./components/header.vue"
import DetTop    from "./components/top.vue"
import {getArticle} from "@/api/api.js"
export default {
	name: 'detail',
	components:{
		DetHeader,
		DetTop
	},
	data () {
		return {
			article:null
		}
	},
	methods:{
		//获得文章详情
		getArticle(id){
			this.$Spin.show();
			getArticle(id).then((res)=>{
				this.$Spin.hide();
				if (res.data) {
					this.article = res.data;
				}
			}).catch((err)=>{
				this.$Spin.hide();
			});
		}
	},
	mounted(){
		this.getArticle(this.$route.params.id);
	}
}
</script>

<style lang="stylus" scoped>
	.content
	  margin-top:.24rem
	  width:100%
	  height:100%
	  padding-left:.36rem
	  padding-right:.36rem
	  .title
	    font-size:.36rem
	  .tags
	    margin-top:.12rem
	  .info
	    margin-top:.12rem
	  .info >>> img 
	    max-height:1rem !important
	    width:100% !important
</style>