<!-- 书籍详情  -->
<template>
<div>
  <!-- head -->
  <common-head :title="heads.title" :url="heads.url"></common-head>
  <!-- end head -->

  <div class="content">
  <!-- 小说信息 -->
  <div class="info">
    <div class="cover_info">
      <div class="cover"><img :src="handle_cover_url(book.cover)"></div>
      <div class="book_info">
        <p class="title">{{book.title}}</p>
        <p><span style="color:red">{{book.author}}</span> | <span class="gray">{{book.cat}}</span></p>
        <p class="gray">{{book.wordCount}}字</p>
      </div>
    </div>
    <div class="tag">
      <div class="tag_one">
         <Rate disabled show-text allow-half v-model="floorScore" >
                <span  style="color: #f5a623;"></span>
          </Rate>
        {{book.rating.score}}分 ({{book.rating.count}}人评)
      </div>
      <div class="tag_two">
        <span style="display:block;height:19px;"><b>{{book.retentionRatio}}%</b></span>
        留存</div>
      <div class="tag_three">
        <span style="display:block;height:19px"><b>{{ceilLatelyFollower}}</b></span>
        人气</div>
    </div>
    <div class="desc">
      <p class="desc_top"><b>简介</b>:</p>
      <p class="desc_tag">
        <Tag v-if="book.majorCate">{{book.majorCate}}</Tag>
        <Tag v-if="book.minorCate">{{book.minorCate}}</Tag>
      </p>
      <p class="desc_info">
        {{book.longIntro}}
      </p>
    </div>
    <div class="chapter">
      <span class="chapter_left">目录</span>
      <span class="chapter_right"><span style="color:red"></span> {{book.lastChapter}}</span>
    </div>
  </div>
  <!-- end小说信息 -->

  <!-- 评论信息 -->
  <div class="comment">
    <p class="comment-title"><b>热门短评</b></p>
    <div class="comment-list">

      <template v-if="!spinShow">
      <div v-for="(item,index) in comments" v-bind:key="index" class="item">
        <div v-show="false" class="title">
          {{item.title}}
        </div>
        <div class="author">
          {{item.author.nickname}}
        </div>
        <div class="comment-tag">
          <Rate disabled show-text allow-half v-model="item.rating" >
                <span  style="color: #f5a623;"></span>
          </Rate> 
          <span v-show="item.rating==5">必看神作</span>
        </div>
        <p class="comment-desc">{{item.content}}</p>
      </div>
      </template>
      <template v-else>
         <Spin>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载评论中</div>
          </Spin>
      </template>

    </div>
  </div>
  <!-- end评论信息 -->
  </div>

  <!-- footer -->
  <div class="footer">
    <div v-on:click="addBookShelf" class="footer_left">
      <span class="iconfont footer-icon">&#xe650;</span>加入书架
    </div>
    
    <div class="footer_center">
      <router-link to="/ebook">
      <span>开始阅读</span>
      </router-link>
    </div>
    
    
    <div class="footer_right">
      <span class="iconfont footer-icon">&#xe60e;</span>全本缓存
    </div>
  </div>
  <!-- endfooter -->
