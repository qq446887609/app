<template>
	<div class="head">
		<ul>
			<template>
				<li v-for="(item,index) in head_item" v-bind:key="index" @click="jumpOtherMenu(item.url)"  :class="{activit:item.current==current}"><span class="iconfont tab-icon" v-html="item.icon"></span>{{item.name}}</li>
			</template>
		</ul>
	</div>

</template>

<script>
export default {
	name: 'IndexHead',
	props:{
		current:Number,
		app:Object
	},
	data(){
		return {
			head_item:[
				{name:"橘生淮南",icon:"&#xe87c;",url:"/huainan_list",current:1},
				{name:"ACG",icon:"&#xe7da;",url:"/",current:2},
				{name:"粮草书单",icon:"&#xe854;",url:"/book_recommend",current:3},
			]
		}
	},
	methods:{
		//跳转到其他菜单
		jumpOtherMenu(url){
			this.$router.push({path:url, params: {app: app}})
		}
	}
}
</script>
<!-- 使用stylus 同时样式限制为本组件有效 -->
<style lang="stylus" scoped>
	@import '~styles/gloabl.styl'
	a{

	}
	.head{
		height:.86rem; 
		width:100%;
		border-bottom:1px solid #c0c0c0;
		margin-bottom:.12rem
	}
	ul {
		height: .86rem
	}
	ul li {
		width:33%
		height: .86rem
		padding: 8px 16px
		text-align :center
		box-sizing: border-box
		cursor: pointer
		text-decoration: none
		position: relative
		transition: color .3s ease-in-out
		float:left
	}
	.activit{
		color: $bgColor
		border-bottom:2px solid $bgColor
	}
	.tab-icon{
		margin-right:0.1rem
	}

</style>