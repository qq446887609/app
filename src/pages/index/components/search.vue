<template>
	<div class="search_div">
		 <Input class="search-key" v-model="searchKey" placeholder="search key...">
            <Icon @click="search"  type="ios-search" slot="suffix" />
        </Input>
	</div>
</template>

<script>
export default {
	name: 'IndexSearch',
	data(){
		return {
			searchKey:""
		}
	},
	methods:{
		//向父组件传参数
		search(){
			if(this.searchKey.length>0){
				this.$emit("searchKey",this.searchKey);
			}
		}
	},
	watch:{
		
	}
}
</script>


<style lang="stylus" scoped>
@import '~styles/gloabl.styl'
	.search_div{
	  width: 100%;
	  height: .88rem;
	  line-height:.88rem;
	  padding-left:.32rem;
	  padding-right:.32rem;
	  margin-bottom: .24rem;
	}
	  
	.search-key{
	  width: 100%;
	}
	   

		
</style>