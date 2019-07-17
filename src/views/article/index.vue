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
          <!-- 下拉选择器,组件封装 -->
          <!-- :value="reqParams.channel_id"  @input="把改变的数据设置给reqParams.channel_id -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <!-- 表单项 -->
        <el-form-item label="日期: ">
          <!-- 日期选择器 -->
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
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
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容区域 -->
    <el-card>
      <!-- 卡片头部 -->
      <div slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b> 条结果：
      </div>
      <!-- 表单区域 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px;">
              <!-- 当图片不显示时,error插槽内容显示 -->
              <div slot="error">
                <img src="../../assets/images/error.gif" width="100" height="75" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" icon="el-icon-edit" plain type="primary" circle></el-button>
            <el-button @click="del(scope.row.id)" icon="el-icon-delete" plain type="danger" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pager"
          :current-page="reqParams.page"
          :page-size="reqParams.per_page"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
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
        end_pubdate: null,
        // 分页
        page: 1,
        per_page: 20
      },
      // 日期数据
      dateValues: [],
      // 总条数
      total: 0,
      // 文章列表数据
      articles: []
    }
  },
  // 加载页面触发
  created () {
    this.getArticles()
  },
  methods: {
    // 编辑
    edit (id) {
      // 编程式导航
      this.$router.push(`/publish?id=${id}`)
    },
    // 删除
    del (id) {
      this.$confirm('亲，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.axios.delete(`articles/${id}`)
          // 消息提示 MessageBox 弹框
          this.$message.success('删除成功')
          // 刷新数据
          this.getArticles()
        })
        .catch(() => {})
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 搜索
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    // 时间处理方法,格式与绑定值一致，可受 value-format 控制
    changeDate (values) {
      // 形参values接收 dateValues
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    // 获取文章列表数据
    async getArticles () {
      const { data: { data } } = await this.axios.get('articles', { params: this.reqParams })
      console.log(data)
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
