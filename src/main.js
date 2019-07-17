import Vue from 'vue'
import App from './App.vue'
// 引入并注册element组件
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入router
import router from '@/router/index.js'
// 引入axios
import axios from '@/api/axios.js'
// 引入面包屑插件
import components from '@/components/index.js'
// 导入全局样式
import '@/styles/index.less'
Vue.use(components)
Vue.prototype.axios = axios
Vue.use(element)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
