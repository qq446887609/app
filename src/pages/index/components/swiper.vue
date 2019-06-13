<template>
	<div class="swiper">
		<swiper :options="swiperOption" v-if="showSwiper">
		    <swiper-slide v-for="(item,index) of list" :key="index"><img class="swiper-img" :src="item.img_url"></swiper-slide>
	  		<div class="swiper-pagination"  slot="pagination"></div>
	  	</swiper>
	</div>
</template>

<script>
	//子组件里定义data data一定是一个函数
export default {
	name: 'IndexSwiper',
	props:{
		list:Array
	},
	data(){
		return {
			swiperOption:{ //使用的是swiper4x 查看此版本文档
				autoplay:true,
				pagination: {
			    	el: '.swiper-pagination',
			  	},
			}
		}
	},
	computed: {
	    showSwiper () {
	      return this.list.length
	    }
  	}
}
</script>


<style lang="stylus" scoped>
.swiper
  overflow:hidden
  width:100%
  height:0
  padding-bottom:31.25%
  margin-top:.24rem
  margin-bottom:.24rem
.swiper-img
  object-fit:cover
  width:100%
</style>