<template>
  <div class="login-container">
    <!-- 调用element组件 -->
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单控件 -->
      <el-form :model="LoginForm" :status-icon="true" :rules="Loginrules" ref="LoginForm">
        <el-form-item prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="LoginForm.code" placeholder="请输入验证码" style="width: 240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        // 验证成功
        callback()
      } else {
        callback(new Error('格式错误'))
      }
    }
    return {
      checked: true,
      // 表单传输数据对象
      LoginForm: {
        mobile: '',
        code: ''
      },
      Loginrules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trige: 'blur' }
        ],
        code: [
          { required: true, message: '输入验证码', trigger: 'blur' },
          { len: 6, message: '输入6位数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.LoginForm.validate(valid => {
        if (valid) {
          this.axios
            .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.LoginForm)
            .then(res => {
              this.$router.push('/')
            })
            .catch(() => {
              // element组件消息提示
              this.$message.error('手机号或')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login-box {
    width: 400px;
    height: 330px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
