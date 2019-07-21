<template>
  <el-container class="home-container">
    <!-- 左侧侧边栏 -->
    <el-aside class="my-aside" :width="collapse ? '64px' : '200px'">
      <!-- logo -->
      <div class="logo" :class="{close:collapse}"></div>
      <!-- 左侧按钮 -->
      <el-menu
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="collapse"
        :collapse-transition="false"
        style="border-right:none"
        router
      >
        <!-- el-icon-s-home为图标样式类名,index为选中下标 -->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
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
        <el-dropdown style="float:right" @command="handleCommand">
          <!-- 下拉点击区域 -->
          <span class="el-dropdown-link">
            <img :src="avatar" width="30px" height="30px" style="vertical-align:middle" />
            <b style="padding-left:5px; vertical-align:middle">{{name}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 右侧主内容区域 -->
      <el-main>
        <!-- 二级路由显示区域 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      collapse: false,
      avatar: '',
      name: ''
    }
  },
  methods: {
    check () {
      this.collapse = !this.collapse
    },
    setting () {
      this.$router.push('/setting')
    },
    loginout () {
      this.$router.push('/login')
    },
    handleCommand (command) {
      this[command]()
    }
  },
  created () {
    // 不能是用逗号分隔,从本地获取信息
    const user = JSON.parse(window.sessionStorage.getItem('te'))
    this.avatar = user.photo
    this.name = user.name
    // 绑定setting组件上传图片的事件,完成非父子组价传值
    eventBus.$on('updateHeaderPhoto', (url) => {
      this.avatar = url
    })
    // 绑定setting组价修改用户名
    eventBus.$on('updateHeaderName', (name) => {
      this.name = name
    })
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
      background: url(../../assets/images/logo_admin_01.png) no-repeat center /
        36px auto;
    }
  }
  .my-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .el-icon-s-fold {
      font-size: 25px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
  }
}
</style>
