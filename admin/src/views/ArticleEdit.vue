<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="128px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.parent" multiple>
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" required>
        <el-input v-model="model.title" required></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">技术栈</el-divider>
    <el-row>
      <el-col :offset="2" :span="8">
        <dl>
          <dt>后端</dt>
          <dd>nodeJS</dd>
          <dd>express</dd>
          <dd>mongodb + mongoose</dd>
        </dl>
      </el-col>
      <el-col :span="12">
        <dl>
          <dt>前端</dt>
          <dd>vue</dd>
          <dd>element-ui</dd>
          <dd>axios</dd>
        </dl>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: [],
      res: {}
    };
  },
  components: { VueEditor },
  created() {
    this.fetchparents();
    this.id && this.fetch();
  },
  methods: {
    async fetch() {
      let res = await this.$http.get(`/rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchparents() {
      let res = await this.$http.get(`/rest/categories`);
      this.parents = res.data;
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.res = res;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  }
};
</script>

<style>
</style>
