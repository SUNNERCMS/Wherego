<template>
  <!-- 这个DIV标签是为了给图片一个区域，避免页面抖动 -->
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="item of list" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl" />
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper', // 单页面组件名字
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      }
    }
  },
  computed: {
    showSwiper () {
      return this.list.length
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet-active
    background: #fff
  .wrapper
    overflow: hidden
    width: 100%
    padding-bottom: 31.25%
    height: 0
    background: #eee
    .swiper-img
      width: 100%
</style>
<!-- 1-图片的宽高为640px,200px,宽高比例是31.25%
  是为了进行宽高比例自适应
    width: 100%
    padding-bottom: 31.25%
  2-
  scoped：表示当前的样式仅仅对HomeSwiper这个单页组件有效，而轮播图里面的分页，
  确实在swipe这样的一个子组件中，即便在style中设置了样式也不奏效，只有进行样式的穿透。
  样式穿透：
  .wrapper >>> .swiper-pagination-bullet-active
    background: #fff
-->
