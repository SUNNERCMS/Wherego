<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe624;</div>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe632;</span>
      <input class="wenben" type="text" placeholder="输入城市/景点/游玩主题">
    </div>
    <router-link to='/city'>
      <div class="header-right">
        {{this.city}}
        <span class="iconfont arrow-icon">&#xe64a;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default{
  name: 'HomeHeader',
  props: {
    city: String
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .header
    display: flex
    line-height: .86rem
    background: $bgColor
    color: #fff
    .header-left
      width: .64rem
      float: left
      .back-icon
          text-align center //不带冒号的写法同样支持
          font-size: .4rem
    .header-input
      flex 1
      height .64rem
      line-height .64rem
      padding-left .2rem
      margin-top .12rem
      margin-left .2rem
      background #fff
      border-radius .12rem
      color #ccc
      .wenben
          display inline-block
          margin-top -.11rem
          width: 4.8rem
    .header-right
      width: 1.24rem
      float: right
      text-align: center
      color: #fff
      .arrow-icon
        margin-left: -.04rem //2px的左移
        font-size .2rem
</style>
