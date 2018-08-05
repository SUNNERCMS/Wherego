# wherego
导航目录： 

## 旅游网站首页开发 
### 1.header区域  
### 2.首页轮播图  
（1）图片的宽高为640px,200px,宽高比例是31.25%
  是为了进行宽高比例自适应
    `width: 100%
    padding-bottom: 31.25%`   
（2）scoped：表示当前的样式仅仅对HomeSwiper这个单页组件有效，而轮播图里面的分页，
  确实在swipe这样的一个子组件中，即便在style中设置了样式也不奏效，只有进行样式的穿透。  
  样式穿透：
`  .wrapper >>> .swiper-pagination-bullet-active
    background: #fff`  
### 3.图标区域  
  实现效果：在图标区显示8个导引小图标，超过8个时增加第二页可以进行分页轮播查看。  
  逻辑实现：*借助`swiper`来完成轮播动画，不过要通过`computed`计算属性来完成分页的计算，运用了一维数组转化为二维数组的方法，`pages[0]`中最多是8个图标,多余的放到`pages[1]`中，在`swiper-slide`中就是展示的下一页内容。*  
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
### 3、列表布局 
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
（4）我们也可以通过使用查询选择器来访问DOM元素来实现这样的效果，但是使用ref属性更简洁，而且这也是Vue中的方法。它也将更安全，因为你不会依赖于class和id。因此，几乎不会因为更改了HTML的标签或者CSS样式受到影响。像Vue这样的JavaScript框架的主要目的之一就是让开发人员不必去处理DOM
（5）用途：减少获取dom节点的消耗。  
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

### 4、BetterScroll的使用和字母表布局

## 旅游网站详情介绍页开发  
## 项目联调测试与发布上线
1.  
2.
3.  
4.  
5.
6.
7.
## 相关插件的使用
1.stylus:css预处理器  
2.iconfont:图标库
3.swipe轮播图插件
## 问题及解决部分
### 问题一：  
移动端1像素边框的解决方案  
解决：采用了border.css,在项目中的路径./src/assets/styles/border.css
### 问题二：  
300ms点击延时的问题：在一些移动终端中，click点击事件会有300ms的点击延时  
解决：1.在当前项目的目录下，通过gitbash安装了fastclick第三方的依赖库，操作指令为 npm install fastclick --save  
2.再入口文件中引入 `import fastClick from 'fastclick'`应用在文档体中：`fastClick.attach(document.body)`