</div>
</template>
<script>
import CommonHead from 'common/head/head.vue'
import {getZhuiShuBookDetail,getZhuishuStaticPic,getZhuiShuBookComment} from "@/api/api.js"
export default {
  name:'book_detail',
  data () {
    return {
      heads:{
        title:'小说详情',
        url:'http://www.baidu.com'
      },
      book:{
        grade:4
      },
      book:[],//图书信息
      comments:[],//图书评论信息
      spinShow: true, //评论加载
    };
  },
  methods:{
    addBookShelf(){
      //先跳转我的书架
      this.$router.push({path:"/bookshelf"});
    },
    //获得文章详情
    getBookDetail(id){
      this.$Spin.show();
      getZhuiShuBookDetail(id).then(res=>{
        this.$Spin.hide();
        if(res.status==200){
          this.book = res.data
        }
      }).catch((res)=>{
        this.$Spin.hide();
      });
    },
    //获得图书评论
    getBookComment(id){
      getZhuiShuBookComment(id,10).then(res=>{
        this.spinShow = false
        if(res.status==200){
          this.comments = res.data.reviews
        }
      }).catch((err)=>{
        this.spinShow = false
      });
    },
    handle_cover_url(url){
        return getZhuishuStaticPic(url);
    },
  },
  components:{
    CommonHead
  },
  mounted:function(){
    this.getBookDetail(this.$route.params.id);
    this.getBookComment(this.$route.params.id);
  },
  //计算属性 
  computed:{
    //对分数进行取整获得星星
    floorScore(){
      return Math.floor(this.book.rating.score/2)
    },
    //对图书人气进行计算 小于1w直接返回
    ceilLatelyFollower(){
      if(this.book.latelyFollower<10000){
        return this.book.latelyFollower;
      } else {
        let lately2 = (this.book.latelyFollower/10000).toFixed(3);//对小数点后3位四舍五入
        return lately2.substring(0,lately2.lastIndexOf('.')+3)+"w";
      }
    },
    //对图书字数进行计算  小于100w直接返回
  }
}

</script>
<style lang='stylus' scoped>
  a
    text-decoration: none;
  .ivu-rate
    font-size:12px
  .content
    width:100%
    height :100%
    background-color:#f6f7f9
    overflow-x: hidden;
    padding-bottom:1.5rem
  .info,.comment
    padding:.12rem .24rem .12rem .24rem
    background-color :white
  .info
    width :100%
    display :flex
    flex-direction :column 
    .cover_info
      width:100%
      display :flex
      flex-direction :row
      .book_info
        padding:.24rem
        width :70%
        flex-direction :row
        .title
          font-size:.28rem
        .gray
          color:#c0c0c0
      .book_info p
        display :block
        margin-bottom .12rem
      .cover
        padding:.24rem
        width: 30%;
        height: 2.44rem
      .cover img
        width: 100%;
        height: 2rem
        object-fit:cover
    .tag
      padding-top :.12rem
      padding-bottom:.12ren
      height :100%
      text-align :center
      width :100%
      display :flex
      flex-direction :row
      .tag_one
        flex:1
      .tag_two
        flex:1
      .tag_three
        flex:1  
    .desc
      margin-top :.36rem
      .desc_top
        font-size:.28rem
      .desc_tag
        margin-top :.12rem
      .desc_info
        margin-top:.12rem  
    .chapter
      margin-top:.24rem
      display :flex
      flex-direction:row
      .chapter_left
        flex:0 0 1rem
      .chapter_right
        flex:1
        text-align :right
        color:#c0c0c0
  .comment
    margin-top:.12rem
    width:100%
    display:flex
    flex-direction:column
    .comment-title
      height :.44rem
      line-height :.44rem
      font-size:.28rem
    .comment-list
      margin-top:.24rem
      .item
        margin-bottom :.12rem
        border-bottom:1px solid #e9e9e9
        padding-top:.12rem
        padding-bottom:.12rem
        .comment-tag
          margin-top:.12rem
        .comment-desc
          margin-top:.12rem
        .comment-time
          margin-top:.12rem
  .footer
    height 1.5rem
    display :flex
    flex-direction :row
    position:fixed
    background-color :white
    left:0
    right:0
    bottom:0
    width:100%
    text-align:center
    .footer_left
      z-index:100
      flex :1
      border-top 1px solid #e9e9e9
      line-height :1.5rem
      color:red
      font-size:.32rem
    .footer_center
      flex :1
      background-color :red
      border-top:1px solid red
      line-height :1.5rem
      color:white !important;
      font-size:.32rem
    .footer_center span
      color:#fff
    .footer_right
      border-top 1px solid #e9e9e9
      flex :1
      line-height :1.5rem
      color:red
      font-size:.32rem
    .footer-icon
      margin-right:.12rem
      font-size:.36rem
        
</style>