<template>
	<div>
		<div @click="showGallary" class="banner">
			<img  class="banner-img" v-if="article" :src="article.cover_url">
			<div class="info">
				<div class="title" v-if="article">{{article.title}}</div>
				<div class="c-time" v-if="article">{{article.created_at}}</div>
			</div>
		</div>
		<gallary @close="closeGallary" v-show="is_show_gallary"></gallary>
	</div>
</template>

<script>
import Gallary from 'common/gallary/gallary.vue'
export default {
	name: 'header',
	components:{
		Gallary
	},
	props:{
		article:Object
	},
	data(){
		return {
			is_show_gallary:false
		}
	},
	methods:{
		showGallary(){
			this.is_show_gallary = true;
		},
		closeGallary(){
			this.is_show_gallary = false;
		},
		//图片加载失败时事件
		imgError(article){
			article.cover_url = "https://front.erciyuan.club/Focus/20161119/focus/20161119095008704cc9b40a55486bbbc94a3d57dded70.jpg";
		}
	}
}
</script>

<style lang="stylus" scoped>
	.banner
	  position: relative
	  overflow: hidden
	  height: 0
	  padding-bottom: 55%
	  .banner-img
	    width: 100%
			min-height: 100%
			object-fit:cover
	  .info
	    display: flex
	    position: absolute
	    left: 0
	    right: 0
	    bottom: 0
	    line-height: .6rem
	    color: #fff
	    background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))
	    .title
	      flex: 1
	      font-size: .32rem
	      padding: 0 .2rem
	      text-align:left
	    .c-time
	      padding: 0 .2rem
</style>