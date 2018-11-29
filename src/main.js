// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import MyHttpServer from '@/components/plugin/http.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/base.css'
import moment from 'moment'

import router from './router'

Vue.use(ElementUI)
Vue.use(MyHttpServer)

Vue.config.productionTip = false

<<<<<<< HEAD
Vue.filter('fmtdate',(v)=>{
=======
Vue.filter('fmtdate', (v) => {
>>>>>>> dev-user
  return moment(v).format('YYYY-MM-DD')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
