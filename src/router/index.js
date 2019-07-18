// 引入并注册vue, vue-router
import vue from 'vue'
import VueRouter from 'vue-router'
// 引入登录路由组件
import login from '@/views/login/index.vue'
// 引入主页路由组件
import home from '@/views/home/index.vue'
// 引入home子路由
import welcome from '@/views/welcome/index.vue'
// 引入404子路由
import NOTFOUND from '@/views/404/NOTFOUND.vue'
// 引入article子路由
import article from '@/views/article'
// 引入images子路由组件
import images from '@/views/images'
// 引入publish子路由组件
import publish from '@/views/publish'

vue.use(VueRouter)
// 创建路由对象
const router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: login
  },
  {
    path: '/',
    component: home,
    children: [{
      name: 'welcome',
      path: '/',
      component: welcome
    }, {
      name: 'article',
      path: '/article',
      component: article
    },
    {
      name: 'image',
      path: '/image',
      component: images
    },
    {
      name: 'publish',
      path: '/publish',
      component: publish
    }
    ]
  },

  // 404设置在所有路由之后
  {
    name: '404',
    path: '*',
    component: NOTFOUND
  }
  ]
})
// 设置前置守卫
router.beforeEach((to, from, next) => {
  // 路由是否是/login
  if (to.path === '/login') return next()
  // 路由不会login后,是否携带sessionstorage
  const user = window.sessionStorage.getItem('te')
  if (user) return next()
  // 路由未携带sessionstorage
  next('/login')
})
export default router
