<!-- menu bar  -->
<template>
  <div class="menuBar">
      <div class="left">
          <ul v-if="catelog">
              <li v-for="(item,index) in catelog" :key="index" :class="{current:item.id==chapter_id}" @click="jumpTo(item.id)">{{item.name}}</li>
          </ul>
          <template v-else>
               <span>加载中...</span>
          </template>
      </div>
      <div @click="closeMenuBar" class="right"></div>
  </div>
</template>

<script>
export default {
  name:'MenuBar',
  data () {
    return {
        chapter_id:1
    };
  },
  props:['catelog'],
  methods:{
      //点击关闭章节目录 
      closeMenuBar:function(){
          this.$emit('closeMenuBar','this is memo')
      },
      //跳转到制定章节
      jumpTo(id){
          this.chapter_id = id
          this.$emit('jumpTo',id)
      }
  }
}

</script>
<style lang='stylus' scoped>
    .current
      color:red
    .menuBar
      width :100%
      height :100%
      display :flex;
      position:absolute
      z-index :102
      .left
        flex :1
        background-color :white
        overflow-x: hidden;
        overflow-y: scroll;
        .current
          color:red
      .left ul li
        padding-left 0.24rem
        height :1rem
        line-height :1rem
        font-size:.24rem
      .right
        flex:0 0 1.4rem
        background-color:gray;opacity:0.6;
</style>