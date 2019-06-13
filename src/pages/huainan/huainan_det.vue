<template>
	<div>
    <common-head :title="heads.title" :url="heads.url"></common-head>
		<div class="content">
			<p class="title" v-if="article"><b>{{article.shareTitle}}</b></p>
      <p  class="art-user">
         <img :src="article.thread.icon">
          {{article.thread.author}}
      </p>
			<p v-if="article" class="tags">
				<template>
				 <Tag>{{article.thread.hits}}阅读</Tag><Tag>{{article.thread.replies}}评论</Tag>
         <Tag>{{article.thread.postdate}}</Tag>
				</template>
			</p>
			<div v-if="article" class="info" v-html="article.thread.content"></div>
      <!-- 评论信息 -->
        <div class="comment">
          <p class="comment-title"><b>评论</b></p>
          <div v-if="article.replies" class="comment-list">
            <div v-for="(item,index) in article.replies" :key="index" class="item">
              <div class="author">
                <div class="user-ifno">
                  <img :src="item.icon">
                  {{item.author}}
                </div>
                <div class="ctime">
                 {{item.postdatee}}
                </div>
              </div>
              <p class="comment-desc" v-html="item.content"></p>
            </div>

          </div>
        </div>
      <!-- end评论 -->
		</div>
      <template>
          <BackTop :bottom="60"></BackTop>
      </template>
	</div>
</template>


<script>
import {getHuaiNanDet} from "@/api/api.js"
import CommonHead from 'common/head/head.vue'
export default {
	name: 'detail',
	components:{
        CommonHead
  },
	data () {
		return {
      article:null,
      heads:{
          title:'聚焦淮南',
          url:"http://"
      }
		}
	},
	methods:{
		//获得文章详情  todo 下拉刷新评论
		getHuaiNanDet(id){
      this.$Spin.show();
			getHuaiNanDet(id).then((res)=>{
        this.$Spin.hide();
				if (res.data) {
          this.article = res.data.data;
				}
			}).catch((res)=>{
        this.$Spin.hide();
      });
		}
	},
	mounted(){
		this.getHuaiNanDet(this.$route.params.id);
	}
}
</script>

<style scoped>
	.content{
    display: column;
    margin-top:.24rem;
	  width:100%;
	  height:100%;
	  padding-left:.36rem;
	  padding-right:.36rem;
  }
  .title{
    font-size:.36rem
  }
  .art-user{
    margin-top: .24rem;
    width:100%;
  }
  .art-user img{
    width: .68rem;
    height: .68rem;
    border-radius: 50%
  }
  .tags{
    margin-top:.12rem;
  }
  .info{
    width: 100%;
    height: 100%;
    margin-top: .36rem;
    border-bottom: 1px solid #e9e9e9;
  }
  .info >>> img {
    width:100%;
    position:static !important;
  }
  .info >>> video{
    width: 100%;
  }
  .comment{
    margin-top:.24rem;
    width:100%;
    height: 100%;
    display:flex;
    flex-direction:column;
  }
  .comment-title{
    height:.44rem;
    line-height:.44rem;
    font-size:.28rem;
  }
  .comment-list{
    margin-top:.24rem;
  }
  .item{
    margin-bottom :.12rem;
    border-bottom:1px solid #e9e9e9;
    padding-top:.12rem;
    padding-bottom:.12rem;
  }
  .author{
    width: 100%;
    display: flex;
  }
  .author img{
    width: .56rem;
    height: .56rem;
    border-radius: 50%;
  }
  .user-ifno{
    flex: 1;
    flex-direction: row
  }
  .ctime{
    flex: 1;
    flex-direction: row;
    text-align: right;
  }
  .comment-tag{
    margin-top:.12rem
  }
  .comment-desc{
    margin-top:.12rem
  }
  .comment-time{
    margin-top:.12rem
  }
	    
</style>