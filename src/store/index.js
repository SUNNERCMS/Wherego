/*
* @Author: SUNNERCMS
* @Date:   2018-08-06 20:56:04
* @Last Modified by:   SUNNERCMS
* @Last Modified time: 2018-08-07 10:04:42
*/
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations
})
