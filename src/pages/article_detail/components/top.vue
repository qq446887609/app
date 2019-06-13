<template>
	<div>
		<div class="header-img"><span v-on:click="back" class="iconfont img-s">&#xe60a;</span></div>
		<div :style="opacityStyle" v-show="show_top" class="header-div">
			<div  class="back">
				<span v-on:click="back" class="iconfont back-img">&#xe60a;</span>
			</div>
			文章详情
		</div>
	</div>
</template>

<script>
export default {
	name: 'top',
	data(){
		return {
			show_top:false,
			opacityStyle:{
				opacity:0
			}
		}
	},
	methods:{
		handleScroll(){
			console.log('scrool');
			const top = document.documentElement.scrollTop;//获得距离顶部距离
			if(top>60)
			{
				let opacity = top / 140;
				opacity = opacity > 1 ? 1 : opacity //设置渐渐隐
				this.opacityStyle = {opacity};
				this.show_top = true;
			}
			else
			{
				this.show_top = false
			}
		},
		//返回上一页 
		back(){
			this.$router.go(-1);
		}
	},
	mounted(){
		window.addEventListener('scroll', this.handleScroll) //注册向下滚动实时监控事件
	},
	unmounted () {
	    window.removeEventListener('scroll', this.handleScroll) //取消全局注册事件
	}
}
</script>

<style lang="stylus" scoped>
	@import '~styles/gloabl.styl'
	.header-img
	  position:absolute
	  left:.2rem
	  top:.2rem
	  width:.8rem
	  height:.8rem
	  line-height: .8rem
	  border-radius: .4rem
	  text-align: center
	  background: rgba(0, 0, 0, .8)
	  .img-s
	    font-size:.4rem
	    color:#fff
	.header-div
	  flex-direction:row
	  width:100%
	  text-align:center
	  background-color:$bgColor
	  height:$headerHeight
	  line-height:$headerHeight
	  z-index: 2
	  position: fixed
	  top: 0
	  left: 0
	  right: 0
	  color:#fff
	  font-size:.28rem
	  .back
	  	position:absolute
	  	left:.2rem
	  	.back-img
	  	  font-size.5rem
</style>