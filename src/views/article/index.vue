<template>
  <div class="article-container">
    <!-- 筛选区域 -->
    <el-card>
      <!-- 卡片头部 -->
      <div slot="header">
        <!-- 面包屑插件 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 筛选表单 -->
      <el-form :model="reqParams" size="small" label-width="80px">
        <!-- 单独表单项,label标签属性 -->
        <el-form-item label="状态: ">
          <!-- 单选框组 -->
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 表单项 -->
        <el-form-item label="频道: ">
          <!-- 下拉选择器 -->
          <el-select v-model="reqParams.channel_id">
            <!-- 下拉项 -->
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 表单项 -->
        <el-form-item label="日期: ">
          <!-- 日期选择器 -->
          <el-date-picker
            v-model="dateValues"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            range-separator="至"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item>
        <!-- 表单项 -->
        <el-form-item>
          <!-- 表单按钮 -->
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容区域 -->
    <el-card></el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交给后端的筛选数据
      reqParams: {
        // null不会提交给后台
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道的选项数组
      channelOptions: [{ name: 'java', id: 1 }, { name: 'js', id: 2 }],
      // 日期数据
      dateValues: []
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
