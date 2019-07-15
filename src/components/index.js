import MyBread from '@/components/my-bread.vue'
export default {
  install (Vue) {
    // 全局注册
    Vue.component(MyBread.name, MyBread)
  }
}
