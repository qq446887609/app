<template>
  <div class="ebook">

      <!-- menubar -->
      <menu-bar v-bind:catelog="catelog" v-show="show_menu_bar" v-on:closeMenuBar="setMenuBar" v-on:jumpTo="jumpTo"></menu-bar>
      <!-- end menubar -->

      <!-- head -->
        <div v-show="is_show" class="head">
            <span v-on:click="back" class="iconfont call_icon">&#xe8b5;</span>
            <span class="title_t"><b>{{book_name}}</b></span>
        </div>
      <!-- end head -->

      <!-- read body -->
      <div class="readBody">
        <div class="title">{{chapter_name}}</div>
        <div class="area" id='area' v-html="content"></div>
      </div>
      <!-- end read body -->
      
      <!-- page -->
      <div class="mask">
          <div @click="pagePrev" class="left"></div>
          <div @click="showMenu" class="center"></div>
          <div @click="pageNext" class="right"></div>
      </div>
      <!-- end page -->

      <!-- footer -->
      <div v-show="is_show" class="footer">
            <span @click="setSettings(1)" class="iconfont call_icon">&#xe605;</span>
            <span class="iconfont call_icon">&#xe634;</span>
            <span class="iconfont call_icon">&#xe672;</span>
            <span class="iconfont call_icon">&#xe618;</span>
      </div>
      <!-- end footer -->
  </div>
</template>

<script>
import {getBookCateLogList,getBookChapterInfo} from '@/api/api.js'
import MenuBar from '@/pages/book/components/menu_bar.vue'
import Epub from 'epubjs'
const DOWNLOAD_URL = '/static/efb74三体球状闪电.epub'
export default {
  name:'ebook',
  components:{
    MenuBar
  },
  data () {
    return {
      book:'',
      rendition:'',
      is_show:false,
      navigation:'',
      show_menu_bar:false,
      catelog:[],//章节列表
      book_id:'115088',//当前小说id
      book_name:'',//小说名称
      content:'',//文章内容
      conent_obj:'',//包含文章内容div
      allpages:0,//文章内容js分页
      current_page:1,//开始页码
      chapter_name:'',//章节名称
    };
  },
  methods: {
      //电子书的解析和渲染
      showEpub(){
          //生成book
          this.book = new Epub(DOWNLOAD_URL)
          //生成Rendition 通过Book renderTo
          this.rendition = this.book.renderTo('area',{
              width:window.innerWidth,//图书宽度占视窗宽度
              height:window.innerHeight//图书高度占视窗高度
          });
          //通过Rendition.display渲染电子书
          this.rendition.display()
          //使用钩子函数 获得图书目录 navigation对象  
          this.book.ready.then(()=>{
            this.navigation = this.book.navigation
          })
      },
      //上一页
      pagePrev(){
        if(this.current_page==1)
        {
            console.log('返回上一章');
        }
        else
        {
            this.showpart(this.current_page-1)
        }
      },
      //下一页
      pageNext(){
        if(this.current_page==this.allpages)
        {
          console.log('进入下一章');
        }
        else
        {
          this.showpart(this.current_page+1)
        }
      },
      //显示菜单
      showMenu(){
        if(this.is_show!=false)
        {
          this.is_show = false
        }
        else
        {
          this.is_show = true
        }
      },
      //根据链接 目录跳转
      //关闭目录菜单
      setMenuBar(){
        this.show_menu_bar = !this.show_menu_bar
        if(this.show_menu_bar==true)
        {
          this.bookCateLogList()
        }
      },
      //设置操作
      setSettings(mark){
        switch(mark)
        {
          case 1://目录
            this.setMenuBar()
            break
          case 2:
            break
        }
      },
      //获得书目录
      bookCateLogList(init=false){
        let _this = this;
        getBookCateLogList(this.book_id).then(function(res){
          let data = res.data
          let reg=/,]/g
          data = data.replace(reg,']')
          data = JSON.parse(data)
          if(data.status==1)
          {
            _this.catelog= data.data.list[0].list
            if(init==true)//如果为初始化,同时获得第一章内容 获得书籍名称
            {
              _this.book_name = data.data.name
              _this.getBookChapterInfo(_this.catelog[0].id)
            }
          }
        });
      },
      jumpTo(chapter_id){
        this.getBookChapterInfo(chapter_id)
        this.setMenuBar()
        this.showMenu()
      },
      //跳转到制定目录
      getBookChapterInfo(chapter_id){
        getBookChapterInfo(this.book_id,chapter_id).then((res)=>{
          let data = res.data
          if(data.status==1)
          {
            this.chapter_name = data.data.cname
            let content = data.data.content
            content=content.replace(/\n/g,"<br/>")
            this.content = content

            console.log("屏幕高"+window.screen.height);
            let obj = document.getElementById('area');
            console.log("文章高度"+obj.offsetHeight);
          }
        });
      },
      //内容分页
      showpart(x){
        this.conent_obj.scrollTop=(x-1)*parseInt(this.conent_obj.offsetHeight);
      },
      //返回上一页
      back(){
          this.$router.go(-1);
      }
  },
  mounted:function(){
    //this.showEpub()
    this.bookCateLogList(true);
  },
}
</script>

<style lang='stylus' scoped>
@import '~styles/gloabl.styl'
@import '~styles/strhid.styl'
  .ebook
    position:relative
    background-image :url('../../assets/img/sheep_skin.jpg');
    .readBody
      height :100%
      width :100%
      padding:.36rem
      display :flex
      flex-direction :column
      .title
        height .60rem
        font-size:.24rem
      .area
        font-size:16px
        line-height:24px
        width :100%
        overflow-x :hidden
        overflow-y :hidden
    .mask
      position :absolute
      top:0
      left:0
      z-index:100
      display :flex
      width :100%
      height :100%
      .left
        flex:0 0 2rem
      .center
        flex :1
      .right
        flex:0 0 2rem
    .head
      background-color :black
      color:white
      position :absolute
      z-index :101
      width: 100%
      height: .88rem
      line-height: .88rem
      flex-direction: row
      padding-left: .24rem
      .call_icon
        width: .48rem
        height: .48rem
      .title_t
        margin-left: .12rem
        font-size: .32rem
    .footer
      background-color :black
      color:white
      position :absolute
      z-index :101
      bottom :0
      width :100%
      height: 1.28rem
      line-height: 1.28rem
      flex-direction: row
      display :flex
      text-align :center
      .call_icon
        font-size:.48rem
        flex :1
</style>