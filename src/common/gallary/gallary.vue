<template>
	<div class="content"  @click="closeGallary">
			<div class="wrap">
				<swiper :options="swiperOption">
				    <swiper-slide>
				    	<img class="gallary-img" src="https://front.erciyuan.club/Focus/20161211/focus/20161211112201b13a4fcadcb647bd86b2d532e21f492f.jpg">
				    </swiper-slide>
				    <swiper-slide>
				    <img class="gallary-img" src="https://front.erciyuan.club/Focus/20161119/focus/20161119095008704cc9b40a55486bbbc94a3d57dded70.jpg">
				    </swiper-slide>
			  		<div class="swiper-pagination"  slot="pagination"></div>
			  	</swiper>
			</div>
	</div>
</template>

<script type="text/javascript">
export default {
	name:'gallary',
	data(){
		return {
			swiperOption:{//使用的是swiper4x 查看此版本文档
				pagination: {
			    	el: '.swiper-pagination',
			    	type: 'fraction',
			  	},
			  	observer: true,//修改swiper自己或子元素时，自动初始化swiper
　　　　			observeParents: true,//修改swiper的父元素时，自动初始化swiper
			},
			showGallary:0
		}
	},
	methods:{
		closeGallary(){
			this.$emit('close');//子组件向父组件触发关闭事件
		}
	}
}
</script>

<style lang="stylus" scoped>
.content >>> .swiper-container
    overflow: inherit
    color:red
.content
  display: flex
  flex-direction: column
  justify-content: center
  z-index: 99
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  background: #000
  .wrap
    height: 0
    width: 100%
    padding-bottom: 100%
    .gallary-img
      width: 100%
    .swiper-pagination
      color: #fff
      bottom: -1rem
</style>