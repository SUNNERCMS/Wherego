<!--
 * @file: todolistdemo:用于回顾vue的知识点
 * @author: sunzhaoxiang@baidu.com
 * @Date: 2021-10-09 18:45:35
 * @LastModifiedBy: sunzhaoxiang@baidu.com
 * @LastEditTime: 2021-10-09 18:55:38
-->
<template>
  <div>
    <city-header></city-header>
    <head-text></head-text>
  </div>
</template>
<script>
import CityHeader from '../city/components/Header'
import HeadText from './components/HeadText'

export default{
  name: 'TodoList',
  components: {
    CityHeader,
    HeadText
  }
}
</script>
<style>

</style>
