<!-- search -->
<template>
  <div>
      <search-top></search-top>
      <div class="content">
        <!-- list -->
            <div v-if="search_list.length>=1" class="item">
                <div class="item-cover">
                    <img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3161909413,2107851298&fm=58&bpow=1000&bpoh=1400">
                </div>
                <div class="item-info">
                    <p class="title"><b>回到过去变成猫</b></p>
                    <p class="update-info">都市言情|适可而止c</p>
                    <div class="up_tag"><Tag color="red">+追更</Tag></div>
                    <p class="update-time">有倒霉不断的巴啦啦啦阿拉啦啊啦啦啦啦啊啦啦阿拉啦啦阿拉啦啦阿拉啦啦阿拉啦啦阿拉啦啦阿拉啦啦阿拉啦啦阿拉</p>
                </div>
            </div>
            <div class="empty_info" v-else>暂无内容</div>
        <!-- end list -->
        </div>
  </div>
</template>

<script>
import SearchTop from '@/pages/book/components/search_top.vue'
export default {
  name:'book_search',
  data () {
    return {
        search_list:[1,2,3]
    };
  },
  components:{
      SearchTop
  }
}

</script>
<style lang="stylus" scoped>
    .content
      padding-left:.24rem
      padding-right: .24rem
      margin-top .24rem
      .item
        width :100%
        height :2rem
        padding-top:.06rem
        padding bottom 0.06rem
        margin-bottom :.12rem
        .item-cover
          width :20%
          height:1.75rem
          float :left
        .item-cover img
          width :100%
          height:1.75rem
        .item-info
          padding-left:.24rem
          width:75%
          height:1.75rem
          float: left
          flex-direction:column
          .title
            font-size:.28rem
          .update-info
            margin-top :.16rem
            color :#c0c0c0
          .up_tag
            position:relative
            float:right
            left :.12rem
          .update-time
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin-top :.16rem
            color :#c0c0c0
            .up_icon
              font-size:.24rem
      .empty_info
        text-align:center;
</style>