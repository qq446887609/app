<template>
	<div class="list">
		<div class="title">
			<span class="title_left"><span class="iconfont iconfont-img">&#xeeff;</span>最新爬取</span>
			<span @click="jumpArtilceList" class="title_right">更多>>></span>
		</div>
		<ul>
			<li v-for="(item,index) in list" :key="index" class="item border-bottom">

				<img @click="jumpDetail(item.id)" :onerror="errorImg" class="item-img" :src="item.cover_url">
				<div class="item-info">
					<p @click="jumpDetail(item.id)" class="item-title">{{item.title}}</p>
					<p class="item-desc">{{item.description}}</p>
					<p class="item-tag">
						<span v-for="(vo,j) in item.tag" :key="j">{{vo}}</span>
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'NewList',
	props:{
		list:Array,
		app:Object,
	},
	data(){
		return {
			errorImg:"this.src='https://front.erciyuan.club/Focus/20161119/focus/20161119095008704cc9b40a55486bbbc94a3d57dded70.jpg'"
		}
	},
	methods:{
		//跳转android加载的详情
		jumpDetail(id){
			let url = '/art_det/'+id;
			this.app.jumpArticleDetail(url);
		},
		//查看更多
		jumpArtilceList(){
			this.app.jumpArticleListFragment("");
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
			.title_left
			    padding-left:.12rem
			    float:left
				height:.8rem
				.iconfont-img
					margin-left:.1rem
					margin-right:.1rem
			.title_right
				padding-right:.12rem
				float:right
				text-align :right
				height:.8rem
		.item
			display:flex
			overflow:hidden
			.item-img
				width:2.8rem
				height:2rem
				padding:.1rem
				border-radius:.12rem
				object-fit: cover;
			.item-info
				margin-left:.1rem
				flex:1
				padding:.1rem
				text-align:left
				overflow:hidden
				text-overflow:ellipsis
				white-space:nowrap
				.item-title
					height:.54rem
					line-height:.54rem
					font-size:.32rem
				.item-desc
					margin-top:.1rem
					height:.54rem
					line-height:.54rem
					color:#ccc
				.item-tag
					margin-top:.2rem
				  .tag-span
				      display:block
				      width:.64rem
					  padding:.1rem
					  background-color:#f6f7f9;
					  margin-right:.1rem

</style>