<template>
  <div class="container">
    <el-card>
      <!-- 头部插槽 -->
      <div slot="header">
        <!-- 面包屑 -->
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格布局 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form :model="userForm" label-width="120px">
            <el-form-item label="编号: ">{{userForm.id}}</el-form-item>
            <el-form-item label="手机 ">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称: ">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input v-model="userForm.intro" tyep="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱: ">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <!-- 点击保存按钮,刷新信息 -->
              <el-button type="primary" @click="updateUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- myUpload方法 -->
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="myUpload"
          >
            <img :src="userForm.photo" v-if="userForm.photo" alt class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px;">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 导入eventBus实例,进行非父子传值
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      // 表单信息
      userForm: {
        name: null,
        intro: null,
        email: null,
        id: null,
        mobile: null,
        photo: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      const {
        data: { data }
      } = await this.axios.get('user/profile')
      this.userForm = data
    },
    // 上传图片
    myUpload (data) {
      // 表单对象
      const formData = new FormData()
      console.log(data)
      // 表单对象追加数据
      formData.append('photo', data.file)
      // 进行部分数据更新
      this.axios.patch('user/photo', formData).then(res => {
        const url = res.data.data.photo
        this.$message.success('修改头像成功')
        this.userForm.photo = url
        // 更新home组件内的头像,非父子组件传值
        eventBus.$emit('updateHeaderPhoto', url)
        // 更新本地存储中的头像
        const userInfo = JSON.parse(window.sessionStorage.getItem('te'))
        userInfo.photo = url
        window.sessionStorage.setItem('te', JSON.stringify(userInfo))
      })
    },
    // 更新用户信息
    async updateUserInfo () {
      const {
        data: { data }
      } = await this.axios.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改信息成功')
      // 非父子组件传值
      eventBus.$emit('updateHeaderName', data.name)
      // 更新本地存储
      const userInfo = JSON.parse(window.sessionStorage.getItem('te'))
      userInfo.name = data.name
      // 转化成json格式的字符串
      window.sessionStorage.setItem('te', JSON.stringify(userInfo))
    }
  }
}
</script>

<style>
</style>
