<template>
    <div>
       <home-header></home-header>
       <home-swiper :list="swiperList"></home-swiper>
       <home-icons :list="iconList"></home-icons>
       <home-recommend :list="recommendList"></home-recommend>
       <home-weekend :list="weekendList"></home-weekend>
    </div>
</template>

<script>
import HomeHeader from './components/Header.vue'
import HomeSwiper from './components/Swiper.vue'
import HomeIcons from './components/icons.vue'
import HomeRecommend from './components/Recommend.vue'
import HomeWeekend from './components/Weekend.vue'
import axios from 'axios'
import { mapState } from 'vuex'
export default{
  name: 'Home',
  components: {
    HomeHeader: HomeHeader,
    HomeSwiper: HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  computed: {
    ...mapState(['city'])
  },
  data () {
    return {
      lastCity: '',
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: []
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('/api/index.json?city=' + this.city) // 请求具体哪个城市的信息
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      }
    }
  },
  mounted () {
    this.lastCity = this.city // 将修改后的数据进行保存
    this.getHomeInfo()
  },
  activated () {
    if (this.lastCity !== this.city) { //当这次的城市名和上次不同时，要重新加载对应数据
      this.lastCity = this.city //当这次的城市名和上次不同时，将原来的覆盖，用于后面在比较
      this.getHomeInfo() //重新发送ajax请求
    }
  }
}

</script>
<style>

</style>
