import Vue from 'vue'
import App from './App.vue'
// 引入并注册element组件
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入router
import router from '@/router/index.js'
// 引入axios
import axios from '@/api/axios.js'
Vue.prototype.axios = axios
Vue.use(element)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
