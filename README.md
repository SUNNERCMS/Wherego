# wherego
导航目录：  
现阶段完成效果展示如下(其余模块和功能展示陆续上传......)   
![](https://github.com/SUNNERCMS/Wherego/blob/master/src/sucai/xiaoguo.gif)   

![](https://github.com/SUNNERCMS/Wherego/blob/master/src/sucai/GIF.gif)    
## 旅游网站首页开发 
### 1.header区域  
### 问题及解决部分
- 问题一：  
移动端1像素边框的解决方案  
解决：采用了border.css,在项目中的路径./src/assets/styles/border.css
- 问题二：  
300ms点击延时的问题：在一些移动终端中，click点击事件会有300ms的点击延时  
解决：1.在当前项目的目录下，通过gitbash安装了fastclick第三方的依赖库，操作指令为 npm install fastclick --save  
2.再入口文件中引入 `import fastClick from 'fastclick'`应用在文档体中：`fastClick.attach(document.body)`
### 2.首页轮播图  
（1）图片的宽高为640px,200px,宽高比例是31.25%
  是为了进行宽高比例自适应
`width: 100%
padding-bottom: 31.25%`   
（2）scoped：表示当前的样式仅仅对HomeSwiper这个单页组件有效，而轮播图里面的分页，
  却是在swipe这样的一个子组件中，即便在style中设置了样式也不奏效，只有进行样式的穿透。  
  样式穿透：
`  .wrapper >>> .swiper-pagination-bullet-active
    background: #fff`  
### 3.图标区域  
  实现效果：在图标区显示8个导引小图标，超过8个时增加第二页可以进行分页轮播查看。  
  逻辑实现：借助`swiper`来完成轮播动画，不过要通过`computed`计算属性来完成分页的计算，运用了一维数组转化为二维数组的方法，`pages[0]`中最多是8个图标,多余的放到`pages[1]`中，在`swiper-slide`中就是展示的下一页内容。
  主要代码段：   
  template部分：
````js
<div class="icons"> //整个图标区域的容器
  <swiper>   //轮播容器
    <swiper-slide v-for="(page, index) of pages" :key="index">  //轮播滚动项容器， 遍历index页并将每一页的全部图标在下面进行遍历显示
      <div class="icon" v-for="item of page" :key="item.id">  //每一个图标块中包含一个图片块+文字块  遍历每一页的小图标块
        <div class='icon-img'>
          <img class='icon-img-content' :src='item.imgUrl' />
        </div>
        <p class="icon-desc">{{item.desc}}</p>
      </div>
    </swiper-slide>  //轮播滚动项容器
  </swiper>
</div>
```` 
  计算属性部分：
````js
computed: {
pages () {
  const pages = []
  this.iconList.forEach((item, index) => {
    const page = Math.floor(index / 8)  //遍历iconList数据中每一项，并进行分页
    if (!pages[page]) {  
      pages[page] = []
    }
    pages[page].push(item)
  })
  return pages     //此时返回的pages是一个二维数组形式的数据，代表有多页。
}
}
````
### 遇到的问题及解决办法
- 问题1：图标区域仅仅只有上面的一行支持图标拖动，下面一行不支持  

问题分析：因为`swiper-container`的高度只有图标的高度，不是整个图标区的高度  
问题解决：  
````css
  .icons >>> .swiper-container  //样式穿透，让swiper-container包含整个图标区域的高度
    height: 0
    padding-bottom: 50%  //宽高比
````  
- 问题2：每个小图标下面的介绍文字过长时，要求用省略号...表示  
问题分析：由于每页都有8个小图标，所以可以使用stylus样式预处理机制，在mixins.styl文件中封装一个ellipsis（）方法，应用在文字表述的类里面  
问题解决：  
mixins.styl文件
 ````css
 ellipsis()
  overflow: hidden  //超过规定区域隐藏元素
  white-space: nowrap  //超过的空白区不换行
  text-overflow: ellipsis  //文本超过后用省略号表示
````
style样式部分
````css
    .icon-desc
      position: absolute
      left: 0
      right: 0
      bottom: 0
      height: .44rem
      line-height: .44rem
      text-align: center
      color: $darkTextColor
      ellipsis()   //引用位置
````
- 问题3：当城市选择名过长时，会撑破右侧的容器  
问题分析： 右侧的宽度设置死了为width: 1.24rem
问题解决：采用最小宽度进行设置。
````css
  .header-right
      min-width: 1.04rem
      padding: 0 .1rem
      float: right
````  
### 4.热销推荐组件开发  
实现效果：分栏展示，每栏左侧是介绍图片，右侧是介绍信息以及查看详情的点击按钮。  
知识点：  
（1）text-indent 属性规定文本块中首行文本的缩进。注释：允许使用负值。如果使用负值，那么首行会被缩进到左边。  
### 遇到的问题及解决办法
- 问题1：给右侧的标题和其下面的详细介绍信息加上ellipsis（）方法后，并没有出现页面的效果，文字会显示到区域的最右边。  
问题分析：其自身或者其父元素没有设置最小宽度，或者没有设置超过区域的文本的显示方式。  
问题解决： 
````css
    .item-info
      flex: 1
      padding: .1rem
      min-width: 0  //解决没有显示省略号的问题或者使用 overflow: hidden
      .item-title   
        line-height: .54rem
        font-size: .32rem
        ellipsis()    //右侧中介绍信息的标题，若标题过长则显示省略号
      .item-desc
        line-height: .4rem
        color: #ccc
        ellipsis()   //右侧中下面的详细描述信息，若过长则显示省略号
````
### 5.周末游组件开发  
实现效果：纵向分栏展示，分为两部分，上面是图片，下面是信息。  
实现逻辑：与热销推荐组件开发类似，将样式稍作改变即可。

### 6.使用axios发送ajax请求  
知识点1：项目列表中的static文件夹中的内容可以由外部地址访问到。  
由于是用来放本地的模拟数据，所以不需要打包上传，可以在gitignore文件中进行配置,配置后不会被提交到线上的git仓库中，也不会被提交到本地仓库中。
````
.DS_Store
node_modules/
/dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
static/mock
````   
知识点2：用axios进行ajax请求的过程。  
主要代码片段：  
````js
  mounted () {          //mounted()钩子函数：在页面挂载结束后被触发，在这个时候把ajax返回的数据获取过来。
    this.getHomeInfo() //获取响应数据，然后应用到各个分页组件中。
  },
  methods: {
    getHomeInfo () {
      axios.get('/api/index.json')   //ajax的访问地址
        .then(this.getHomeInfoSucc)  //成功回调函数
    },
    getHomeInfoSucc (res) {          //成功回调时，将数据打印出来
      console.log(res)
    }
  }
````
### 遇到的问题及解决办法
- 问题1：需要将axios中将来用于上线访问资源的地址修改到访问本地
问题解决：通过webpack-dev-server中的proxyTable进行代理转换  
````
    proxyTable: {
        '/api': {  //当匹配到/api文件路径开头时，做以下操作
            target: 'http://localhost:8080',  //这是要替换的URL地址
            pathRewrite: {
                '/api': '/static/mock'   //具体的替换路径，后面的替换前面的
            }
        }
    },
````
### 7.首页父子组件的传值
实现效果：用后台返回的数据，通过插值表达式和v-for遍历循环，将首页开发的界面进行实时替换更新  
逻辑实现：1、从响应中获取轮播数据赋值给data （）中的swiperList--》2、通过属性传值，这里将获取的轮播数据赋值给list属性--》3、子组件通过list用来接收轮播数据--》//4、用得到的list数据进行遍历
### 遇到的问题及解决办法  
- 问题1：通过ajax获取到的返回的数据，从中取得首页焦点轮播图的数据，图片显示正常，不过图片不是从第一张开始轮播的，而是从最后一张。  
问题解决：这个问题正是由于在没有真正返回数据时，list由父组件传过来的空数组进行了数据渲染，在`<swiper>`标签中加入条件判断，判断依据就是轮播数据是不是为空。让其用真正返回的数据进行加载，而不是空数组，可以解决这个问题。
````js
//首页home.vue代码
<home-swiper :list="swiperList"></home-swiper>        //2、通过属性传值，这里将获取的轮播数据赋值给list属性

  data () {
    return {
      city: '',
      swiperList: []
    }
  },
  
  getHomeInfoSucc (res) {
    res = res.data
    if (res.ret && res.data) {
      const data = res.data
      this.city = data.city
      this.swiperList = data.swiperList       //1、从响应中获取轮播数据赋值给data （）中的swiperList
    }
}
  //swiper.vue中代码
  <swiper :options="swiperOption" v-if="showSwiper"> //二、若list为空，说明没有从父组件获得数据，此时为false不进行节点渲染，不展示轮播
    <swiper-slide v-for="item of list" :key="item.id">  //4、用得到的list数据进行遍历
    props: {       
      list: Array    //3、子组件通过list用来接收轮播数据
    },
  
    computed: { 
      showSwiper () {   //一、计算属性，定义了一个showSwiper函数，用来计算list数据是不是为空
        return this.list.length
      }
  }
  
````
- 问题2：图标区域的最终效果应该是，超过8个图标时，可以手动滑到下一页，结果这里自动轮播了，效果和轮播区域一样了。
问题解决：给 `<swiper>` 中增加一个停止轮播的属性
````js
<swiper :options="swiperOption">  //将返回的swiperOption赋值给option属性进行轮播停止
    
  data () {
    return {
      swiperOption: {
        autoplay: false   //通过将autoplay设置为false，可以停止轮播
      }
    }
  },
````
## 城市列表页开发 
### 1、路由配置  
实现效果：点击首页头部的城市选项，进入到城市列表页，点击城市列表页左侧的返回箭头，跳转到首页。  
实现逻辑：路由配置。  
[参考文档](https://www.cnblogs.com/SamWeb/p/6610733.html)
> `<router-link> `就是定义页面中点击的部分,<router-link> 还有一个非常重要的属性 to，定义点击之后，要到哪里去， 如：
```js
    <router-link to='/city'>      //点击后跳转的地方，会和routers的路由进行匹配，进行相关组件的跳转。
      <div class="header-right">    //这里的div标签是点击对象，是一个区域。
        {{this.city}}
        <span class="iconfont arrow-icon">&#xe64a;</span>
      </div>
    </router-link>
```
> router 是一个机制，相当于一个管理者，它来管理路由。因为routes 只是定义了一组路由，它放在哪里是静止的，当真正来了请求，怎么办？ 就是当用户点击 <router-link>的时候，怎么办？这时router这个管理员就起作用了，它到routes 中去查找，去找到对应的内容，并进行显示，也就是说从route-link跳转到相关组件，是有router这个管理员完成的。  
注意：*to的属性值也就是跳转路径，必须和routes中的path值一样，因为只有这样才能保证匹配成功，完成跳转*
```js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import City from '@/pages/city/City'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',    
      component: Home  //要使用这个组件，那么就需要先把它通过inport引入进来。
    },
    {
      path: '/city',
      name: 'City',
      component: City
    }
  ]
})
```
> 　配置完成后，把router 实例注入到 main.js文件vue 根实例中,就可以使用路由了。  
```js  
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```
### 遇到的问题及解决办法  
- 问题1：当首次进入页面的时候，页面中并没有显示任何内容。  
问题分析：这是因为首次进入页面时，它的路径是 '/'，我们并没有给这个路径做相应的配置。一般，页面一加载进来都会显示home页面，我们也要把这个路径指向home组件。但是如果我们写{ path: '/', component: Home },vue 会报错，因为两条路径却指向同一个方向.  
问题解决：要重定向，所谓重定向，就是重新给它指定一个方向，它本来是访问 / 路径，我们重新指向‘/home’, 它就相当于访问 '/home', 相应地, home组件就会显示到页面上。vueRouter中用 redirect 来定义重定向。
```js
    // 重定向
    {
      path: '/',
      redirect: '/home'
    }
```
### 2、搜索框布局  
> 主要注意的布局细节点：  
在输入框中输入文字时，当文字过长时，可能会紧贴输入框的左右边框，此时要使用padding留白，并且这个留白不能使现有的输入框长度边长，否则会撑破父容器。*也即是说：只能向里要空间，不能向外要空间，使用怪异盒模型。*
- 主要代码段
```CSS
  .search
    height: .72rem
    padding: 0 .1rem
    background: $bgColor
    .search-input
      box-sizing: border-box  //使用怪异盒模型。
      width: 100%            //这里的宽度100% = 父元素的宽度-父元素设置的左右.1rem（5px）的padding
      height: .62rem
      padding: 0 .1rem     //文本允许书写的宽度=（ 父元素的宽度-父元素设置的左右.1的padding）- 这里向内部索要的左右.1rem 的宽度
      line-height: .62rem
      text-align: center
      border-radius: .06rem
      color: #666
```
### 3、列表布局、BetterScroll的使用和字母表布局
实现效果：通过better-scroll和$refs引用元素节点实现城市列表滚动效果，另外要在列表页的最右侧加上字母表索引目录。  
- 知识点1：用伪元素实现分割线
主要代码片段：  
```css
  .border-topbottom
    &:before
      border-color: #ccc
    &:after
      border-color: #ccc
  .border-bottom
    &:before
      border-color: #ccc
```
- 知识点2：ref 被用来给元素或子组件注册引用信息。期望类型：string [参考文档](https://www.w3cplus.com/vue/accessing-dom-refs.html)  
（1）引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素; 如果用在子组件上，引用就指向组件实例；  
当 v-for 用于元素或组件的时候，引用信息将是包含 DOM 节点或组件实例的数组。  
（2）关于ref注册时间的重要说明: 因为ref本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！$refs 也不是响应式的，因此你不应该试图用它在模板中做数据绑定。  
（3）ref属性不是一个标准的HTML属性，只是Vue中的一个属性。实际上，它甚至不会是DOM的一部分，所以在浏览器中你查看渲染的HTML，你是看不到有关于ref的任何东西。因为在它前面没有添加:，而且它也不是一个指令。  
（4）我们也可以通过使用查询选择器来访问DOM元素来实现这样的效果，但是使用ref属性更简洁，而且这也是Vue中的方法。它也将更安全，因为你不会依赖于class和id。因此，几乎不会因为更改了HTML的标签或者CSS样式受到影响。像Vue这样的JavaScript框架的主要目的之一就是让开发人员不必去处理DOM.  
（5）用途：减少获取dom节点的消耗.  
一般来讲，获取DOM元素，需document.querySelector（".input1"）获取这个dom节点，然后在获取input1的值。但是用ref绑定之后，我们就不需要在获取dom节点了，直接在上面的input上绑定input1，然后$refs里面调用就行。然后在javascript里面这样调用：this.$refs.input1  这样就可以减少获取dom节点的消耗了。  
- 主要解决问题：通过better-scroll和$refs引用元素节点实现城市列表滚动 [better-scroll](https://github.com/ustbhuangyi/better-scroll/blob/master/README_zh-CN.md)  
代码片段：  
> 下面的代码中 better-scroll 是作用在外层 wrapper 容器上的，滚动的部分是 `<div>`元素。这里要注意的是，better-scroll 只处理容器（wrapper）的第一个子元素的滚动，其它的元素都会被忽略。
```html
<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
      <div class="area">
      <div class="area">
    </div>
  </div>
</template>
```
> 通过better-scroll 提供了一个类，实例化的第一个参数是一个原生的 DOM 对象（这里通过了$refs取得DOM节点）。当然，如果传递的是一个字符串，better-scroll 内部会尝试调用 querySelector 去获取这个 DOM 对象，也可以写成`new Bscroll('.list') `
```js
<script>
import Bscroll from 'better-scroll'
export default {
  name: 'CityList',
  mounted () {
    this.scroll = new Bscroll(this.$refs.wrapper) 
  }
}
</script>
```
### 4、城市列表和字母表的AJAX动态数据渲染
实现效果：采用ajax异步通信获取数据，结合循环遍历来动态渲染数据。  
主要代码片段如下：  
> axios下的ajax使用流程：引入axios,并在节点挂载完整的mounted生命周期时触发数据请求，将拿到的数据用data中的相关项进行缓存，然后通过属性的方式进行父子传值，传给子组件，子组件通过props接收，然后再进行循环遍历取值渲染。
```js
import axios from 'axios' //1引入axios

    <city-list :cities="cities" :hot="hotCities"></city-list> //然后通过属性的方式进行父子传值，传给子组件
    <city-alphabet :cities="cities"></city-alphabet>

  data () {
    return {       //将拿到的数据用data中的相关项进行缓存
      cities: {},
      hotCities: []
    }
  },
  methods: {
    getCityInfo () {
      axios.get('/api/city.json')
        .then(this.handleGetCityInfos)   //axios返回的是promise对象，可以使用then来处理成功回调函数
    },
    handleGetCityInfos (res) {
      console.log(res)
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.cities = data.cities
        this.hotCities = data.hotCities
      }
    }
  },
  mounted () {
    this.getCityInfo()   //并在节点挂载完整的mounted生命周期时触发数据请求
  }

```
> 单页组件进行接收,热门城市和城市列表的数据加载
```html
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper" v-for="item of hot" :key="item.id">
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="area" v-for="(item, key) of cities" :key="key">
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list" v-for="innerItem of item" :key="innerItem.id">
          <div class="item border-bottom">{{innerItem.name}}</div>
        </div>

```
```js
export default {
  props: {
    cities: Object,
    hot: Array
  }
}
```
### 4、兄弟组件数据传递
实现效果：（1）点击右侧的字母列表，城市列表页会随之跳转到响应的字母开头的城市。（2）滑动右侧的字母列表时，左侧的城市列表页会随着滚动。   
实现逻辑：将这个字母值传递给List.vue组件页，将相对应的城市区块显示出来，非父子组件传值可以用bus总线的方式，这里是简单的兄弟之间传值，可以将Alphabet.vue --》 City.vue  --》List.vue    
三个文件的作用：  
Alphabet.vue：通过点击或者滑动，传出当前被激活的字母。  
City.vue：中转站，拿到Alphabet.vue送出的字母，传给List.vue  
List.vue：负责根据拿到的字母，来实现城市区域的跟新显示
- 效果一的业务代码：
>（1）Alphabet.vue单文件组件，给每项遍历出来的字母加上一个点击事件，获取当前点击的字母值,并通过`$emit('change',e.target.innerText)`,向外触发一个change事件，携带的数据时当前字母表的值,第二个参数。  
主要代码语句：Alphabet.vue文件
```html
  <li class="item" v-for="(item,key) of cities" :key="key" @click="handleLetterClick">{{key}}</li>
```
```  js
    methods: {
    handleLetterClick (e) {
      this.$emit('change', e.target.innerText)
    }
  }
```
> （2）在City.vue中的`<city-alphabet :cities="cities" @change="handleLetterChange"></city-alphabet>`进行监听由单页组件向外触发的change事件，若果监听到那么执行handleLetterChange事件，在这个事件中将传进来的letter缓存早data中的letter内，然后通过属性绑定的方式，传递给List.vue组件.   
主要代码语句：City.vue文件  
```html
    <city-list :cities="cities" :hot="hotCities" :letter="letter"></city-list>
    <city-alphabet :cities="cities" @change="handleLetterChange"></city-alphabet>
```

```js
  data () {
    return {
      cities: {},
      hotCities: [],
      letter: ''
    }

    handleLetterChange (letter) {
      this.letter = letter
    }
```
> (3)在List.vue的props中进行接收由City.vue转发过来的letter值，List.vue需要监视letter是否改变，如果改变就使用`this.scroll.scrollToElement(element)`,也即是better-scroll的scrollToElement接口，通过这个接口传入需要显示的区域节点，那么怎么将不同的城市区块加以区分，并传进来呢？`<div class="area" v-for="(item, key) of cities" :key="key" :ref="key">`给每个循环的区块都注册一个dom节点的引用，
` const element = this.$refs[this.letter][0]`这里的$refs返回的是包含`[A,B,C,D.....]`的城市块数组,刚好在其中查找出点击字母的城市块，传入接口中即可。
主要代码语句：List.vue文件
```html
        <div class="area" v-for="(item, key) of cities" :key="key" :ref="key">   //这里通过ref注册引用，引用是key（A,B,C...）相当于给每个城市                                                                                   块加了一个识别标志
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list" v-for="innerItem of item" :key="innerItem.id">
          <div class="item border-bottom">{{innerItem.name}}</div>
        </div>
      </div>
```
```  js
 props: {
    cities: Object,
    hot: Array,
    letter: String  //接收由City.vue转发过来的letter值
  },
  
  
  watch: {
    letter () {
      if (this.letter) {
        const element = this.$refs[this.letter][0]   //找到点击字母所标记得城市块
        this.scroll.scrollToElement(element)
      }
    }
  }
```
- 效果二的业务代码：
实现逻辑：和点击更新城市列表区域的一样，都是根据当前点击或者手指触摸的字母值，来实时改变城市列表页区域。   
*要解决的问题是：怎么计算出当前手指滑动到的是哪一个字母！！！*
> 知识点1：‘视（View）’是‘窗口(window)’的一种，像你现在看到的浏览器，整个IE就是窗口，而显示网页的区域就是视口。视口是显示文档的区域，即客户区。
主要代码片段：Alphabet.vue文件
```html
<template>
  <ul class="list">
    <li class="item" v-for="item of letters" :key="item" :ref="item"     
      @click="handleLetterClick"
      @touchstart="handleTouchStart"    //给每一个字母都帮定四个事件：一个点击事件，一组触摸事件
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >{{item}}</li>
  </ul>
</template>
```
```js
  data () {
    return {
      touchStatus: false    //触摸事件设置的标志位，判断当前字母是否处于触摸装态
    }
  },
  computed: {
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters // [A,B,C....]        //从传进来的后台城市列表的数据中，将城市字母的值全部提出，放到一个数组中。
    }
  },
  methods: {
    handleLetterClick (e) { 
      this.$emit('change', e.target.innerText)   // 点击事件时，向外传送当前点击的文本内容，也即是当前点击的字母值
    },
    handleTouchStart () {
      this.touchStatus = true  
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        const startY = this.$refs['A'][0].offsetTop       //是字母A距离城市列表区域上边界的距离
        const touchY = e.touches[0].clientY - 79      // e.touches[0].clientY是当前手指所点击处距离视口的高度，79px是导航头部的高度（蓝色块）
        const index = Math.floor((touchY - startY) / 20)  根据高度差和每个字母的高度，可以计算出手指划过了多少个字母。
        if (index >= 0 && index < this.letters.length) {   
          this.$emit('change', this.letters[index])   //根据划过字母的数量，来从字母数组中找出当前划过的是哪个字母，然后向外触发。
        }
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
```
- 根据右侧字母列表更新城市列表块的性能优化  
代码存在问题：  
(1)由于给每个字母上面都绑定了触摸事件，在`handleTouchMove (e)`中每划过一个字母时都会重新计算一次字母A的offsetTop值，而这个值实际上只要计算一次就好，是一个基准参考值。那么可以借助钩子函数，来处理这个计算，用哪个钩子函数呢？  
> 用mounted钩子函数可以吗？不行初始化时，cities为空，而字母列表是从cities中获取的，当用mounted挂载完页面时，还没有从AJAX获取数据，没有字母表的出现，又谈何计算A的offsetTop.
```js //city.vue
  data () {
    return {
      cities: {},   //初始化时，cities为空，而字母列表是从cities中获取的
      hotCities: [],
      letter: ''
    }
```

> 用updatad钩子函数，mounted发送axios请求数据之前cities为空，请求数据之后，VUE检测到有数据更新将会重新渲染dom, 之后将cities中的字母表渲染出来，既然这时有了字母列表，就可以计算A的offsetTop
原来的代码：
```js
    handleTouchMove (e) {
      if (this.touchStatus) {
        const startY = this.$refs['A'][0].offsetTop  //划过每个字母时都会计算一次
        const touchY = e.touches[0].clientY - 79
        const index = Math.floor((touchY - this.startY) / 20)
        if (index >= 0 && index < this.letters.length) {
          this.$emit('change', this.letters[index])
        }
      }
    },

```
优化后的代码：
```js
  data () {
    return {
      touchStatus: false,
      startY: 0
    }
  },
  updated () {
    this.startY = this.$refs['A'][0].offsetTop   
  },
```
(2)每个字母都绑定了触摸事件，当在字母表上进行上下移动时，`handleTouchMove`执行的频率是非常高的，可以通过函数截流限制一下函数执行的频率。  
> 使用了定时函数setTimeOut,和定时标志位timer：代表是否有定时事件正在执行，设置了一个定时函数的截流，截流时间是16ms,也即是当两个时间的触发间隔小于16ms时，前一个不会发生，否则只要触发就会发生，可以在人眼察别不出来变化延时的情况下适当限制下一些函数的执行次数。
```js
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null  //timer标志
    }
  },

    handleTouchMove (e) {
      if (this.touchStatus) {
        if (this.timer) {              // 设置了一个定时函数的截流，截流时间是16ms,也即是当两个时间的触发间隔小于16ms时，前一个不会发生
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 79
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index])
          }
        }, 16)
      }
    },

```
### 5、搜索逻辑的实现
实现效果：在搜索框中搜索城市的关键字或者拼音时，会将城市列表块区域全部覆盖掉，会出现cities数据中所有的符合项的展示。  
实现逻辑：根据cities中数据的特点，进行两次循环，获取每个城市的name和spell，然后判断是否在搜索关键字中包含着，若果是那么直接放到一个result的数组中保存起来，最终result中是所有符合项的城市名，赋值给list,使用v-for进行遍历渲染到模板显示。  
主要代码：
```html
    <div class="search-content" ref="search" v-show="keyword">  //根据 v-show="keyword"的有无来决定，搜索结果页是否出现
      <ul>
        <li class="search-item border-bottom" v-for="item of list" :key="item.id">
          {{item.name}}
        </li>
        <li class="search-item border-bottom" v-show="hasNoData">  //根据搜索结果决定，是否提示有没有匹配到信息
          没有找到匹配数据
        </li>
      </ul>
    </div>
```
```js
  data () {
    return {
      keyword: '', // 搜索框中的关键词
      list: [], // 用来存放所有匹配到的结果，所有含有关键词的城市名
      timer: null
    }
  },
    computed: {
    hasNoData () {
      return !this.list.length //  没有找到匹配数据时，根据匹配结果中数量来控制提示信息栏是否出现
    }
  },

    watch: {  // 用来监视关键字是否发生改变，如果改变那么就进行匹配，也用到了定时函数节流，当修改搜索关键词时间小于100ms时，前一次的被清除。
    keyword () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyword) {
        this.list = []    //若果关键字不存在，list为空，也即是没有搜索时，不显示内容。
        return
      }
      this.timer = setTimeout(() => {
        const result = []     // 用于存放从cities中找到的和关键词匹配的项。
        for (let i in this.cities) {   
          this.cities[i].forEach((value) => {
            if (value.spell.indexOf(this.keyword) > -1 || value.name.indexOf(this.keyword) > -1) {
              result.push(value)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },

```
### 遇到的问题及解决办法  
- 问题1：当符合搜索关键字的城市名特别多时，会占满展示页面，不能滚动了。  
问题解决：借用better-scroll实现局部滚动。  
主要代码：
```html
<div class="search-content" ref="search" v-show="keyword">   //注意要符合better-scroll的使用规范
      <ul>
        <li class="search-item border-bottom" v-for="item of list" :key="item.id">
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
```
```js
  mounted () {
    this.scroll = new Bscroll(this.$refs.search)  //将要实现滚动的节点内容作为参数传入。
  }
```
### 5、通过[Vuex](https://vuex.vuejs.org/zh/)实现单文件组件间数据共享
实现效果：点击城市列表页中城市，或者是搜索框搜到的城市，首页右上角的城市名都能随着改变，并且点击后自动跳转到首页。  
实现逻辑：使用vuex(一个专为 Vue.js 应用程序开发的状态管理模式)将两个单文件组件相通的数据进行共享管理，另外使用[编程式导航](https://router.vuejs.org/zh/guide/essentials/navigation.html)来进行点击更改后完成首页的自动跳转。
> vuex的使用原理：在state中存放共享数据-->通过组件调用dispatch方法来调用action函数中的方法 -->再有action函数中的方法使用commit方法，调用mutation函数来改变数据 -->数据改变那么组件里面的数据随着改变。  
主要代码段：store/index.js文件
```js  
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: '武汉'   //是共享数据
  },
  actions: {     
    changeCity (ctx, city) {  //接收由点击`handleCityClick`事件传送来的参数，第一个参数是执行上下文
      ctx.commit('citychange', city)  //在调用mutation中的citychange函数，将要改变的城市名进一步传送
    }
  },
  mutations: {
    citychange (state, city) {  
      state.city = city  //最终转啦一圈，用新数据改变共享数据
    }
  }
})
```
> 以List.vue为例进行分析，search.vue页类似,给每个城市列表的城市名都绑定了一个`handleCityClick`事件,并将当前的城市名传入
```html
        <div class="item-list" v-for="innerItem of item" :key="innerItem.id" @click="handleCityClick(innerItem.name)">
          <div class="item border-bottom">{{innerItem.name}}</div>
        </div>
```
```js
  methods: {
    handleCityClick (city) {   //该函数利用vuex中的diapatch方法，将数据送到了action中changeCity的方法中
      this.$store.dispatch('changeCity', city)
      this.$router.push('/')  //编程式导航，跳转到首页
    }
  },
```
### 遇到的问题及解决办法  
- 问题1：当更改完首页中的城市名字后，再次刷新又会回到默认值，没有缓存机制;另外随着store文件中index.js代码越来越多，可以拆分多个子文件，通过export导出和import导入。
问题解决：使用HTML中的localstorage来完成本地存储。  
主要代码：
> 当一些用户关闭了本地存储功能或者开启了隐身模式，使用localstorage会直接使浏览器抛出异常，导致代码无法运行，最好和try---catch组合使用
```html

```
```js
let defaultCity = '武汉'
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}

export default new Vuex.Store({
  state: {
    city: defaultCity
  },
  actions: {
    changeCity (ctx, city) {
      ctx.commit('citychange', city)
    }
  },
  mutations: {
    citychange (state, city) {
      state.city = city
      try {
        localStorage.city = city
      } catch (e) {}
    }
  }
})
```
- 代码优化部分：  
> 使用了vuex状态管理模式来管理共享的数据，之后将其实例化导出，在根文件main.js中引入，并注入到了根组件中，那么在其他组件实例中都可以直接调用访问，不过调用访问要用`{{this.$store.state.city}}`代码比较长，若多处使用更不方便，使用了vuex的mapState辅助函数，在组件中创建计算属性来返回vuex store中的状态，然后直接调用。
```html
     <div class="button">{{this.$Store.state.city}}</div>  ---->   <div class="button">{{this.currentCity}}</div>
```
```js
import { mapState } from 'vuex'
  computed: {
    ...mapState({
      currentCity: 'city'
    })
  },
```
- 知识点1：  
(1)mapState 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。但是自从有了对象展开运算符，我们可以极大地简化写法：
```js
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```
(2)扩展运算符应用在 函数的返回值  
JavaScript 的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。
### 5、使用keep-alive优化网页性能  
- 性能优化1：
优化之前：每次路由切换时都会进行AJAX请求，路由要跳转到城市列表页时，会触发ajax去请求city.json中的数据；当需要跳转到首页时，会触发ajax去请求index.json中的数据，每次都是如此。  
优化之后：使用keep-alive,将路由加载过一次之后的数据保存在内存当中，下次再需要时直接从内存中获取，也即是首页和城市列表页切换时只会各自触发一个ajax请求来获取自己页面所需要的数据。
```html
<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
```
- 性能优化2：  
问题：上面的优化是使首页请求一次ajax请求，城市列表页请求一次ajax请求，实际上首页需要根据不同的城市名显示不同城市的景点信息，所以首页需要根据每次路由进行重新加载。给每个首页的请求加上参数，参数为选中城市名，不过由于之前已经将首页请求的内容通过`<keep-alive>`进行了缓存，所以会出现首页右上角的城市名改变了，而首页的内容还是之前缓存的，理想的效果是：当改变城市后，这个城市名会作为首页请求的参数，去调用相关城市的数据进行渲染。  
问题解决：使用`<keep-alive>`新增的生命周期钩子函数activited(),当页面重新被加载时会被执行（当首次加载页面时mounted和activited都会执行，之后点击城市列表页中不同城市名时，activited都会被执行），以及缓存之前的城市，做比较决定是否发送ajax请求。
主要代码片段：
```js
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
```
## 旅游网站详情介绍页开发  
### 1、动态路由和banner布局
实现效果：当点击热销推荐中的栏目时，会根据路由的路径跳转到详情页，这里设置的是动态路由加了item.id在里面，可以根据不同的条目来显示不同的详情页内容。  
- 知识点1：`<router-link>`的tag属性,有时候想要 <router-link> 渲染成某种标签，例如`<li>`,于是我们使用 tag prop 类指定何种标签，同样它还是会监听点击，触发导航。  
主要代码片段：
```html
Recommend.vue文件
      <ul>
      <router-link tag="li" class="item border-bottom" v-for="item of list" :key="item.id" :to="'/detail/' + item.id">  //动态绑定路由
        <img class="item-img" :src="item.imgUrl" />  //图片部分
        <div class="item-info">   //文本信息部分
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
          <button class="item-button">查看详情</button>
        </div>
      </router-link>
    </ul>
```
```js
  router中的index.js文件
      {
      path: '/detail/:id', //动态匹配路由
      name: 'Detail',
      component: Detail
    },
```
- 知识点二：线性渐变和透明度  
  linear-gradient() 函数用于创建一个线性渐变的 "图像"；语法：linear-gradient(direction, color-stop1, color-stop2, ...);  
  direction	用角度值指定渐变的方向（或角度）透明度：0.0 （完全透明）到 1.0（完全不透明）。
  ```html
   .banner-info
      background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))
  ```
 ### 2、公用图片画廊拆分成公共组件
  实现效果：点击banner会出现公共画廊，该画廊具有轮播特效，并且具有“1/33” 这样的分页显示，当点击画廊上下的非图片区域时，会关闭画廊。考虑到可能以后也要用到这个画廊效果，所以将其拿出来进行组件化。  
  拆分实现逻辑：创建路径-> src/common/gallary/Gallay.vue ,然后在Banner.vue中导入,在模板中使用，通过一个v-show的标志位来控制banner和gallary谁显示谁隐藏。  
主要代码片段:Banner.vue文件
 ```html 
  <common-gallary :imgs="imgs" v-show="showGallary" @close="handleGallaryClose"></common-gallary>   监听Gallary.vue向外触发的关闭事件
 ```
  ````js
  import CommonGallary from 'common/gallary/Gallary'
  
    components: {
    CommonGallary
  }
  ````
### 遇到的问题及解决办法  
- 问题1：当给`<common-gallary>`组件添加了v-show="showGallary"进行隐藏或显示时，画廊的左右滑动达不到预期的效果了  
问题解决：只进行了隐藏和显示操作，使得画廊的swiper不能正常工作，可以尝试在改变操作后进行初始化刷新，这个时候要找到给swiper插件进行初始化和刷新的配置方法  
> [observer](https://3.swiper.com.cn/api/Observer/2015/0308/218.html)：启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper   
 [observeParents](https://3.swiper.com.cn/api/Observer/2015/0308/219.html):将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。  
[分页类型的设置paginationType](https://3.swiper.com.cn/api/pagination/2016/0126/299.html) 
```html
<template>
  <div class="container" @click="handleGallaryClick">
    <div class="wrapper">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(item, index) in imgs" :key="index">
          <img class="gallary-img" :src="item" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
```
```js
  data () {
    return {
      swiperOptions: {
        pagination: '.swiper-pagination',
        paginationType: 'fraction',  //设置分页的类型
        observeParents: true,
        observer: true
      }
    }
  },
```
### 3、Header渐隐渐显效果的实现和对全局事件的解绑
实现效果：在banner的头部有一个景点详情的介绍框，左边有一个后退的按钮，当向下滚动时，如果滚动距离大于60px时，那么后退按钮会消失，介绍框会一点一点出现。   
![](https://github.com/SUNNERCMS/Wherego/blob/master/src/sucai/GIF.gif)    
实现逻辑：根据scrollTop的值来计算opacity值的变化，来做渐隐渐现的效果。   
主要代码片段:  
```html
    <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">   给介绍框绑定了动态的样式
      <router-link to="/">
        <div class="iconfont header-fixed-back">&#xe624;</div>
      </router-link>
      景点详情
    </div>
```
```js
<script>
export default {
  name: 'DetailHeader',
  data () {
    return {
      showAbs: true,
      opacityStyle: {  //动态的样式数据
        opacity: 0
      }
    }
  },
  methods: {
    handleScroll () {                                  // 滚动超过规定区域呈现渐隐渐现的效果
      const top = document.documentElement.scrollTop // 获取该元素垂直滚动的像素数
      if (top > 60) {
        let opacity = top / 140              // 结果是小数形式，当top超过140，opacity就超过1了
        opacity = opacity > 1 ? 1 : opacity // 对opacity的最大值做了限定
        this.opacityStyle = { opacity }    // 将计算出来的opacity的值进行更新动态显示
        this.showAbs = false              // 当向下滚动超过60px时，header-fixed块才显示出来
      } else {
        this.showAbs = true              // top的值小于60px，圆显示，块隐藏
      }
    }
  },
  activated () {                                                // keep-alive带来的钩子函数，只要一被展示，这个函数就会执行。
    window.addEventListener('scroll', this.handleScroll)
  },
  deactivated () {                                            // 由于是全局对象下监听scroll事件，那么在其他页面滚动时仍会触发
    window.removeEventListener('scroll', this.handleScroll) // 这里便是当页面消失或者离开该页面时触发的函数，对全局事件的解绑
  }
}
</script>
```
### 5、使用递归组件实现详情页多级列表
- 我所理解的递归组件的思想：   
适用环境:当数据一层一层往里嵌套时，并且可以看做最小单元块的复用情况下，找到最小单元块的表达形式和表达关系即可使用递归。   
主要代码片段：  
> 递归使用的数据格式:可以看做title->children的形式往里进行嵌套
```js
 return {
      list: [{
        title: '成人票',
        children: [{
          title: '成人三馆联票',
          children: [{
            title: '成人三馆联票 - 某一连锁店销售'
          }]
        }, {
          title: '成人五馆联票'
        }]
      }, {
        title: '学生票'
      }, {
        title: '儿童票'
      }, {
        title: '特惠票'
      }]
    }
```
> 递归的实现逻辑，这里相当于一层一层的扒皮区骨，进行渲染，直至对象的最里面
```html
<template>
  <div>
    <div class="item" v-for="(item, index) of list" :key="index">  这里第一次使用时是取得是成人票，学生票这个一级对象，
      <div class="item-title border-bottom">
        <span class="item-title-icon"></span>
        {{item.title}}
      </div>
      <div v-if="item.children" class="item-chilren">  这里判断一级对象中是否有含有children的对象
        <detail-list :list="item.children"></detail-list>  如果有将其看做一个整体数据在使用这个单文件组件进行遍历
      </div>
    </div>
  </div>
</template>
```
```js
<script>
export default {
  name: 'DetailList',
  props: {
    list: Array
  }
}
</script>
```
### 6、动态获取详情页数据
### 遇到的问题及解决办法  
- 问题1：当点击热销推荐中的故宫时，通过axios发送请求来获取详情页的数据，点击不同的景点时获取不同的数据，那是怎么区别的呢？关键点在于每个景点的id值不同，根据这个可以各自的数据。那么现在问题是什么呢？点击不同的景点，请求中的id值始终为第一次的id值如：`http://localhost:8080/#/detail/0001` 这里的id参数会变，但是控制栏中Network中的XHR显示的发送的请求参数不变。  
问题分析：这里的问题和`home.vue`中的类似，那里是当点击城市列表的城市时，要在首页显示不同的信息，然而由于所有的路由都用了keep-alive进行了缓存，所以点击不同的城市也只是会显示第一次加载数据后的缓存信息。这里的问题也是如此：由于Detail页面通过keep-alive做了缓存，所以mounted中的ajax请求就只执行一次。   
之前的解决方法如下：  
> home.vue文件，使用了keep-alive的生命周期钩子函数：activited() 再次请求，覆盖缓存，让首页可以根据城市名是否改变来决定是否重发ajax请求。
```js
  activated () {
    if (this.lastCity !== this.city) { // 当这次的城市名和上次不同时，要重新加载对应数据
      this.lastCity = this.city // 当这次的城市名和上次不同时，将原来的覆盖，用于后面在比较
      this.getHomeInfo() // 重新发送ajax请求
    }
  }
```
这里的解决方法如下：    
> 在根组件中的keep-alive中设置不缓存的单文件组件，也即是每一次进入该页面时都会触发mounted钩子函数，发送ajax请求获取相对应的数据。
```html
<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
  </div>
</template>
```
- 问题2：多个页面之间的拖动存在关联，拖动首页点击热门推荐的最后一个选项，跳转到详情页时，界面也存在拖动。   
解决方法：在router路由管理器中设置每次切换路由后，新页面的[滚动行为](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#异步滚动)。
```js
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    // 重定向
    {
      path: '/',
      redirect: '/home'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

```
### 7、在项目中加入基本动画
实现效果：给gallary画廊组件在使用时加入了fade-in和fade-out的效果。  
实现逻辑：利用`<transition>`为单文件组件添加过渡效果，并将外部组件通过`<slot>`插入进来，表示给该组件添加过渡效果。 也可以理解为这里创建了一个过渡组件，在其他组件导入这个组件之后，想让谁有过渡效果就把谁放到这个组件中。
> 主要代码片段：FadeAnimation.vue文件   
```html
<template>
  <transition>
    <slot></slot>  //接收外部组件或节点
  </transition>
</template>
```
```js
<script>
export default {
  name: 'FadeAnimation'
}
</script>
```
```css
<style lang="stylus" scoped>
  .v-enter, .v-leave-to           代表进入过渡轴之前和离开过渡轴之后
    opacity: 0
  .v-enter-active, .v-leave-active  进入过渡轴后和离开过渡轴前
    transition: opacity .5s
</style>
```
> 主要代码片段：使用这个过渡组件的Banner.vue文件
```html
    <fade-animation>   用这个过渡组件包含想要添加过渡效果的组件
      <common-gallary :imgs="bannerImgs" v-show="showGallary" @close="handleGallaryClose">  这里的内容会被放到过渡组件模板中的插槽中
      </common-gallary>
    </fade-animation>
```
```js
<script>
import CommonGallary from 'common/gallary/Gallary'  //将过渡组件导入
 components: {
    CommonGallary,
    FadeAnimation
  }
}
</script>
```
