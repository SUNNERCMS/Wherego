/*
* @Author: SUNNERCMS
* @Date:   2018-08-07 10:01:23
* @Last Modified by:   SUNNERCMS
* @Last Modified time: 2018-08-07 10:05:16
*/
export default {
  changeCity (ctx, city) {
    ctx.commit('citychange', city)
  }
}
