<!-- vue list -->
<template>
<div class="body">
  <template>
    <div v-if="tag.length<=0&&key.length<=0" class="nav">
      <index-search v-on:searchKey="searchKey"></index-search>
      <index-icons v-on:jumpRouterArticleList="jumpRouterArticleList" :jumpType="jumpType"></index-icons>
    </div>
    <div v-else class="search-tag">
      <span style="font-size:.24rem">搜索标签:  </span>
      <Tag  v-if="tag.length>0" closable @on-close="handleClose">{{tag}}</Tag>
      <Tag  v-if="key.length>0" closable @on-close="handleClose">{{key}}</Tag>
    </div>
  </template>
  <div class="content">
    <!-- list -->
    <template v-if="articles.length>0">
    <div v-for="(item,index) in articles" :key="index" class="item">
      <p @click="jumpDetail(item.id)" class="title"><b>{{item.title}}</b></p>
      <p  class="desc">{{item.description}}</p>
      <p class="img"><img @click="jumpDetail(item.id)" class="item_img" :onerror="errorImg" :src="item.cover_url"></p>
      <p class="tags">
        <template>
					<Tag v-for="(vo,i) in item.tag" :key="i">{{vo}}</Tag>
				</template>
      </p>
    </div>
    </template>
    <template v-else>
      <div class="notlist">
        啊偶,没有要搜索的文章...
      </div>
    </template>
    <template>
            <BackTop :bottom="60"></BackTop>
    </template>
    <!-- end_list -->
  </div>
</div>
</template>

<script>
import IndexSearch from "@/pages/index/components/search.vue"
import IndexIcons  from "@/pages/index/components/icons.vue"
import CommonHead from 'common/head/head.vue'
import {getArticles} from "@/api/api.js"
export default {
  name:'article_list',
  data(){
    return {
      heads:{
        title:'文章列表',
        url:''
      },
      tag:"",//标签关键字
      key:"",//标题关键字
      articles:[],
      jumpType:'list',
      page:1,
      errorImg:"this.src='https://front.erciyuan.club/Focus/20161119/focus/20161119095008704cc9b40a55486bbbc94a3d57dded70.jpg'"
    }
  },
  components:{
    CommonHead,
    IndexIcons,
    IndexSearch
  },
  methods:{
    //获得最新文章
		getArticleList(){
      this.$Spin.show();
			getArticles(this.tag,this.key,this.page).then((res)=>{
        this.$Spin.hide();
				if (res.data) {
					let data = res.data;
          if(this.articles.length==0){
              this.articles = data.data;
          } else {
              this.articles.push.apply(this.articles,data.data);
          }
				}
      }).catch((err)=>{
        this.$Spin.hide();
      });
    },
    //跳转android详情
    jumpDetail(id){
      let url = '/art_det/'+id;
      $App.jumpArticleDetail(url);
    },
    //子组件传递搜索条件
    searchKey(key){
      this.key = key;
      this.getArticleList();
    },
    //清除搜索条件
    handleClose(){
      this.key = "";
      this.tag = "";
      this.getArticleList();
    },
    //重新获得列表页面
    jumpRouterArticleList(tag){
      this.tag = tag;
      this.getArticleList();
    }
  },
  mounted(){
    this.$route.params.tag&&this.$route.params.tag!='0' ? this.tag = this.$route.params.tag:"";
    this.$route.params.key&&this.$route.params.key!='0' ? this.key = this.$route.params.key:"";
    this.getArticleList()
  },
  created(){
      var _this = this;
      window.onscroll = function(){
     		//变量scrollTop是滚动条滚动时，距离顶部的距离
     		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
     		//变量windowHeight是可视区的高度
     		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
     		//变量scrollHeight是滚动条的总高度
     		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
          //滚动条到底部的条件
          if(scrollTop+windowHeight==scrollHeight){
               //写后台加载数据的函数
              _this.page++;
           	 _this.getArticleList();
          }   
       }
  }
}

</script>
<style lang='stylus' scoped>
  .body
    background-color :#f6f7f9
  .nav
    background-color :white
    margin-bottom:.24rem
  .search-tag
    background-color :white
    margin-bottom:.24rem
    padding:.24rem  
  .content
    width :100%
    height :100%
    .notlist
      padding:.24rem
      background-color :white
      text-align:center
    .item
      padding:.24rem
      background-color :white
      margin-bottom:.24rem
      .title
        font-size:.36rem
      .desc
        margin-top :.12rem
      .img
        margin-top :.12rem
      .tags
        margin-top :.12rem
      .item_img
        width :100%
        height :2.8rem
        object-fit: cover;
</style>