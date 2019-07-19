<template>
  <div class="article-container">
    <!-- 卡片 -->
    <el-card>
      <!-- 头部插槽 -->
      <div slot="header">
        <my-bread>{{articleId?'修改':'发布'}}文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form>
        <!-- 标题表单项 -->
        <el-form-item label="标题 ">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <!-- 内容表单项,富文本编辑器 -->
        <el-form-item label="内容 ">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <!-- 封面 -->
        <el-form-item>
          <!-- 单选组 -->
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 单图,点击单图按钮显示 -->
          <div v-if="articleForm.cover.type === 1">
            <!-- v-model双向绑定:value=articleForm.cover.images[0],@input -->
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <!-- 三图 -->
          <div v-if="articleForm.cover.type === 3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="频道 ">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 发表按钮 -->
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="publish(true)">发表</el-button>
          <el-button  @click="publish(false)">存入草稿</el-button>
        </el-form-item>
        <!-- 修改按钮 -->
        <el-form-item v-else>
          <el-button type="primary" @click="edit(true)">修改</el-button>
          <el-button @click="edit(false)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入quill富文本编辑器
import quillEditor from 'vue-quill-editor'
export default {
  // 注册在data外,注册富文本编辑器
  components: quillEditor,
  data () {
    return {
      // 富文本编辑器配置项
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      },
      // 提交给后台的数据
      articleForm: {
        title: '',
        content: '',
        // 单选组
        cover: {
          type: 1,
          images: []
        },
        // 频道
        channel_id: null
      },
      // 编辑文章的id
      articleId: null
    }
  },
  created () {
    this.articleId = this.$route.query.id
    // 修改文章时,触发获取文章方法
    if (this.articleId) {
      this.getArticle()
    }
  },
  // 监听路由变化,从修改到发布,清空内部数据
  watch: {
    $route () {
      this.articleId = null
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          // 数组长度 如果是单图为1  如果是三图为3
          images: []
        },
        channel_id: null
      }
    }
  },
  methods: {
    // 单选按钮切换,清空内部images,从新展示
    changeType () {
      this.articleForm.cover.images = []
    },
    // 获取文章数据
    async getArticle () {
      const { data: { data } } = await this.axios.get('articles/' + this.articleId)
      this.articleForm = data
    },
    // 发表
    async publish (draft) {
      await this.axios.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '发表成功' : '存入草稿成功')
      this.$router.push('/article')
    },
    // 修改
    async edit (draft) {
      await this.axios.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '修改成功' : '修改草稿成功')
      this.$router.push('/article')
    }

  }
}
</script>

<style scoped lang='less'>

</style>
