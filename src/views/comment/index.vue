<template>
  <div class="container">
    <!-- 卡片 -->
    <el-card>
      <!-- 头部插槽 -->
      <div slot="header">
        <!-- 面包屑 -->
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 列表 -->
      <el-table :data="comments">
        <el-table-column label="标题" width="400" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <!-- 开关评论按钮 -->
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="!scope.row.comment_status"
              type="success"
              size="mini"
            >打开评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else type="danger" size="mini">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 评论信息
      comments: [],
      // 提交参数
      reqParams: {
        page: 1,
        per_page: 20,
        // 什么参数?
        response_type: 'comment'
      },
      // 总条数
      total: 0
    }
  },
  // 加载页面渲染数据
  created () {
    this.getComments()
  },
  methods: {
    // 获取评论信息
    async getComments () {
      const { data: { data } } = await this.axios.get('articles', {
        params: this.reqParams
      })
      // 评论信息
      this.comments = data.results
      this.total = data.total_count
    },
    // 分页
    pager (newpage) {
      // 修改当前页
      this.reqParams.page = newpage
      this.getComments()
    },
    // 切换状态
    toggleStatus (row) {
      const text1 = '确认打开评论'
      const text2 = '确认关闭评论'
      // 三元运算符
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        onfirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.axios.put('comments/status?article_id=' + row.id, {
          // 改变评论按钮状态
          allow_comment: !row.comment_status
        })
        this.$message.success('修改文章评论状态成功')
        // 数据改变视图
        row.comment_status = data.allow_comment
      })
        .catch(() => {})
    }
  }
}
</script>

<style>
</style>
