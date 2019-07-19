<template>
  <div class="article-container">
    <!-- 卡片 -->
    <el-card>
      <!-- 头部插槽 -->
      <div slot="header">
        <my-bread>发布文章</my-bread>
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
            <my-image></my-image>
            <my-image></my-image>
            <my-image></my-image>
          </div>
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="频道 ">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 发表按钮 -->
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
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
        // 富文本编辑器内容
      }
    }
  },
  methods: {
    // 单选按钮切换,清空内部images,从新展示
    changeType () {
      this.articleForm.cover.images = []
    }
  }
}
</script>

<style scoped lang='less'>
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
