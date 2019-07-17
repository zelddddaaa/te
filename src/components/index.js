import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'
export default {
  install (Vue) {
    // 全局注册
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
