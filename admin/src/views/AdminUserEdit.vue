<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="128px" @submit.native.prevent="save">
      <el-form-item label="用户名" required>
        <el-input v-model="model.username" required></el-input>
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input type="password" v-model="model.password" required></el-input>
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
    id: {}
  },
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      res: {}
    };
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    async fetch() {
      let res = await this.$http.get(`/rest/admin_users/${this.id}`);
      this.model = res.data;
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/admin_users/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/admin_users", this.model);
      }
      this.$router.push("/admin_users/list");
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
