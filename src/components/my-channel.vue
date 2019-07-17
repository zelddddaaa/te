<template>
  <el-select :value="value" @change="fn">
    <!-- 下拉项 -->
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  // 组件名称
  name: 'my-channel',
  // 接收父组件传值,父传子
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // change事件,传入当前value
    fn (value) {
      // vue实例触发自定义事件,子传父
      this.$emit('input', value)
    },
    // 获取后台渲染数据
    async getChannelOptions () {
      const { data: { data } } = await this.axios.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style>
</style>
