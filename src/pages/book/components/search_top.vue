<!-- search top  -->
<template>
  <div>
        <!-- head -->
        <div class="head">
            <span class="iconfont call_icon">&#xe8b5;</span>
            <template>
                <Dropdown class="mleft" trigger="click">
                    <a href="javascript:void(0)">
                        笔趣阁
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>追书神器</DropdownItem>
                        <DropdownItem>宜搜</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </template>
            <template>
                <Input class="mleft" placeholder="搜索书名或作者" style="width: auto">
                        <Icon type="ios-search" slot="suffix" />
                </Input>
                <span class="mleft">搜索</span>
            </template>
        </div>
        <!-- end head -->
  </div>
</template>

<script>
export default {
  name:'SearchTop',
  data () {
    return {
    };
  },
  methods: {}
}

</script>
<style lang='stylus' scoped>
@import '~styles/gloabl.styl'
@import '~styles/strhid.styl'
    a
      color:white
    .head
        background-color :black
        color:white
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
        .mleft
            margin-left .2rem
</style>