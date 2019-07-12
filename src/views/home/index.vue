<template>
  <el-container class="home-container">
    <!-- 左侧侧边栏 -->
    <el-aside class="my-aside" :width="collapse ? '64px' : '200px'">
      <!-- logo -->
      <div class="logo" :class="{close:collapse}"></div>
      <!-- 左侧按钮 -->
      <el-menu
        default-active="1"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="collapse"
        :collapse-transition="false"
        style="border-right:none"
      >
        <!-- el-icon-s-home为图标样式类名,index为选中下标 -->
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧内容区域 -->
    <el-container>
      <el-header class="my-header">
        <!-- 左侧图标 -->
        <span class="el-icon-s-fold" @click="check()"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 右侧下拉菜单 -->
        <el-dropdown style="float:right">
          <!-- 下拉点击区域 -->
          <span class="el-dropdown-link">
            <img
              src="../../assets/images/avatar.jpg"
              width="30px"
              height="30px"
              style="vertical-align:middle"
            />
            <b style="padding-left:5px; vertical-align:middle">黑马小哥</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 右侧主内容区域 -->
      <el-main class="main"></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    check () {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style lang='less' scoped>
.home-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .my-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #024 url(../../assets/images/logo_admin.png) no-repeat center /
        140px auto;
    }
    .close {
      background: url(../../assets/images/logo_admin_01.png) no-repeat center / 36px auto;
    }
  }
  .my-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .el-icon-s-fold{
      font-size: 25px;
      vertical-align: middle;
    }
    .text{
      vertical-align: middle;
      padding-left: 10px
    }
  }
  .main{
    background: url(../../assets/images/welcome.jpg) no-repeat center / contain
  }
}
</style>
