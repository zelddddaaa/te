<template>
  <div class="image-container">
    <!-- 图片点击按钮 -->
    <div class="img-btn" @click="openDialog">
      <img :src="value || defaultImage" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <!-- 卡片化标签页 -->
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选框 -->
          <div style="margin-bottom:10px">
            <el-radio-group size="small" v-model="reqParams.collect">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div
          class="img-item"
          v-for='item in images'
          :key="item.id"
          @click="selectedImage(item.url)"
          :class="{selected:selectedImageUrl===item.url}"
          >
            <img :src="item.url" alt="">
          </div>
          <!-- 分页 -->
          <el-pagination
          v-if="total>reqParams.per_page"
          background
          layout="prev,pager,next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload"></el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
// 导入默认图片按钮的占位图
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  // 接收父组件数据
  props: ['value'], // 只读
  data () {
    return {
      // 默认图片按钮的占位图
      defaultImage,
      // 对话框默认隐藏
      dialogVisible: false,
      // 控制选中的选项卡
      activeName: 'image',
      // 图片素材列表
      images: [],
      // 总条数
      total: 0,
      // 被选中的图片地址
      selectedImageUrl: null,
      // 提交后台数据
      reqParams: {
        // 默认全部
        collect: false,
        // 分页
        page: 1,
        per_page: 8
      }
    }
  },
  methods: {
    // 点击按钮,打开对话框
    openDialog () {
      // 显示对话框
      this.dialogVisible = true
      // 渲染图片素材
      this.getImages()
    },
    // 获取后台素材
    async getImages () {
      const { data: { data } } = await this.axios.get('user/images', { parama: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 图片对号,排他
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 分页换页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    }
  }
}
</script>

<style scoped lang="less">
//三图时可以在一行显示
  .image-container{
    display: inline-block;
    margin-right: 20px
  }
  //图片素材所在div
  .img-item{
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 10px;
    position: relative;
    //.img-item.selected:before{}
    &.selected {
      &::before {
        content:'';
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .2) url(../assets/images/selected.png) no-repeat center / 50px 50px
      }
    }
    //内含图片
    img{
      width: 100%;
      height: 100%;
      display: block;
      // 图片填充的规则，等比例缩放 完整显示在容器内
      object-fit: contain
    }
  }
</style>
