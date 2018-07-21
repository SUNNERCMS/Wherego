# wherego
## 旅游网站首页开发
1.header区域  
2.首页轮播图  
（1）图片的宽高为640px,200px,宽高比例是31.25%
  是为了进行宽高比例自适应
    `width: 100%
    padding-bottom: 31.25%`   
（2）scoped：表示当前的样式仅仅对HomeSwiper这个单页组件有效，而轮播图里面的分页，
  确实在swipe这样的一个子组件中，即便在style中设置了样式也不奏效，只有进行样式的穿透。  
  样式穿透：
`  .wrapper >>> .swiper-pagination-bullet-active
    background: #fff`  
3.图标区域  
  实现效果：在图标区显示8个导引小图标，超过8个时增加第二页可以进行分页轮播查看。  
  逻辑实现：借助swiper来完成轮播动画，不过要通过computed计算属性来完成分页的计算，运用了一维数组转化为二维数组的方法，pages[0]中最多是8个图标，多余的放到pages[1]中，在swiper-slide中就是展示的下一页内容。  
  主要代码段：  
  <div class="icons">
  <swiper>
    <swiper-slide v-for="(page, index) of pages" :key="index">
      <div
        class="icon"
        v-for="item of page"
        :key="item.id"
      >
        <div class='icon-img'>
          <img class='icon-img-content' :src='item.imgUrl' />
        </div>
        <p class="icon-desc">{{item.desc}}</p>
      </div>
    </swiper-slide>
  </swiper>
  </div>
  
 
4.热销推荐组件开发  
5.周末游组件开发  
6.使用axios发送ajax请求  
7.首页父子组件的传值
## 旅游网站城市列表页开发  
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
