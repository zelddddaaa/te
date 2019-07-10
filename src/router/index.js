// 引入并注册vue, vue-router
import vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由组件
import login from '@/views/login/index.vue'
vue.use(VueRouter)
// 创建路由对象
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: login }
  ]
})
export default router
