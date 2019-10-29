<template>
  <div class="about">
    <h1>{{id ? '编辑' : '创建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称" required>
        <el-input v-model="model.name" required></el-input>
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
export default {
  props: {
    id: String
  },
  data() {
    return {
      model: {},
      res: {}
    };
  },
  methods: {
    async save() {
      // if (this.model.name === '') {
      //   this.$message.error('请填写名称')
      //   return
      // }
      const res = await this.$http.post("/categories", this.model);
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.res = res;
    }
  }
};
</script>

<style>
</style>
