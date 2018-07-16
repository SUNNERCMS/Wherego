# wherego
## 旅游网站首页开发
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
## 问题及解决部分
### 问题一：  
移动端1像素边框的解决方案  
解决：采用了border.css,在项目中的路径./src/assets/styles/border.css
### 问题二：  
300ms点击延时的问题：在一些移动终端中，click点击事件会有300ms的点击延时  
解决：1.在当前项目的目录下，通过gitbash安装了fastclick第三方的依赖库，操作指令为 npm install fastclick --save  
2.再入口文件中引入 `import fastClick from 'fastclick'`应用在文档体中：`fastClick.attach(document.body)`
