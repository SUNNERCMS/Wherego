<template>
  <div>
    <router-link tag="div" to="/" class="header-abs" v-show="showAbs">
      <div class="iconfont header-abs-back">&#xe624;</div>
    </router-link>
    <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
      <router-link to="/">
        <div class="iconfont header-fixed-back">&#xe624;</div>
      </router-link>
      景点详情
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data () {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handleScroll () { // 滚动超过规定区域呈现渐隐渐现的效果
      const top = document.documentElement.scrollTop // 获取该元素垂直滚动的像素数
      if (top > 60) {
        let opacity = top / 140 // 结果是小数形式，当top超过140，opacity就超过1了
        opacity = opacity > 1 ? 1 : opacity // 对opacity的最大值做了限定
        this.opacityStyle = { opacity } // 将计算出来的opacity的值进行更新动态显示
        this.showAbs = false // 当向下滚动超过60px时，header-fixed块才显示出来
      } else {
        this.showAbs = true // top的值小于60px，圆显示，块隐藏
      }
    }
  },
  activated () { // keep-alive带来的钩子函数，只要一被展示，这个函数就会执行。
    window.addEventListener('scroll', this.handleScroll)
  },
  deactivated () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .header-abs
    position: absolute
    left: .2rem
    top: .2rem
    width: .8rem
    height: .8rem
    line-height: .8rem
    border-radius: .4rem
    text-align: center
    background: rgba(0, 0, 0, .6)
    .header-abs-back
      color: #fff
      font-size: .4rem
  .header-fixed
    position: fixed
    top: 0
    left: 0
    right: 0
    height: $headerHeight
    line-height: $headerHeight
    text-align: center
    color: #fff
    background: $bgColor
    font-size: .32rem
    .header-fixed-back
      position: absolute
      top: 0
      left: 0
      width: .64rem
      text-align: center
      font-size: .4rem
      color: #fff
</style>
