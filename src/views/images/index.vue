<template>
  <div class="container" v-loading="loading">
    <el-card>
      <!-- 具名插槽 -->
      <div slot="header">
        <!-- 面包屑 -->
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div style="margin-bottom:20px">
        <!-- 单选按钮组 -->
        <el-radio-group v-model="reqParams.collect" size="small">
          <el-radio :label="false">全部</el-radio>
          <el-radio :label="true">收藏</el-radio>
        </el-radio-group>
        <!-- 提交按钮 -->
        <el-button @click="dialogVisible=true" type="success" style="float:right" size="small">主要按钮</el-button>
      </div>
      <!-- 图片展示 -->
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot" v-if="!reqParams.collect">
            <span @click="toggle(item)" class="el-icon-star-off" :class="{red:item.is_collected}"></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </li>
      </ul>
      <!-- 分页器 -->
      <el-pagination
        background
        v-if="total>reqParams.per_page"
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <!-- 文件上传 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <!-- 具名插槽 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交后端数据
      reqParams: {
        // 默认全部
        collect: false,
        // 当前页
        page: 1,
        // 每页数目
        per_page: 10
      },
      // 添加素材
      dialogVisible: false, // 默认不显示对话框
      imageUrl: null,
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('te')).token
      },
      // 图片
      images: [],
      // 加载设置
      loading: false,
      // 总条数
      total: 0
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 获取后台数据
    async getImages () {
      // 解开加载
      this.loading = true
      // 发送后台请求
      const {
        data: { data }
      } = await this.axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      // 总条数
      this.total = data.total_count
      // 接收响应完,关闭加载效果
      this.loading = false
    },
    // 收藏图标状态切换
    async toggle (item) {
      const {
        data: { data }
      } = await this.axios.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      // 成功提示
      this.$message.success('成功')
      // 修改图片选中状态
      item.is_collected = data.collect
    },
    // 删除
    delImage (id) {
      // messageBox弹框
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete('user/images/' + id)
        // 消息提示
        this.$message.success('删除成功')
        // 刷新页面
        this.getImages()
      })
    },
    // 页
    pager (newpage) {
      this.reqParams.page = newpage
      this.getImages()
    },
    // 提交文件
    handleSuccess (res) {
      this.imageURL = res.data.url
      this.$message.success('长传成功')
      // 2s定时器
      window.setTimeout(() => {
        // 对话框隐藏
        this.dialogVisible = false
        this.getImages()
        // 图片预览清空
        this.imageURL = null
      }, 2000)
    }
  }
}
</script>

<style scoped lang="less">
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    float: left;
    margin-right: 50px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
