<template>
	<div class="icons">
		<div class="icon">
			<div class="icon-img">
				<img @click="jumpArticlesList('妹')" class="icon-img-content" src="@/assets/img/youger_sister.png">
			</div>
			<p class="iocn-desc">M</p>
		</div>
		<div class="icon">
			<div class="icon-img">
				<img @click="jumpArticlesList('姐')" class="icon-img-content" src="@/assets/img/elder_sister.png">
			</div>
			<p class="iocn-desc">J</p>
		</div>
		<div class="icon">
			<div class="icon-img">
				<img @click="jumpArticlesList('母')" class="icon-img-content" src="@/assets/img/mama.png">
			</div>
			<p class="iocn-desc">KS</p>
		</div>
		<div class="icon">
			<div class="icon-img">
				<img @click="jumpArticlesList('人妻')" class="icon-img-content" src="@/assets/img/femme.png">
			</div>
			<p class="iocn-desc">RQ</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'IndexIcons',
	props:{
		jumpType:String //标示跳转方式不同,"index" 为index页面使用该组件 跳转到android  "list" 为在list页面使用该组件使用vue router跳转
	},
	methods:{
		jumpArticlesList(tag){
			//标示跳转方式不同,"index" 为index页面使用该组件 跳转到android  "list" 为在list页面使用该组件使用vue router跳转
			if(this.jumpType=="index"){
				this.$emit("jumpArticleList",tag);
			} else {
				this.$emit("jumpRouterArticleList",tag);
			}
		}
	}
}
</script>


<style lang="stylus" scoped>
@import '~styles/gloabl.styl'
@import '~styles/strhid.styl'
	.icons
		overflow:hidden
		height:0
		width:100%
		padding-bottom:25%
		.icon
			position:relative
			height:0
			width:25%
			padding-bottom:25%
			float:left
			.icon-img
				position:absolute
				left:0
				right:0
				top:0
				bottom:.44rem
				padding:.1rem
				.icon-img-content
					height:100%
					display:block
					margin:0 auto
					box-sizing:border-box
					border-radius:.12rem
			.iocn-desc
				position:absolute
				bottom:0
				right:0
				left:0
				height:.44rem
				line-height:.44rem
				color:$textColor
				text-align :center
				strhid()


</style>