<template>
  <div class="container">
    <el-card>
      <!-- 头部插值 -->
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tab栏 -->
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- item.id是Bignumber的构造函数,转化成vue可以识别的字符串 -->
          <div class="fans-item" v-for="item in fans" :key="item.id.toString()">
            <!-- 图片 -->
            <el-avatar :size="80" :src="item.photo"></el-avatar>
            <!-- 名字 -->
            <p style="font-size:12px">{{item.name}}</p>
            <el-button plain type="primary" size="mini">+关注</el-button>
          </div>
          <div>
            <el-pagination
              v-if="total>reqParams.per_page"
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="pager"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="photo">
          <!-- echarts的dom容器 -->
          <div ref="bar" style="width:600px;height:400px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 导入echarts
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'photo',
      fans: [],
      // 提交参数
      reqParams: {
        page: 1,
        per_page: 20
      },
      total: 0
    }
  },
  // 数据初始化
  created () {
    this.getFans()
  },
  // el初始化,有DON元素
  mounted () {
    this.drawChart()
  },
  methods: {
    // 获取信息
    async getFans () {
      const {
        data: { data }
      } = await this.axios.get('followers', { params: this.reqParams })
      // 粉丝信息
      this.fans = data.results
      console.log(data)
      this.total = data.total_count
    },
    // 分页
    pager (newpage) {
      this.reqParams.page = newpage
      this.getFans()
    },
    // echarts
    drawChart () {
      // 为echarts准备DOM容器
      const dom = this.$refs.bar
      // 基于准别好的DOM初始化echarts实例
      const myChart = echarts.init(dom)
      // 指定图标的配置项和数据
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      // 使用指定的配置项和数据生成图表
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="less">
.fans-item {
  text-align: center;
  width: 120px;
  height: 160px;
  padding: 10px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
