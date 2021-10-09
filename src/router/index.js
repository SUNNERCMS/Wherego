/**
 * @file: 路由管理
 * @author: sunzhaoxiang@baidu.com
 * @Date: 2021-10-09 17:43:08
 * @LastModifiedBy: sunzhaoxiang@baidu.com
 * @LastEditTime: 2021-10-09 18:56:13
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import City from '@/pages/city/City'
import Detail from '@/pages/detail/Detail'
import TodoList from '@/pages/todoList/TodoList'
Vue.use(Router)
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
    // 使用vue实现todolist
    {
      path: '/todoList',
      name: 'TodoList',
      component: TodoList
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
