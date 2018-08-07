/*
* @Author: SUNNERCMS
* @Date:   2018-08-07 09:58:39
* @Last Modified by:   SUNNERCMS
* @Last Modified time: 2018-08-07 10:05:04
*/
let defaultCity = '武汉'
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}

export default {
  city: defaultCity
}
