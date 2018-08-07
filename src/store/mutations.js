/*
* @Author: SUNNERCMS
* @Date:   2018-08-07 10:01:42
* @Last Modified by:   SUNNERCMS
* @Last Modified time: 2018-08-07 10:05:08
*/
export default {
  citychange (state, city) {
    state.city = city
    try {
      localStorage.city = city
    } catch (e) {}
  }
}
