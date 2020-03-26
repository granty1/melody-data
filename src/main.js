import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueAxios } from '@/util/request'

import '@/init'

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
