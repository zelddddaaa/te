// 引入并注册vue, vue-router
import vue from 'vue'
import VueRouter from 'vue-router'
// 引入登录路由组件
import login from '@/views/login/index.vue'
// 引入主页路由组件
import home from '@/views/home/index.vue'
vue.use(VueRouter)
// 创建路由对象
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: login },
    { name: 'home', path: '/', component: home }
  ]
})
export default router
